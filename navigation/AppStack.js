import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const MyAppStack = createStackNavigator();

const AppStack = () => {
  return (
    <MyAppStack.Navigator>
        <MyAppStack.Screen name="Game" component={GameScreen} />
    </MyAppStack.Navigator>
  )
}

export default AppStack;