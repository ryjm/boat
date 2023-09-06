import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { urbitConfig as config } from '../config';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { useTheme } from '../ThemeContext';
type RootStackParamList = {
    Login: any;
    ContactsList: typeof config;
};

type LoginPageNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

type LoginPageRouteProp = RouteProp<RootStackParamList, 'Login'>;

type Props = {
    navigation: LoginPageNavigationProp;
    route: LoginPageRouteProp;
};

const LoginPage: React.FC<Props> = ({ navigation }) => {
    const [url, setUrl] = useState(config.url);
    const [code, setCode] = useState(config.code);
    const [ship, setShip] = useState(config.ship);

    const { theme } = useTheme();
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            paddingHorizontal: 20,
            backgroundColor: theme ? '#000' : '#fff',
        },
        input: {
            height: 40,
            borderColor: 'gray',
            color: theme ? '#fff' : '#000',
            borderWidth: 1,
            marginBottom: 10,
            paddingLeft: 5,
            borderRadius: 5,
        },
    });
    const handleLogin = () => {
        const updatedConfig = {
            ...config,
            url: url,
            code: code,
            ship: ship,
        };
        console.log('updatedConfig', updatedConfig);
        navigation.navigate('ContactsList', { config: updatedConfig });
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={url}
                onChangeText={setUrl}
                placeholder="Enter Urbit URL"
            />
            <TextInput
                style={styles.input}
                value={code}
                onChangeText={setCode}
                placeholder="Enter Urbit Code"
                secureTextEntry
            />
            <TextInput
                style={styles.input}
                value={ship}
                onChangeText={setShip}
                placeholder="Enter Ship Name"
            />
            <Button onPress={handleLogin} title="Login" />
        </View>
    );
};

export default LoginPage;
