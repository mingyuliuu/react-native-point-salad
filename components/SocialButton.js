import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { windowHeight } from "../utils/Dimensions";

import FontAwesome from "react-native-vector-icons/FontAwesome";

const SocialButton = ({ btnType, color, backgroundColor, ...rest }) => {
  let bgColor = backgroundColor;

  return (
    <TouchableOpacity
      style={[styles.buttonContainer, { backgroundColor: bgColor }]}
      {...rest}
    >
      <FontAwesome name={btnType} style={styles.icon} size={18} color={color} />
    </TouchableOpacity>
  );
};

export default SocialButton;

const styles = StyleSheet.create({
  buttonContainer: {
    margin: 5,
    width: windowHeight / 18,
    height: windowHeight / 18,
    padding: 10,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },

  icon: {
    fontWeight: "bold",
  },
});
