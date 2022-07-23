import React from "react";
import { StyleSheet, Image } from "react-native";

import Onboarding from "react-native-onboarding-swiper";

const InstructionScreen = ({ navigation }) => {
  return (
    <Onboarding
      onSkip={() => navigation.replace("Game")}
      onDone={() => navigation.navigate("Game")}
      pages={[
        {
          backgroundColor: "#85cbcc",
          image: (
            <Image
              style={styles.images}
              source={require("../assets/onboarding1.png")}
            />
          ),
          title: "Welcome to Point Salad!",
          subtitle:
            "This is a turn-based game, where you aim to get highest points by collecting vegetables, which will give you points calculated based on the point cards you have! Your points will be calculated when the game ends.",
          subTitleStyles: { paddingHorizontal: 12 },
        },
        {
          backgroundColor: "#a8dee0",
          image: (
            <Image
              style={styles.images}
              source={require("../assets/onboarding2.png")}
            />
          ),
          title: "In each turn, you can",
          subtitle:
            "Collect either 1 point card, or 2 vegetable cards. When the card pile is exhausted, you get a chance to flip as many point cards as you want (you will no longer gain points based on those rules, they will instead become vegetables).",
          subTitleStyles: { paddingHorizontal: 12 },
        },
        {
          backgroundColor: "#f9e2ae",
          image: (
            <Image
              style={styles.images}
              source={require("../assets/onboarding2.png")}
            />
          ),
          title: "Then the game is over!,",
          subtitle:
            "And your points will be calculated based on all cards you have at that time! Woohoo - Are you ready for a game? The rules will become much clearer when you actually try the game yourself!",
          subTitleStyles: { paddingHorizontal: 12 },
        },
      ]}
    />
  );
};

export default InstructionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  images: {
    width: 175,
    height: 175,
  },
});
