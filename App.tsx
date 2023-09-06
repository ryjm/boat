import React, { useState } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  TextInput,
  FlatList,
  Appearance,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { NavigationContainer, ThemeProvider } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ContactsList from './src/screens/ContactsList';
import LoginPage from './src/screens/LoginPage';
const Stack = createStackNavigator();
const App = () => {
  const [logins, setLogins] = useState([]);
  const [url, setUrl] = useState('');
  const [ship, setShip] = useState('');
  const [code, setCode] = useState('');
  const theme = Appearance.getColorScheme() || 'light';

  const handleBackPress = navigation => {
    navigation && navigation.goBack();
  };

  const handleLogin = async navigation => {
    if (url && ship && code) {
      const newLogin = {
        url:
          url.startsWith('http://') || url.startsWith('https://')
            ? url
            : `http://${url}`,
        ship: ship,
        code: code,
      };
      await AsyncStorage.setItem(`login_${ship}`, JSON.stringify(newLogin));
      setLogins([...logins, newLogin]);
      setUrl('');
      setShip('');
      setCode('');

      navigation.navigate('ContactsList', { config: newLogin });
    }
  };

  function renderItem({ item }) {
    return (
      <TouchableOpacity
        style={styles.loginItem}
        onPress={() => handleUseCredentials(item)}>
        <Text style={styles.loginText}>{item.ship}</Text>
      </TouchableOpacity>
    );
  }

  function handleUseCredentials({ url, ship, code }) {
    setUrl(url);
    setShip(ship);
    setCode(code);
  }

  return (
    <ThemeProvider
      value={{
        dark: false,
        colors: {
          primary: '',
          background: '',
          card: '',
          text: '',
          border: '',
          notification: '',
        },
      }}
      children={undefined}>
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
          <Stack.Screen name="Login">
            {() => (
              <LinearGradient
                colors={['#ffd89b', '#19547b']}
                style={styles.gradientBackground}>
                <View style={styles.container}>
                  <TextInput
                    style={styles.input}
                    placeholder="url"
                    value={url}
                    onChangeText={setUrl}
                    autoCapitalize="none"
                  />

                  <TextInput
                    style={styles.input}
                    placeholder="ship"
                    value={ship}
                    onChangeText={text => setShip(text.toLowerCase())}
                    autoCapitalize="none"
                  />

                  <TextInput
                    style={styles.input}
                    placeholder="code"
                    value={code}
                    onChangeText={setCode}
                    secureTextEntry
                  />

                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleLogin(navigation)}>
                    <Text style={styles.buttonText}>Log in</Text>
                  </TouchableOpacity>

                  {logins.length > 0 &&
                    (console.log(logins),
                      (
                        <View style={styles.savedLogins}>
                          <Text style={styles.savedLoginsText}>Saved ships:</Text>
                          <FlatList
                            data={logins}
                            renderItem={renderItem}
                            keyExtractor={item => item.ship}
                            style={styles.loginList}
                          />
                        </View>
                      ))}
                </View>
              </LinearGradient>
            )}
          </Stack.Screen>
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

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
    borderRadius: 10,
  },
  headerBackground: {
    flexDirection: 'row',
    height: 120,
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
  },
  backButton: {
    marginLeft: 16,
    fontSize: 18,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  button: {
    width: '100%',
    height: 40,
    borderRadius: 4,
    backgroundColor: '#2e89ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
  },
  savedLogins: {
    marginTop: 30,
  },
  savedLoginsText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  loginList: {
    maxHeight: 120,
  },
  loginItem: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  loginText: {
    fontSize: 16,
  },
});

export default App;
