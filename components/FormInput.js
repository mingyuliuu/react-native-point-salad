import React, { useState } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { windowHeight, windowWidth } from "../utils/Dimensions";

import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const FormInput = ({
  labelValue,
  placeholderText,
  iconType,
  showEye,
  showSecureEntry,
  ...rest
}) => {
  const [showItem, setShowItem] = useState(true);

  const changeItemVisibility = () => {
    setShowItem(!showItem);
  };

  return (
    <View style={styles.inputContainer}>
      <View style={styles.iconStyle}>
        <AntDesign name={iconType} size={20} color="#666" />
      </View>
      <TextInput
        value={labelValue}
        style={styles.input}
        numberOfLines={1}
        placeholder={placeholderText}
        placeholderTextColor="#666"
        secureTextEntry={showItem && showSecureEntry}
        {...rest}
      />
      {showEye ? (
        <View style={styles.eyeStyle}>
          <MaterialIcons
            name={showItem ? "visibility" : "visibility-off"}
            size={20}
            color="#666"
            onPress={() => changeItemVisibility()}
          />
        </View>
      ) : null}
    </View>
  );
};

export default FormInput;

const styles = StyleSheet.create({
  text: {
    fontFamily: "Kufam-SemiBoldItalic",
  },

  inputContainer: {
    marginBottom: 5,
    width: "100%",
    height: windowHeight / 18,
    borderColor: "#ccc",
    borderRadius: 5,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
  },

  iconStyle: {
    padding: 5,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRightColor: "#ccc",
    borderRightWidth: 1,
    width: 40,
  },

  input: {
    padding: 10,
    flex: 1,
    fontSize: 16,
    fontFamily: "Lato_400Regular",
    color: "#333",
    justifyContent: "center",
    alignItems: "center",
  },

  inputField: {
    padding: 10,
    marginTop: 5,
    marginBottom: 5,
    width: windowWidth / 1.5,
    height: windowHeight / 15,
    fontSize: 16,
    borderRadius: 8,
    borderWidth: 1,
  },

  eyeStyle: {
    padding: 5,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    width: 40,
  },
});
