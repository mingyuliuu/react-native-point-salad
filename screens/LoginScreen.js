import React, { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

import FormInput from "../components/FormInput";
import SocialButton from "../components/SocialButton";

import Ionicons from "react-native-vector-icons/Ionicons";
import { AuthContext } from "../navigation/Authentication";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const {login} = useContext(AuthContext);

  return (
    <ImageBackground
      source={require("../assets/homebg.png")}
      resizeMode="cover"
      style={styles.background}
    >
      <View style={styles.container}>
        {/* Title Text */}
        <Text style={styles.text}>Point Salad</Text>

        {/* Upper Container - Signing In by Email */}
        <View style={styles.signInContainer}>
          <View style={styles.signInInputs}>
            <FormInput
              labelValue={email}
              onChangeText={(userEmail) => setEmail(userEmail)}
              placeholderText="Email"
              iconType="user"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              showEye={false}
            />

            <FormInput
              labelValue={password}
              onChangeText={(userPassword) => setPassword(userPassword)}
              placeholderText="Password"
              iconType="lock"
              showEye={true}
            />
          </View>

          <View style={styles.signInButton}>
            <Ionicons
              name="checkmark-done-sharp"
              size={40}
              color="white"
              onPress={() => login(email, password)}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.forgotButton} onPress={() => {}}>
          <Text style={styles.navButtonText}>Forgot Password?</Text>
        </TouchableOpacity>

        {/* Bottom Container - Signing In by Social Accounts */}
        <View style={styles.socialButton}>
          <SocialButton
            btnType="facebook"
            color="#4867aa"
            backgroundColor="#e6eaf4"
            onPress={() => {}}
          />

          <SocialButton
            btnType="google"
            color="#de4d41"
            backgroundColor="#f5e7ea"
            onPress={() => {}}
          />

          <SocialButton
            btnType="wechat"
            color="#63a32f"
            backgroundColor="#ebf4e6"
            onPress={() => {}}
          />
        </View>

        <TouchableOpacity
          style={styles.forgotButton}
          onPress={() => navigation.navigate("Signup")}
        >
          <Text style={styles.navButtonText}>
            Don't have an account? Create here.
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },

  background: {
    flex: 1,
    justifyContent: "center",
  },

  text: {
    fontFamily: "Baloo2_500Medium",
    fontSize: 32,
    marginBottom: 15,
    color: "black",
  },

  signInContainer: {
    width: "90%",
    flexDirection: "row",
  },

  signInInputs: {
    width: "80%",
    flexDirection: "column",
  },

  signInButton: {
    width: "20%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#6ca340",
    borderRadius: 5,
    marginBottom: 5,
    marginHorizontal: 5,
  },

  socialButton: {
    marginTop: 10,
    flexDirection: "row",
  },

  forgotButton: {
    marginTop: 15,
    marginBottom: 30,
  },

  navButtonText: {
    fontSize: 16,
    color: "black",
    fontFamily: "Lato_400Regular_Italic",
  },
});
