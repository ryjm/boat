import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Switch } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { urbitConfig as config } from '../config';
import { create, SetState } from 'zustand';
import Contact from '../components/Contact';
import Urbit from '@granitewall/react-native-api';
import { useTheme } from '../ThemeContext';
import UserStatus from '../components/UserStatus';
const subscription = {
    app: config.agent,
    path: config.path,
    ship: window?.ship || '',
    verbose: true,
    event: console.log,
    err: console.error,
    quit: console.error,
};
interface ContactData {
    id: string;
    name: string;
    onlineStatus: boolean;
    alert: boolean;
}
interface PalsStore {
    pals: ContactData[];
    fetchPals: (api: Urbit) => Promise<void>;
    setAlert: (id: string, status: boolean) => void;
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
export const getSubscription = (urbit, eventHandler = console.log) =>
    urbit.subscribe({
        ...subscription,
        ship: urbit.ship,
        event: eventHandler,
    });

const usePalsState = create<PalsStore>((set, get) => ({
    pals: [],
    setAlert: (id: string, alert: boolean) => {
        console.log('setAlert', id, alert);
        const pals = get().pals.map(pal =>
            pal.id === id ? { ...pal, alertStatus: alert } : pal,
        );
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
                onlineStatus: data.incoming[contact] === true,
            }));
            set({ pals: fetchedPals });
        } catch (error) {
            console.error('Failed to fetch pals:', error);
        }
    },
}));
const ContactsList: React.FC = () => {
    const [currentUserStatus, setCurrentUserStatus] = useState(false);

    const handleStatusChange = (status: boolean) => {
        setCurrentUserStatus(status);
    };
    const { theme, setTheme } = useTheme();
    const [ship, api, connectionReady] = useUrbit();
    const pals = usePalsState(state => state.pals);
    const fetchPals = usePalsState(state => state.fetchPals);
    const [retries, setRetries] = useState(0);
    const setAlert = usePalsState(state => state.setAlert);
    const insets = useSafeAreaInsets();
    const toggleSwitch = (id: string, value: boolean) => {
        setAlert(id, value);
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
            fetchPals(api);
        } else if (retries < 10) {
            console.log('retrying', api);
            api && api.connect && api.connect();
            const timer = setTimeout(() => {
                setRetries(retries + 1);
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [connectionReady, retries]);

    const sortedPals = pals.sort((a, b) => {
        if (a.alertStatus && !b.alertStatus) {
            return -1;
        } else if (!a.alertStatus && b.alertStatus) {
            return 1;
        } else if (a.onlineStatus && !b.onlineStatus) {
            return -1;
        } else if (!a.onlineStatus && b.onlineStatus) {
            return -1;
        } else {
            return a.name.localeCompare(b.name);
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
                            onValueChange={value => toggleSwitch(item.id, value)}
                            value={item.alertStatus}
                        />
                    </View>
                )}
                keyExtractor={item => item.id}
            />
            <UserStatus
                name="u boating?" // Replace with the current user's name
                onlineStatus={currentUserStatus}
                onStatusChange={handleStatusChange}
            />
        </View>
    );
};

export default ContactsList;
