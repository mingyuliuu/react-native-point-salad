import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { windowHeight } from "../utils/Dimensions";

const FormButton = ({ buttonTitle, bgColor, ...rest }) => {
  return (
    <TouchableOpacity
      style={[
        styles.buttonContainer,
        { backgroundColor: bgColor ? bgColor : "#2e64e5" },
      ]}
      {...rest}
    >
      <Text style={styles.buttonText}>{buttonTitle}</Text>
    </TouchableOpacity>
  );
};

export default FormButton;

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 10,
    width: "100%",
    height: windowHeight / 15,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 3,
  },

  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
    fontFamily: "Lato_400Regular",
  },
});
