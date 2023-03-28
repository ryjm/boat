import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../ThemeContext';

interface ContactProps {
  name: string;
  onlineStatus: boolean | null;
}

const Contact: React.FC<ContactProps> = ({ name, onlineStatus }) => {
  const { theme, setTheme } = useTheme();
  const styles = StyleSheet.create({
    card: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: theme === 'light' ? '#fff' : '#444',
      borderRadius: 8,
      padding: 16,
      marginBottom: 12,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      elevation: 2,
    },
    name: {
      fontSize: 18,
      color: theme === 'light' ? '#000' : '#fff',
      fontWeight: 'bold',
      paddingRight: 8,
    },
    statusIndicator: {
      width: 16,
      height: 16,
      borderRadius: 8,
      marginRight: 5,
    },
    adrift: {
      backgroundColor: 'lightgray',
      borderWidth: 1,
      borderColor: 'gray',
    },
    online: {
      backgroundColor: 'lightgreen',
      borderWidth: 1,
      borderColor: 'green',
    },
    offline: {
      backgroundColor: 'lightcoral',
      borderWidth: 1,
      borderColor: 'red',
    },
  });

  let statusStyle;
  if (onlineStatus === null) {
    statusStyle = styles.adrift;
  } else if (onlineStatus) {
    statusStyle = styles.online;
  } else {
    statusStyle = styles.offline;
  }
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{name}</Text>
      <View style={[styles.statusIndicator, statusStyle]} />
    </View>
  );
};

export default Contact;
