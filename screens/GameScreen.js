import React, { useContext } from "react";
import { StyleSheet, View, Text } from "react-native";
import FormButton from "../components/FormButton";
import { AuthContext } from "../navigation/Authentication";

const GameScreen = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello {user.uid}</Text>
      <FormButton buttonTitle="Logout" onPress={() => logout()} />
    </View>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },

  text: {
    fontSize: 20,
    color: "#333333",
  },
});
