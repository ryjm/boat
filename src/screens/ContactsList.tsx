import React, { useEffect, useState } from 'react';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { SwipeListView } from 'react-native-swipe-list-view';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
  Animated,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { create } from 'zustand';
import Contact from '../components/Contact';
import Urbit from '@granitewall/react-native-api';
import { useTheme } from '../ThemeContext';
import Notifications from '@react-native-community/push-notification-ios';
import * as ExpoNotifications from 'expo-notifications';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import { Config } from '../config';
// Add the navigation types:
type RootStackParamList = {
  Login: undefined;
  ContactsList: { config: Config };
};

type ContactsListNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ContactsList'
>;
type ContactsListRouteProp = RouteProp<RootStackParamList, 'ContactsList'>;

type Props = {
  navigation: ContactsListNavigationProp;
  route: ContactsListRouteProp;
};
type UrbitStatus = {
  ship: string | null;
  api: Urbit;
  connectionReady: boolean;
};

interface ContactData {
  id: string;
  name: string;
  onlineStatus: boolean | null;
  alert: boolean;
}

interface PalsStore {
  fetchOnline: any;
  subscribeOnline(api: Urbit, retries: number): unknown;
  pals: ContactData[];
  online: string[];
  fetchPals: (api: Urbit) => Promise<void>;
  setAlert: (api: Urbit, id: string, alert: boolean) => void;
}

export function useUrbit(config: Config): UrbitStatus {
  const urbit: Urbit = new Urbit('', '', '', '');
  const [api, setApi] = useState<Urbit>(urbit);
  const [ship, setShip] = useState<string | null>(null);
  const [connectionReady, setConnectionReady] = useState(false);

  useEffect(() => {
    if (!ship) {
      const urbit: Urbit = getUrbitApi(config);
      urbit.onOpen = () => {
        setConnectionReady(true);
      };
      urbit.onError = (err: any) => {
        console.error(err);
      };
      setApi(urbit);
      setShip(config.ship);
    }
  }, [ship, api]);

  return { ship, api, connectionReady };
}

ExpoNotifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const onRegistered = (deviceToken: string) => {
  console.log(
    'Device registered for remote notifications with token: ',
    deviceToken,
  );
};

const onRegistrationError = (error: any) => {
  console.log('Failed to register for remote notifications: ', error);
};

const onRemoteNotification = (notification: any) => {
  console.log('Received remote notification: ', notification);
};

const onLocalNotification = (notification: any) => {
  console.log('Received local notification: ', notification);
};

export const showNotification = (contactName: string) => {
  console.log('showing notification');

  Notifications.addNotificationRequest({
    id: `${contactName}-notification`,
    title: `${contactName} is online`,
    category: 'online',
  });
};
const deviceWidth = Dimensions.get('window').width;
const slideDistance = deviceWidth * 0.35;

export const getUrbitApi: (config: Config) => Urbit = (config: Config) => {
  console.log('connecting to config', config);
  const api = new Urbit(config.url, config.code, config.desk, config.ship);
  api && api.connect && api.connect();
  return api;
};

export const setOnlineStatus = (
  config: Config,
  api: Urbit,
  status: boolean,
) => {
  const json = status
    ? { sail: { in: [], ship: config.ship } }
    : {
      moor: { in: [], ship: config.ship },
    };
  return api.poke({
    app: 'boat',
    mark: 'boat-command',
    json: json,
  });
};

const usePalsState = create<PalsStore>((set, get) => ({
  pals: [],
  online: [],
  fetchOnline: async (api: Urbit) => {
    try {
      const onlinePals: string[] = await api.scry({
        app: 'boat',
        path: `/online/`,
      });
      set({ online: onlinePals });
    } catch (e) {
      console.log(e);
    }
  },
  setAlert: (api: Urbit, id: string, alert: boolean) => {
    const json = alert
      ? { tack: { in: [], ship: id } }
      : {
        veer: { in: [], ship: id },
      };
    api.poke({
      app: 'boat',
      mark: 'boat-command',
      json: json,
    });

    const online = api
      .scry({
        app: 'boat',
        path: `/online/~${id}`,
      })
      .then(online => {
        console.log('online', online);
        return online;
      });

    const pals = get().pals.map(pal =>
      pal.id === id ? { ...pal, alert: alert, onlineStatus: online } : pal,
    );
    set({ pals });
  },
  fetchPals: async (api: Urbit) => {
    try {
      const response = await api.scry({
        app: 'pals',
        path: '/json',
      });

      const data = JSON.parse(JSON.stringify(response));
      const incomingContacts = Object.keys(data.incoming);
      const outgoingContacts = Object.keys(data.outgoing);

      const uniqueContacts = [
        ...new Set([...incomingContacts, ...outgoingContacts]),
      ];

      const fetchedPals: ContactData[] = uniqueContacts.map(contact => ({
        id: contact,
        name: contact,
        onlineStatus: null,
        alert: false,
      }));
      set({ pals: fetchedPals });
    } catch (error) {
      console.error('Failed to fetch pals:', error);
    }
  },
  subscribeOnline: (api: Urbit, retries = 0) => {
    const eventHandler = (event: { sail: string; moor: string }) => {
      if (event && event.sail) {
        const updatedPals = get().pals.map(pal =>
          pal.id === event.sail ? { ...pal, onlineStatus: true } : pal,
        );
        if (updatedPals.find(pal => pal.id === event.sail)?.alert) {
          showNotification(event.sail);
        }
        set({ pals: updatedPals });
      } else if (event && event.moor) {
        const updatedPals = get().pals.map(pal =>
          pal.id === event.moor ? { ...pal, onlineStatus: false } : pal,
        );
        set({ pals: updatedPals });
      }
    };

    try {
      if (!api.sseClientInitialized) {
        api.eventSource();
      }
      console.log('subscribing to online', api);
      api.subscribe({
        ship: api.ship,
        app: 'boat',
        path: '/online',
        event: eventHandler,
        err: e => {
          console.log('error', e);
        },
      });
    } catch (error) {
      console.error('Failed to subscribe to /online:', error);
      if (retries < 10) {
        setTimeout(() => {
          get().subscribeOnline(api, retries + 1);
        }, 1000);
      }
    }
  },
}));

const ContactsList: React.FC<Props> = ({ route }) => {
  const { config } = route.params;
  const [isOnline, setOnline] = useState(false);
  const { theme } = useTheme();
  let { ship, api, connectionReady } = useUrbit(config);
  const handleStatusChange = (api: Urbit, status: boolean) => {
    setOnlineStatus(config, api, status);
    setOnline(status);
  };
  const [animatedValue] = useState(
    new Animated.Value(isOnline ? 0 : -slideDistance),
  );

  const animateStatusText = (toValue: number) => {
    Animated.timing(animatedValue, {
      toValue,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };
  const pals = usePalsState(state => state.pals);
  const fetchPals = usePalsState(state => state.fetchPals);
  const fetchOnline = usePalsState(state => state.fetchOnline);
  const subscribeOnline = usePalsState(state => state.subscribeOnline);
  const [retries, setRetries] = useState(0);
  const setAlert = usePalsState(state => state.setAlert);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    ExpoNotifications.addNotificationResponseReceivedListener(
      notificationResponse => {
        console.log('notificationResponse', notificationResponse);
      },
    );
    PushNotificationIOS.addEventListener('register', onRegistered);
    PushNotificationIOS.addEventListener(
      'registrationError',
      onRegistrationError,
    );
    PushNotificationIOS.addEventListener('notification', onRemoteNotification);
    PushNotificationIOS.addEventListener(
      'localNotification',
      onLocalNotification,
    );

    PushNotificationIOS.requestPermissions({
      alert: true,
      badge: true,
      sound: true,
      critical: true,
    }).then(
      data => {
        console.log('PushNotificationIOS.requestPermissions', data);
      },
      data => {
        console.log('PushNotificationIOS.requestPermissions failed', data);
      },
    );

    return () => {
      PushNotificationIOS.removeEventListener('register');
      PushNotificationIOS.removeEventListener('registrationError');
      PushNotificationIOS.removeEventListener('notification');
      PushNotificationIOS.removeEventListener('localNotification');
    };
  }, []);

  useEffect(() => {
    if (api && connectionReady) {
      fetchOnline(api);
      fetchPals(api);
      subscribeOnline(api, retries);
    } else if (retries < 10) {
      // @ts-ignore
      api && api.connect && api.connect();
      const timer = setTimeout(() => {
        setRetries(retries + 1);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [api, connectionReady, retries]);

  const toggleSwitch = (id: string, value: boolean) => {
    if (!value) {
      setAlert(api, id, true);
    } else {
      setAlert(api, id, false);
    }
  };

  const handleStatusPress = () => {
    handleStatusChange(api, !isOnline);
    animateStatusText(isOnline ? -slideDistance : 0);
  };

  const renderItem = ({ item }: { item: ContactData }) => {
    const renderContact = () => (
      <View
        style={{
          ...styles.contactContainer,
          justifyContent: 'flex-start',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Contact
          toggleAlert={() => toggleSwitch(item.id, item.alert)}
          name={item.name}
          onlineStatus={item.onlineStatus}
          alert={item.alert}
        />
      </View>
    );

    const renderVideoCallButton = () => (
      <TouchableOpacity
        onPress={() => {
          // const timestamp = Date.now()
          //   .toLocaleString('en-US', { timeZone: 'UTC', hour12: false })
          //   .replace(/:/g, '');
          // maybe use this later?
          // const jitsiLink = `https://meet.jit.si/${item.id.trim()}And${ship}${timestamp}`;
          const jitsiLink = `https://meet.jit.si/${item.id.trim()}And${ship?.trim()}`;
          Linking.openURL(jitsiLink).catch(err =>
            console.error('An error occurred', err),
          );
        }}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          width: 75,
        }}>
        <Ionicons
          name="videocam"
          size={24}
          color={theme === 'light' ? 'black' : 'white'}
        />
      </TouchableOpacity>
    );

    return item.onlineStatus ? (
      <SwipeListView
        data={[item]}
        renderItem={() => renderContact()}
        renderHiddenItem={() => renderVideoCallButton()}
        leftOpenValue={75}
      />
    ) : (
      renderContact()
    );
  };

  const styles = StyleSheet.create({
    contentContainer: {
      flex: 1,
    },
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingTop: 10,
      paddingBottom: 5,
    },
    statusContainer: {
      backgroundColor: theme === 'light' ? '#F9FAFB' : '#444444',
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderRadius: 40,
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 5,
    },
    statusButtonsContainer: {
      paddingBottom: insets.bottom,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    statusButton: {
      flexDirection: 'row',
      alignItems: 'center',
      textAlign: 'center',
      justifyContent: 'space-around',
      paddingHorizontal: 16,
      paddingVertical: 32,
      borderRadius: 40,
    },
    online: {
      backgroundColor: '#2ECC71',
    },
    away: {
      backgroundColor: '#F1C40F',
    },
    offline: {
      backgroundColor: '#E74C3C',
    },
    statusIcon: {
      marginRight: 0,
      marginLeft: 0,
    },
    statusButtonText: {
      color: '#FFFFFF',
      fontWeight: 'bold',
      fontSize: 24,
      textAlign: 'center',
    },
    listContentContainer: {
      flexGrow: 1,
      paddingHorizontal: 16,
      paddingBottom: 16,
    },
    container: {
      flex: 1,
      paddingTop: 10,
      backgroundColor: theme === 'light' ? '#fff' : '#222',
    },
    contactContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <FlatList
          data={pals}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContentContainer}
          ListEmptyComponent={<Text>No pals!</Text>}
        />
      </View>
      <View style={styles.statusContainer}>
        <TouchableOpacity
          style={[
            styles.statusButton,
            isOnline ? styles.online : styles.offline,
          ]}
          onPress={handleStatusPress}>
          <MaterialCommunityIcons
            name="circle"
            size={16}
            color={isOnline ? '#2ECC71' : '#E74C3C'}
            style={styles.statusIcon}
          />
          <Animated.Text
            style={[
              styles.statusButtonText,
              {
                transform: [{ translateX: animatedValue }],
              },
            ]}>
            {isOnline ? 'Online' : 'Offline'}
          </Animated.Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ContactsList;
