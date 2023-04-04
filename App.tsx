import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ContactsList from './src/screens/ContactsList';
import { ThemeProvider, useTheme } from './src/ThemeContext';
import * as React from 'react';
import LoginPage from './src/screens/LoginPage';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Appearance,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
const Stack = createStackNavigator();

const App = () => {
  const handleBackPress = navigation => {
    navigation && navigation.goBack();
  };

  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerTitleStyle: {
              ...styles.title,
            },
            headerBackTitleVisible: false,
            headerTitleAlign: 'left',
            headerTitle: 'login',
            headerShown: false,
            gestureEnabled: false,
            headerStyle: styles.headerBackground,
            headerBackground: () => (
              <View style={styles.headerBackground}></View>
            ),
            headerRight: () => <View />,
          }}>
          <Stack.Screen name="Login" component={LoginPage} />
          <Stack.Screen
            name="ContactsList"
            options={({ navigation }) => ({
              gestureEnabled: false,
              headerShown: true,
              headerTitleAlign: 'left',
              headerTitle: 'ships',
              headerLeft: () => (
                <TouchableOpacity onPress={() => handleBackPress(navigation)}>
                  <Text style={styles.backButton}>{'<'}</Text>
                </TouchableOpacity>
              ),
            })}
            component={ContactsList}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};
const theme = Appearance.getColorScheme() || 'light';
const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
    borderRadius: 10,
  },
  headerBackground: {
    flexDirection: 'row',
    height: 120,
    backgroundColor: theme === 'dark' ? '#000' : '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
  },
  title: {
    alignItems: 'flex-start',
    paddingRight: 30,
    fontSize: 24,
    fontWeight: 'bold',
    color: theme === 'dark' ? '#fff' : 'dark gray',
  },
  backButton: {
    marginLeft: 16,
    fontSize: 18,
    fontWeight: 'bold',
    color: theme === 'dark' ? '#fff' : 'dark gray',
  },
});

export default App;
