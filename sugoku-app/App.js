import React from 'react';
import { 
  StyleSheet
} from 'react-native';

import HomeScreen from './src/screen/HomeScreen'
import GameScreen from './src/screen/GameScreen'
import FinishScreen from './src/screen/FinishScreen'
import GameOverScreen from './src/screen/GameOverScreen'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import store from './store/index'
import { Provider } from 'react-redux'

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerShown: false
        }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Game" component={GameScreen} />
          <Stack.Screen name="Finish" component={FinishScreen} />
          <Stack.Screen name="GameOver" component={GameOverScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  }
});

