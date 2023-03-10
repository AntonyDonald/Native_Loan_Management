
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  LogBox
} from 'react-native';
import Details from './component/Details';
import Login from './component/Login';
import Signup from './component/Signup';
import { DataProvider } from './context/DataContext';

const App = () => {
  const Stack = createNativeStackNavigator();
  // LogBox.ignoreAllLogs();

  return (
    <DataProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='Login'
          screenOptions={{
            header: () => null
          }}
        >
          <Stack.Screen name='Login' component={Login} />
          <Stack.Screen name='Signup' component={Signup} />
          <Stack.Screen name='Details' component={Details} />
        </Stack.Navigator>
      </NavigationContainer>
    </DataProvider>

  );
}

const styles = StyleSheet.create({

});

export default App;
