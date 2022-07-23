import React, { useContext, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { AuthContext } from "../navigation/Authentication";
import { windowHeight, windowWidth } from "../utils/Dimensions";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import { LinearGradient } from "expo-linear-gradient";

const itemData = [
  {
    num: 1,
    uri: "https://icons.iconarchive.com/icons/limav/flat-gradient-social/256/Twitter-icon.png",
  },
  {
    num: 2,
    uri: "https://icons.iconarchive.com/icons/designbolts/free-instagram/256/Active-Instagram-1-icon.png",
  },
  {
    num: 3,
    uri: "https://icons.iconarchive.com/icons/designbolts/free-instagram/256/Active-Instagram-1-icon.png",
  },
  {
    num: 4,
    uri: "https://icons.iconarchive.com/icons/designbolts/free-instagram/256/Active-Instagram-1-icon.png",
  },
  {
    num: 5,
    uri: "https://icons.iconarchive.com/icons/designbolts/free-instagram/256/Active-Instagram-1-icon.png",
  },
  {
    num: 6,
    uri: "https://icons.iconarchive.com/icons/designbolts/free-instagram/256/Active-Instagram-1-icon.png",
  },
];

const myItemData = [
  {
    num: 1,
    uri: "https://icons.iconarchive.com/icons/limav/flat-gradient-social/256/Twitter-icon.png",
  },
  {
    num: 2,
    uri: "https://icons.iconarchive.com/icons/designbolts/free-instagram/256/Active-Instagram-1-icon.png",
  },
  {
    num: 3,
    uri: "https://icons.iconarchive.com/icons/designbolts/free-instagram/256/Active-Instagram-1-icon.png",
  },
];

const Item = ({ item }) => {
  return <Image style={styles.item} source={{ uri: item.uri }} />;
};

const GameScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const [currentScore, setCurrentScore] = useState(0);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.profileImage}
        onPress={() => navigation.navigate("Profile")}
      >
        <Image
          source={require("../assets/anoyAvatar.png")}
          style={styles.image}
          resizeMode="cover"
        ></Image>
      </TouchableOpacity>

      <View style={styles.upperContainer}>
        <Text style={styles.text}>Current Score: {currentScore}</Text>
      </View>

      <View style={styles.bottomContainer}>
        <View style={styles.gridTop}>
          <FlatList
            data={itemData}
            numColumns={3}
            renderItem={Item}
            keyExtractor={(item) => item.num}
          />
        </View>

        <View style={styles.gridBottom}>
          <FlatList
            data={myItemData}
            numColumns={3}
            renderItem={Item}
            keyExtractor={(item) => item.num}
          />
        </View>

        <TouchableOpacity
          style={styles.instructionIcon}
          onPress={() => navigation.navigate("Instruction")}
        >
          <FontAwesome name="question-circle" size={50} color="#799c7b" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    alignItems: "center",
    fontFamily: "Baloo2_400Regular",
    fontSize: 24,
    color: "#333333",
    marginLeft: "8%",
  },

  gridTop: {
    flex: 3,
    width: windowWidth * 0.7,
    borderWidth: 1.5,
    borderRadius: 5,
    borderColor: "red",
    marginTop: "15%",
  },

  gridBottom: {
    flex: 1,
    width: windowWidth * 0.7,
    borderWidth: 1.5,
    borderRadius: 5,
    borderColor: "red",
    marginTop: "5%",
  },

  item: {
    flex: 1,
    resizeMode: "stretch",
    aspectRatio: 5 / 7,
    maxWidth: "33%", // 100% devided by the number of rows you want
    alignItems: "center",
    margin: 10,
    backgroundColor: "rgba(249, 180, 45, 0.25)",
    borderWidth: 1.5,
    borderRadius: 5,
    borderColor: "red",
  },

  upperContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: "#c5dbc6",
    elevation: 20,
    flexDirection: "row",
    alignItems: "center",
  },

  profileImage: {
    position: "absolute",
    top: windowHeight / 7 - windowWidth / 10,
    right: "8%",
    alignSelf: "flex-end",
    width: windowWidth / 5,
    height: windowWidth / 5,
    borderWidth: 2.5,
    borderColor: "#8aa88b",
    borderRadius: 100,
    overflow: "hidden",
    zIndex: 10,
  },

  image: {
    flex: 1,
    height: windowWidth / 5,
    width: windowWidth / 5,
  },

  bottomContainer: {
    flex: 6,
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
    borderTopRightRadius: 30,
  },

  instructionIcon: {
    margin: "8%",
    alignSelf: "flex-start",
  },
});
