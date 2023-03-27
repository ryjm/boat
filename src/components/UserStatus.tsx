import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    SafeAreaView,
} from 'react-native';

const deviceWidth = Dimensions.get('window').width;

interface UserStatusProps {
    user: string;
    online: boolean;
}

const UserStatus: React.FC<UserStatusProps> = ({ user, online }) => {
    const [isVisible, setIsVisible] = useState(true);
    const [isOnline, setIsOnline] = useState(online);

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    const toggleStatus = () => {
        setIsOnline(!isOnline);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                {isVisible ? (
                    <View style={styles.statusContainer}>
                        <Text style={styles.userName}>{user}</Text>
                        <Text style={styles.status}>{isOnline ? 'Online' : 'Offline'}</Text>
                    </View>
                ) : null}
                <TouchableOpacity onPress={toggleVisibility} style={styles.button}>
                    <Text style={styles.buttonText}>
                        {isVisible ? 'Hide' : 'Show'} status
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={toggleStatus} style={styles.statusButton}>
                    <Text style={styles.statusButtonText}>
                        {isOnline ? 'Go Offline' : 'Go Online'}
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: 'transparent',
        bottom: 50,
        width: deviceWidth,
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        paddingVertical: 5,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
        position: 'absolute',
        left: 0,
        right: 0,
        alignSelf: 'center',
        width: deviceWidth,
        opacity: 0.8,
    },
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    status: {
        fontSize: 14,
        fontStyle: 'italic',
        marginLeft: 10,
    },
    button: {
        backgroundColor: '#8bc34a',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginLeft: 10,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 14,
    },
    statusButton: {
        backgroundColor: '#4caf50',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginLeft: 10,
    },
    statusButtonText: {
        color: '#ffffff',
        fontSize: 14,
    },
});

export default UserStatus;
