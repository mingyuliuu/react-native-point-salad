import React from "react";
import Providers from "./navigation";

import AppLoading from 'expo-app-loading';
import { useFonts, Lato_400Regular, Lato_400Regular_Italic } from '@expo-google-fonts/lato';
import { Baloo2_500Medium, Baloo2_400Regular } from '@expo-google-fonts/baloo-2';
import { Kufam_400Regular } from '@expo-google-fonts/kufam';

const App = () => {
  let [fontsLoaded] = useFonts({
    Lato_400Regular,
    Lato_400Regular_Italic,
    Baloo2_500Medium,
    Baloo2_400Regular,
    Kufam_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return <Providers />;
};

export default App;
