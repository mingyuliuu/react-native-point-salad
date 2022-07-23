import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import FormButton from "../components/FormButton";
import { AuthContext } from "../navigation/Authentication";

const SettingsScreen = () => {
  const { logout } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text>Settings Screen</Text>
      <Text>To be constructed</Text>

      <FormButton buttonTitle="Logout" onPress={() => logout()} />
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
