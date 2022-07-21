import React, { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

import FontAwesome from "react-native-vector-icons/FontAwesome";

import FormButton from "../components/FormButton";
import FormInput from "../components/FormInput";
import SocialButton from "../components/SocialButton";
import { AuthContext } from "../navigation/Authentication";

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const { register } = useContext(AuthContext);

  return (
    <ImageBackground
      source={require("../assets/homebg.png")}
      resizeMode="cover"
      style={styles.background}
    >
      <View style={styles.container}>
        {/* Button to go back to previous screen */}
        <View style={{ position: "absolute", left: 0, top: 0 }}>
          <FontAwesome.Button
            style={{ padding: 20 }}
            name="long-arrow-left"
            size={20}
            backgroundColor="rgb(186, 221, 172)"
            color="black"
            onPress={() => navigation.navigate("Login")}
          />
        </View>

        {/* Title Text */}
        <Text style={styles.text}>Create an Account</Text>

        {/* Upper Container - Signing Up by Email */}
        <View style={styles.signInContainer}>
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

          <FormInput
            labelValue={confirmPassword}
            onChangeText={(userPassword) => setConfirmPassword(userPassword)}
            placeholderText="Confirm Password"
            iconType="lock"
            showEye={true}
          />

          <FormButton
            buttonTitle="Sign Up"
            onPress={() => register(email, password)}
          />
        </View>

        {/* Bottom Container - Signing Up by Social Accounts */}
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

        {/* Return to login page  */}
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.navButtonText}>Have an account? Sign In</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default SignupScreen;

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
    fontFamily: "Baloo2_400Regular",
    fontSize: 28,
    marginBottom: 30,
    color: "black",
  },

  signInContainer: {
    width: "90%",
    marginBottom: 50,
  },

  socialButton: {
    marginTop: 10,
    flexDirection: "row",
  },

  navButtonText: {
    fontSize: 16,
    color: "black",
    fontFamily: "Lato_400Regular_Italic",
    marginTop: 20,
  },
});
