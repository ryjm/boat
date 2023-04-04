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
    onStatusChange?:
    | ((value: boolean) => Promise<void> | void)
    | null
    | undefined;
}

const UserStatus: React.FC<UserStatusProps> = ({
    user,
    online,
    onStatusChange,
}) => {
    const [isVisible, setIsVisible] = useState(true);
    const [isOnline, setIsOnline] = useState(online);

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    const toggleStatus = () => {
        setIsOnline(!isOnline);
        onStatusChange && onStatusChange(!isOnline);
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
                <TouchableOpacity
                    onPress={toggleVisibility}
                    style={[styles.button, styles.mediumButton]}>
                    <Text style={[styles.buttonText, styles.mediumButtonText]}>
                        {isVisible ? 'Hide' : 'Show'} status
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={toggleStatus}
                    style={[styles.statusButton, styles.largeButton]}>
                    <Text style={[styles.statusButtonText, styles.largeButtonText]}>
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
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginLeft: 10,
    },
    mediumButton: {
        backgroundColor: '#8bc34a',
    },
    largeButton: {
        backgroundColor: '#4caf50',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 14,
    },
    mediumButtonText: {
        fontSize: 16,
    },
    largeButtonText: {
        fontSize: 18,
    },
    statusButton: {
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginLeft: 10,
    },
    statusButtonText: {
        color: '#ffffff',
        fontSize: 14,
    },
});

export default UserStatus;
