import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Switch } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { urbitConfig as config } from '../config';
import { create, SetState } from 'zustand';
import Contact from '../components/Contact';
import Urbit from '@granitewall/react-native-api';
import { useTheme } from '../ThemeContext';
import UserStatus from '../components/UserStatus';
import Notifications from 'react-native-push-notification';
const subscription = {
    app: config.agent,
    path: config.path,
    ship: config.ship,
    event: console.log,
    err: console.error,
    quit: console.error,
};
interface ContactData {
    id: string;
    name: string;
    onlineStatus: boolean | null;
    alert: boolean;
}
interface PalsStore {
    pals: ContactData[];
    online: string[];
    fetchPals: (api: Urbit) => Promise<void>;
    setAlert: (api: Urbit, id: string, alert: boolean) => void;
}

export const useUrbit = () => {
    const [urbit, setUrbit]: [Urbit, any] = useState(null);
    const [ship, setShip] = useState(null);
    const [connectionReady, setConnectionReady] = useState(false);
    useEffect(() => {
        if (!ship) {
            const urbit: Urbit = getUrbitApi(config.desk);
            urbit.onOpen = () => {
                setConnectionReady(true);
            };
            urbit.onError = err => {
                console.error(err);
            };
            setUrbit(urbit);
            setShip(config.ship);
        }
    }, [ship, urbit]);
    return [ship, urbit, connectionReady];
};

export const getUrbitApi = (desk = config.desk) => {
    const api = new Urbit(config.url, config.code, desk, config.ship);
    api && api.connect && api.connect();
    return api;
};
export const getSubscription = (urbit: Urbit, eventHandler = console.log) =>
    urbit.subscribe({
        ...subscription,
        ship: config.ship,
        event: eventHandler,
    });

export const setOnlineStatus = (api: Urbit, status: boolean) => {
    console.log('setting online status', status);
    const tag = status ? 'sail' : 'moor';
    const json = status
        ? { sail: { in: [], ship: config.ship } }
        : {
            moor: { in: [], ship: config.ship },
        };
    const response = api.poke({
        app: 'boat',
        mark: 'boat-command',
        json: json,
    });
    console.log(response);
    return response;
};
const usePalsState = create<PalsStore>((set, get) => ({
    pals: [],
    online: [],
    fetchOnline: async (api: Urbit) => {
        try {
            const onlinePals = await api.scry({
                app: 'boat',
                path: `/online/`,
            });
            console.log('online pals', onlinePals);
            set({ online: onlinePals });
        } catch (e) {
            console.log(e);
        }
    },
    setAlert: (api: Urbit, id: string, alert: boolean) => {
        console.log('setAlert', id, alert);

        const json = alert
            ? { tack: { in: [], ship: id } }
            : {
                veer: { in: [], ship: id },
            };
        const response = api.poke({
            app: 'boat',
            mark: 'boat-command',
            json: json,
        });
        const pals = get().pals.map(pal =>
            pal.id === id
                ? { ...pal, alert: alert, onlineStatus: alert ? pal.onlineStatus : null }
                : pal,
        );
        console.log('pals', pals);
        set({ pals });
    },
    fetchPals: async (api: Urbit) => {
        try {
            // Fetch the pals from your Urbit instanc
            const response = await api.scry({
                app: 'pals', // Replace this with the appropriate app name
                path: '/json', // Replace this with the appropriate path
            });

            const data = JSON.parse(JSON.stringify(response));
            const incomingContacts = Object.keys(data.incoming);
            const outgoingContacts = Object.keys(data.outgoing);

            // Combine the incoming and outgoing contacts and remove duplicates
            const uniqueContacts = [
                ...new Set([...incomingContacts, ...outgoingContacts]),
            ];

            // Map each contact to a ContactData object
            const fetchedPals = uniqueContacts.map(contact => ({
                id: contact,
                name: contact,
                onlineStatus: null,
            }));
            set({ pals: fetchedPals });
        } catch (error) {
            console.error('Failed to fetch pals:', error);
        }
    },
    subscribeOnline: (api: Urbit, retries = 0) => {
        const eventHandler = event => {
            console.log('Received event:', event);
            if (event && event.sail) {
                // Extract the new contact information from the event data

                const updatedPals = get().pals.map(pal =>
                    pal.id === event.sail ? { ...pal, onlineStatus: true } : pal,
                );
                // Update the pals state
                set({ pals: updatedPals });
            } else if (event && event.moor) {
                const updatedPals = get().pals.map(pal =>
                    pal.id === event.moor ? { ...pal, onlineStatus: false } : pal,
                );

                // Update the pals state
                set({ pals: updatedPals });
            }
        };

        try {
            if (!api.sseClientInitialized) {
                api.eventSource();
            }
            const response = api.subscribe({
                ...subscription,
                path: '/online',
                event: eventHandler,
                err: e => {
                    console.log('error', e);
                    console.log('wtf', api);
                },
            });
            console.log('subscribed to online', api);
            console.log(response);
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
const ContactsList: React.FC = () => {
    const [currentUserStatus, setCurrentUserStatus] = useState(false);
    const showNotification = (contactName: string) => {
        console.log('here');
        Notifications.localNotification({
            title: 'Contact Online',
            message: `${contactName} is now online`,
        });
    };
    const { theme, setTheme } = useTheme();
    const [ship, api, connectionReady] = useUrbit();
    const handleStatusChange = (status: boolean) => {
        console.log('setting online status', status);
        setOnlineStatus(api, status);
        setCurrentUserStatus(status);
    };
    const pals = usePalsState(state => state.pals);
    const fetchPals = usePalsState(state => state.fetchPals);
    const fetchOnline = usePalsState(state => state.fetchOnline);
    const subscribeOnline = usePalsState(state => state.subscribeOnline);
    const [retries, setRetries] = useState(0);
    const setAlert = usePalsState(state => state.setAlert);
    const insets = useSafeAreaInsets();
    const toggleSwitch = (api: Urbit, id: string, value: boolean) => {
        setAlert(api, id, value);
    };
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            paddingTop: 10,
            paddingRight: 10,
            backgroundColor: theme === 'light' ? '#fff' : '#222',
        },
        contactContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 5,
            paddingVertical: 5,
            backgroundColor: '#f0f0f0',
            borderRadius: 5,
            marginBottom: 5,
        },
    });
    useEffect(() => {
        if (connectionReady) {
            fetchOnline(api);
            fetchPals(api);
            subscribeOnline(api);
        } else if (retries < 10) {
            console.log('retrying', api);
            api && api.connect && api.connect();
            const timer = setTimeout(() => {
                setRetries(retries + 1);
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [connectionReady, retries]);

    useEffect(() => {
        pals.forEach(pal => {
            if (pal.onlineStatus && pal.alert) {
                showNotification(pal.name);
            }
        });
    }, [pals]);

    const sortedPals = pals.sort((a, b) => {
        if (a.alert && !b.alert) {
            return -1;
        } else if (!a.alert && b.alert) {
            return 1;
        } else if (a.onlineStatus && !b.onlineStatus) {
            return -1;
        } else if (!a.onlineStatus && b.onlineStatus) {
            return 1;
        } else {
            return -1;
        }
    });
    return (
        <View style={styles.container}>
            <FlatList
                contentContainerStyle={{ paddingTop: insets.top }}
                data={sortedPals}
                renderItem={({ item }) => (
                    <View style={styles.contactContainer}>
                        <Contact name={item.name} onlineStatus={item.onlineStatus} />
                        <Switch
                            onValueChange={value => toggleSwitch(api, item.id, value)}
                            value={item.alert}
                        />
                    </View>
                )}
                keyExtractor={item => item.id}
            />
            <UserStatus
                name="u boating?" // Replace with the current user's name
                onlineStatus={currentUserStatus}
                onStatusChange={value => handleStatusChange(value)}
            />
        </View>
    );
};

export default ContactsList;
