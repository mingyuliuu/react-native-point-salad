import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

const SignupScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Login Screen</Text>
      <Button title="Log In" onPress={() => alert("Log in clicked!")} />
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
