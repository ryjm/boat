import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ContactsList from './src/screens/ContactsList';
import { ThemeProvider } from './src/ThemeContext';
const Stack = createStackNavigator();

const App = () => {
    return (
        <ThemeProvider>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name="boaters"
                        options={{ title: 'boaters', headerShown: false }}
                        component={ContactsList}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </ThemeProvider>
    );
};

export default App;
