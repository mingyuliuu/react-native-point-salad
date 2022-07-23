import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import GameScreen from "../screens/GameScreen";
import InstructionScreen from "../screens/InstructionScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SettingsScreen from "../screens/SettingsScreen";

const MyAppStack = createStackNavigator();

const AppStack = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  let routeName;

  useEffect(() => {
    AsyncStorage.getItem("alreadyLaunched").then((value) => {
      if (value == null) {
        AsyncStorage.setItem("alreadyLaunched", "true");
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(true);
      }
    });
  }, []);

  if (isFirstLaunch === null) {
    return null;
  } else if (isFirstLaunch == true) {
    routeName = "Instruction";
  } else {
    routeName = "Game";
  }

  return (
    <MyAppStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={routeName}
    >
      <MyAppStack.Screen name="Game" component={GameScreen} />
      <MyAppStack.Screen name="Instruction" component={InstructionScreen} />
      <MyAppStack.Screen name="Profile" component={ProfileScreen} />
      <MyAppStack.Screen name="Settings" component={SettingsScreen} />
    </MyAppStack.Navigator>
  );
};

export default AppStack;
