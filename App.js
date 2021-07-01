import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaView } from 'react-native';
import Home from './src/screens/';
import Splash from './src/screens/splash';
import Login from './src/screens/login';
import Register from './src/screens/register';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

const Auth = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

const Pages = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
       
          <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
          <Stack.Screen name="Auth" component={Auth} options={{ headerShown: false }} />
          <Stack.Screen name="Pages" component={Pages} options={{ headerShown: false }} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;



/*
import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaView } from 'react-native';
import Home from './src/screens/';
import Splash from './src/screens/splash';
import Login from './src/screens/login';
import Register from './src/screens/register';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const Pages = () => {
  return(
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
}
const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Pages">
        <Stack.Screen name="Pages" component={Pages} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;*/