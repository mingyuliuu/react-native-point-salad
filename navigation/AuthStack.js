import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";

const AppStack = createStackNavigator();

const AuthStack = () => {
  return (
    <AppStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={"Login"}
    >
      <AppStack.Screen name="Login" component={LoginScreen} />
      <AppStack.Screen
        name="Signup"
        component={SignupScreen}
      />
    </AppStack.Navigator>
  );
};

export default AuthStack;
