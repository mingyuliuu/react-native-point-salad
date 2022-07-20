import React from "react";
import { StyleSheet, Image } from "react-native";

import Onboarding from "react-native-onboarding-swiper";

const InstructionScreen = ({ navigation }) => {
  return (
    <Onboarding
      onSkip={() => navigation.replace("Login")}
      onDone={() => navigation.navigate("Login")}
      pages={[
        {
          backgroundColor: "#96d7c6",
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
          backgroundColor: "#cdb3d4",
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
        {
          backgroundColor: "#e7b7c8",
          image: (
            <Image
              style={styles.images}
              source={require("../assets/onboarding2.png")}
            />
          ),
          title: "Another option",
          subtitle:
            "Is to play a card, trying to put it into the firework pile. There are 5 colors of fireworks, and thus 5 piles. Each pile must be stacked by ascending order, meaning from 1 to 5. ",
          subTitleStyles: { paddingHorizontal: 12 },
        },
        {
          backgroundColor: "#ffbe88",
          image: (
            <Image
              style={styles.images}
              source={require("../assets/onboarding2.png")}
            />
          ),
          title: "When a card played",
          subtitle:
            "Can't be stacked into any piles, the team will lose 1 life, with 3 lives in total before the game ends. When the card pile exhausts, the game also ends. Try and aim for more fireworks before the game ends!",
          subTitleStyles: { paddingHorizontal: 12 },
        },
        {
          backgroundColor: "#fbc78d",
          image: (
            <Image
              style={styles.images}
              source={require("../assets/onboarding2.png")}
            />
          ),
          title: "Note that for each color,",
          subtitle:
            "There are 3 cards with number 1, 2 cards each with numbers 2 to 4, and only 1 card with number 5! So think carefully before you discard a card! Every time a 5 is placed correctly into the piles, a hint token is awarded.",
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
          title: "That's it!",
          subtitle:
            "Feel free to revisit the tutorial. Once you are familiar with the rules, go ahead and start your first game! Woo-Hoo!",
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
