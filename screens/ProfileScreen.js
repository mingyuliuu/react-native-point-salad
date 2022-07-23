import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { windowWidth } from "../utils/Dimensions";

import { fs } from "../navigation/Authentication";
import { AuthContext } from "../navigation/Authentication";

import { doc, getDoc } from "firebase/firestore";

const ProfileScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);

  const getUser = async () => {
    const userRef = doc(fs, "userData", user.uid);

    const currentUser = await getDoc(userRef).then((documentSnapshot) => {
      if (documentSnapshot.exists) {
        return documentSnapshot.data();
      }
    });

    return currentUser;
  };

  useEffect(() => {
    getUser().then((user) => setUserData(user));
  }, [userData]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleBar}>
        <TouchableOpacity onPress={() => navigation.navigate("Game")}>
          <Ionicons name="arrow-back" size={24} color="#52575D"></Ionicons>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
          <Ionicons name="settings-sharp" size={24} color="#52575D"></Ionicons>
        </TouchableOpacity>
      </View>

      <View style={styles.profileImage}>
        <Image
          source={require("../assets/anoyAvatar.png")}
          style={styles.image}
          resizeMode="cover"
        ></Image>
      </View>

      <View style={styles.infoContainer}>
        <Text style={[styles.text, { fontSize: 24, color: "#727272" }]}>
          Hey
        </Text>

        <View>
          <Text
            style={[
              styles.text,
              { fontSize: 28, marginLeft: 5, color: "#2e2e2e" },
            ]}
          >
            {userData ? userData.name : ""}
          </Text>
        </View>

        <Text style={[styles.text, { fontSize: 24, color: "#727272" }]}>!</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statsBox}>
          <Text style={styles.text}>
            {userData ? userData.highestScore : "N/A"}
          </Text>
          <Text style={[styles.text, styles.subText]}>Highest Score</Text>
        </View>
        <View
          style={[
            styles.statsBox,
            { borderColor: "#DFD8C8", borderLeftWidth: 1 },
          ]}
        >
          <Text style={styles.text}>45</Text>
          <Text style={[styles.text, styles.subText]}>Friends</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },

  text: {
    fontFamily: "Lato_400Regular",
    color: "#52575D",
    fontSize: 24,
    marginBottom: 5,
  },

  image: {
    flex: 1,
    height: windowWidth / 3,
    width: windowWidth / 3,
  },

  titleBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    marginHorizontal: 16,
  },

  subText: {
    fontSize: 12,
    color: "#AEB5BC",
    textTransform: "uppercase",
    fontWeight: "500",
  },

  profileImage: {
    marginTop: "8%",
    alignSelf: "center",
    width: windowWidth / 3,
    height: windowWidth / 3,
    borderWidth: 3,
    borderColor: "#8aa88b",
    borderRadius: 100,
    overflow: "hidden",
  },

  infoContainer: {
    alignSelf: "center",
    alignItems: "center",
    marginTop: 16,
    flexDirection: "row",
  },

  statsContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 32,
  },

  statsBox: {
    alignItems: "center",
    flex: 1,
  },
});
