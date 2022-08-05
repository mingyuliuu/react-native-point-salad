import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  ImageBackground,
} from "react-native";
import { AuthContext, st } from "../navigation/Authentication";
import { windowHeight, windowWidth } from "../utils/Dimensions";
import { ref, getDownloadURL, listAll } from "firebase/storage";

import { fs } from "../navigation/Authentication";

import FontAwesome from "react-native-vector-icons/FontAwesome";

import TomatoImage from "../assets/tomato.png";
import CabbageImage from "../assets/cabbage.png";
import LettuceImage from "../assets/lettuce.png";
import CarrotImage from "../assets/carrot.png";
import PotatoImage from "../assets/potato.png";
import PepperImage from "../assets/pepper.png";
import {
  doc,
  getDoc,
  collectionGroup,
  getDocs,
  updateDoc,
} from "firebase/firestore";

const initVeggies = [
  {
    veggie: "cabbage",
    num: 0,
  },
  {
    veggie: "carrot",
    num: 0,
  },
  {
    veggie: "lettuce",
    num: 0,
  },
  {
    veggie: "pepper",
    num: 0,
  },
  {
    veggie: "potato",
    num: 0,
  },
  {
    veggie: "tomato",
    num: 0,
  },
];

const getVeggieImage = (veggie) => {
  switch (veggie) {
    case "tomato":
      return Image.resolveAssetSource(TomatoImage).uri;
    case "cabbage":
      return Image.resolveAssetSource(CabbageImage).uri;
    case "lettuce":
      return Image.resolveAssetSource(LettuceImage).uri;
    case "carrot":
      return Image.resolveAssetSource(CarrotImage).uri;
    case "potato":
      return Image.resolveAssetSource(PotatoImage).uri;
    case "pepper":
      return Image.resolveAssetSource(PepperImage).uri;
  }
};

const VeggieItem = ({ item }) => {
  return (
    <View style={styles.veggieSymbol}>
      <Image
        style={styles.veggieImage}
        source={{ uri: getVeggieImage(item.veggie) }}
      />
      <Text style={styles.veggieCount}>{item.num}</Text>
    </View>
  );
};

const GameScreen = ({ navigation }) => {
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

  const [currentScore, setCurrentScore] = useState(0);

  const [myCards, setMyCards] = useState([]);
  const [myVeggies, setMyVeggies] = useState(initVeggies);

  const [cardPile, setCardPile] = useState([]);
  const [gameCardPile, setGameCardPile] = useState([]);
  const [cards, setCards] = useState([]);

  const [modalVisibility, setModalVisibility] = useState(false);

  // Fetch all cards from the available cards stored in Firestore
  const getCardPile = async () => {
    const cardsRef = collectionGroup(fs, "cards");
    let tempCardPile = [];

    const allCards = await getDocs(cardsRef);
    allCards.forEach((card) => {
      tempCardPile.push(card.data());
    });

    return tempCardPile;
  };

  // Get 50 random cards as the card pile for this game
  const getGameCardPile = () => {
    let tempCardPile = [];

    for (let i = 0; i < 50; i++) {
      let random = Math.floor(Math.random() * cardPile.length);
      tempCardPile.push(cardPile[random]);
    }

    setGameCardPile(tempCardPile);
  };

  // Get the initial 9 cards from the game card pile.
  const getInitCards = () => {
    if (
      gameCardPile.length == 0 ||
      gameCardPile[0] == undefined ||
      gameCardPile[49] == undefined
    )
      return;

    let tempCardPile = [];
    for (var i = 0; i < 9; i++) {
      let tempCard = gameCardPile.shift();

      tempCardPile[i] = {
        num: i + 1,
        veg: tempCard != undefined ? tempCard.veg : "tomato",
        rule: tempCard != undefined ? tempCard.rule : "tomatoR1",
        selected: false,
      };
    }

    setCards(tempCardPile);
  };

  // Game initialization
  const initGame = () => {
    setMyCards([]);
    setMyVeggies(initVeggies);
    setCurrentScore(0);
    getCardPile().then((card) => setCardPile(card));
  };

  useEffect(() => {
    initGame();
  }, []);

  // Put 50 random cards in the card pile for this game once available cards load up
  useEffect(() => {
    getGameCardPile();
  }, [cardPile]);

  // Put 9 cards in the initial card pile once game card pile loads up
  useEffect(() => {
    getInitCards();
  }, [gameCardPile]);

  const [images, setImages] = useState({});
  const listRef = ref(st, "/");

  // Load all images from Firebase Storage
  const fetchFromStorage = async () => {
    const reference = await listAll(listRef);
    var imageHolder = {};

    for (let i = 0; i < reference.items.length; i++) {
      await getDownloadURL(ref(st, reference.items[i])).then((url) => {
        let name = url
          .substring(0, url.indexOf("?"))
          .substring(url.substring(0, url.indexOf("?")).lastIndexOf("/") + 1);
        imageHolder[name] = url;
      });
    }

    return imageHolder;
  };

  useEffect(() => {
    fetchFromStorage().then((images) => setImages(images));
  }, [images]);

  // Check whether a player is allowed to take cards (either 2 veg cards or 1 point card)
  // A player is allowed to take the card if there's only 1 veg card remaining
  const isActivated = () => {
    let sum = 0;
    let num = 0;
    cards.forEach((card) => {
      sum += card.num > 3 ? card.selected * 1 : card.selected * 2;
      num += card.veg != "empty";
    });
    
    return sum == 2 || num == 1;
  };

  // Take cards, update player's veg and point cards, and load new cards from card pile
  const getCards = () => {
    cards.forEach((card) => {
      if (card.num > 3 && card.selected) {
        // Take a veggie card => cards above will drop (and flip)
        let temp = [...myVeggies];
        temp.forEach((item) => {
          if (item.veggie == card.veg) item.num++;
        });
        setMyVeggies(temp);

        let tempCard = gameCardPile.shift();
        let tempCardPile = cards;

        tempCardPile[card.num - 1] = {
          num: card.num,
          veg: tempCardPile[card.num - 4].veg,
          rule: tempCardPile[card.num - 4].rule,
          selected: false,
        };

        if (card.num < 7) {
          tempCardPile[card.num - 4] = {
            num: card.num - 3,
            veg: tempCard != undefined ? tempCard.veg : "empty",
            rule: tempCard != undefined ? tempCard.rule : "empty",
            selected: false,
          };
        } else {
          tempCardPile[card.num - 4] = {
            num: card.num - 3,
            veg: tempCardPile[card.num - 7].veg,
            rule: tempCardPile[card.num - 7].rule,
            selected: false,
          };

          tempCardPile[card.num - 7] = {
            num: card.num - 6,
            veg: tempCard != undefined ? tempCard.veg : "empty",
            rule: tempCard != undefined ? tempCard.rule : "empty",
            selected: false,
          };
        }

        setCards(tempCardPile);

        // When there are no more cards, show the modal indicating that game is over
        let numCards = 0;
        cards.forEach((card) => {
          numCards += card.veg != "empty";
        });
        if (numCards == 0 && gameCardPile.length == 0) {
          setModalVisibility();
          updateHighestScore();
        }

      } else if (card.num <= 3 && card.selected) {
        // Take a point card => fetching a new point card
        let tempCard = gameCardPile.shift();
        let tempCardPile = cards;

        tempCardPile[card.num - 1] = {
          num: card.num,
          veg: tempCard != undefined ? tempCard.veg : "empty",
          rule: tempCard != undefined ? tempCard.rule : "empty",
          selected: false,
        };
        setCards(tempCardPile);

        setMyCards([
          {
            rule: card.rule,
            key: myCards.length,
          },
          ...myCards,
        ]);
      }
    });
  };

  // Update score when the user's card pile or veggie pile change
  const calculateScore = () => {
    let tempScore = 0;

    myCards.forEach((card) => {
      if (card.rule === "cabbageR1") {
        tempScore += myVeggies[4].num * 2 - myVeggies[5].num;
      } else if (card.rule === "cabbageR2") {
        tempScore += Math.min(myVeggies[4].num, myVeggies[1].num) * 5;
      } else if (card.rule === "carrotR1") {
        tempScore += myVeggies[5].num * 2 - myVeggies[0].num;
      } else if (card.rule === "carrotR2") {
        tempScore += Math.min(myVeggies[0].num, myVeggies[5].num) * 5;
      } else if (card.rule === "lettuceR1") {
        tempScore += myVeggies[0].num * 2 - myVeggies[1].num;
      } else if (card.rule === "lettuceR2") {
        tempScore +=
          Math.min(myVeggies[1].num, myVeggies[3].num, myVeggies[5].num) * 8;
      } else if (card.rule === "pepperR1") {
        tempScore += myVeggies[1].num * 2 - myVeggies[2].num;
      } else if (card.rule === "pepperR2") {
        tempScore +=
          Math.min(myVeggies[0].num, myVeggies[2].num, myVeggies[4].num) * 8;
      } else if (card.rule === "potatoR1") {
        tempScore += myVeggies[2].num * 2 - myVeggies[3].num;
      } else if (card.rule === "potatoR2") {
        tempScore += Math.min(myVeggies[2].num, myVeggies[3].num) * 5;
      } else if (card.rule === "tomatoR1") {
        tempScore += myVeggies[3].num * 2 - myVeggies[4].num;
      } else if (card.rule === "tomatoR2") {
        tempScore += Math.min(myVeggies[1].num, myVeggies[2].num) * 5;
      }
    });

    setCurrentScore(tempScore);
  };

  useEffect(() => {
    calculateScore();
  }, [myCards, myVeggies]);

  // Update highest score in the user's profile
  const updateHighestScore = () => {
    if (currentScore > userData.highestScore) {
      const userRef = doc(fs, "userData", user.uid);

      updateDoc(userRef, "highestScore", currentScore);
    }
  };

  // Close the modal and init a new game
  const closeModal = () => {
    setModalVisibility(false);
    initGame();
  };

  return (
    <View style={styles.container}>
      {/* The modal that shows up when a game is finished. */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisibility}
      >
        <ImageBackground
          source={require("../assets/homebg.png")}
          resizeMode="cover"
          style={styles.modal}
        >
          <Text style={[styles.textModal, { fontSize: 32 }]}>
            Game is Over!
          </Text>
          <Text style={[styles.textModal, { fontSize: 24, color: "#5c5c5c" }]}>
            Woo-hoo! You got {currentScore} points!
          </Text>

          <TouchableOpacity
            style={styles.iconModal}
            onPress={() => {
              closeModal();
            }}
          >
            <Image
              source={require("../assets/replay.png")}
              style={styles.image}
              resizeMode="cover"
            ></Image>
          </TouchableOpacity>
        </ImageBackground>
      </Modal>

      {/* The profile icon (with an absolute position to overlay two containers). */}
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

      {/* The container showing the instructions icon and current score. */}
      <View style={styles.upperContainer}>
        <TouchableOpacity
          style={{ marginHorizontal: 15 }}
          onPress={() => navigation.navigate("Instruction")}
        >
          <FontAwesome name="question-circle" size={50} color="#799c7b" />
        </TouchableOpacity>

        <View>
          <Text style={styles.text}>Current Score: {currentScore}</Text>
          <Text style={styles.textSmall}>
            Cards remaining: {gameCardPile.length}
          </Text>
        </View>
      </View>

      {/* The container showing the card pile. */}
      <View style={styles.middleContainer}>
        <View style={styles.gridTop}>
          <FlatList
            data={cards}
            numColumns={3}
            renderItem={({ item }) => {
              return item.veg == "empty" ? (
                <View style={styles.itemWrapper} />
              ) : item.num > 3 ? (
                <TouchableOpacity
                  style={[
                    styles.itemWrapper,
                    item.selected
                      ? {
                          elevation: 15,
                          borderWidth: 2,
                          borderColor: "#abb8ac",
                        }
                      : {},
                  ]}
                  onPress={() => {
                    let temp = [...cards];
                    temp[item.num - 1].selected = !temp[item.num - 1].selected;
                    setCards(temp);
                  }}
                >
                  <Image
                    style={styles.item}
                    source={{ uri: images[item.veg + ".png"] }}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={[
                    styles.itemWrapper,
                    item.selected
                      ? {
                          elevation: 15,
                          borderWidth: 2,
                          borderColor: "#abb8ac",
                        }
                      : {},
                  ]}
                  onPress={() => {
                    let temp = [...cards];
                    temp[item.num - 1].selected = !temp[item.num - 1].selected;
                    setCards(temp);
                  }}
                >
                  <Image
                    style={styles.item}
                    source={{ uri: images[item.rule + ".png"] }}
                  />
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item) => item.num}
          />
        </View>
      </View>

      {/* The + icon that allows a player to take cards from the pile. */}
      <TouchableOpacity
        style={styles.addCardWrapper}
        onPress={isActivated() ? () => getCards() : () => {}}
      >
        <Image
          resizeMode="cover"
          style={styles.addCardIcon}
          source={
            isActivated()
              ? require("../assets/activated.png")
              : require("../assets/inactivated.png")
          }
        />
      </TouchableOpacity>

      {/* The container showing all the point cards the player currently has. */}
      <View style={styles.bottomContainer}>
        <View style={styles.bottomLeftContainer}>
          <View style={styles.subtitle}>
            <Text style={styles.subtitleText}>Point Cards</Text>
          </View>

          {/* Using a horizontally scrollable list. */}
          <View style={styles.pointCardsContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {myCards.map((pointCard) => {
                return (
                  <TouchableOpacity
                    key={pointCard.key}
                    style={styles.pointCardWrapper}
                  >
                    <Image
                      resizeMode="cover"
                      style={styles.pointCard}
                      source={{ uri: images[pointCard.rule + ".png"] }}
                    />
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </View>

        {/* The container showing how many of each vegetable the player currently has. */}
        <View style={styles.bottomRightContainer}>
          <View style={styles.subtitle}>
            <Text style={styles.subtitleText}>Vegetables</Text>
          </View>

          {/* Displaying in 2 columns. */}
          <View style={styles.veggiesContainer}>
            <View style={styles.veggiesGrid}>
              <FlatList
                data={myVeggies}
                numColumns={2}
                renderItem={VeggieItem}
                keyExtractor={(item) => item.veggie}
              />
            </View>
          </View>
        </View>
      </View>

      {/* To leave space at the bottom of the screen. */}
      <View style={styles.emptyFooterContainer}></View>
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

  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  textModal: {
    fontFamily: "Baloo2_500Medium",
    marginBottom: 15,
    color: "#1c1c1c",
  },

  iconModal: {
    width: windowWidth / 5,
    height: windowWidth / 5,
    overflow: "hidden",
  },

  text: {
    alignItems: "center",
    fontFamily: "Baloo2_400Regular",
    fontSize: 24,
    color: "#333333",
  },

  textSmall: {
    alignItems: "center",
    fontFamily: "Baloo2_400Regular",
    fontSize: 16,
    color: "#5b5b5b",
  },

  gridTop: {
    flex: 3,
    width: windowWidth * 0.7,
    marginTop: "15%",
    borderRadius: 10,
    backgroundColor: "white",
    elevation: 10,
  },

  itemWrapper: {
    flex: 1,
    resizeMode: "stretch",
    aspectRatio: 5 / 7,
    maxWidth: "33%", // 100% devided by the number of rows you want
    alignItems: "center",
    margin: 10,
    backgroundColor: "rgba(249, 180, 45, 0.25)",
    borderRadius: 5,
  },

  item: {
    flex: 1,
    resizeMode: "stretch",
    aspectRatio: 5 / 7,
    borderRadius: 5,
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
    top: windowHeight / 9 - windowWidth / 10,
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

  middleContainer: {
    flex: 5,
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
  },

  bottomContainer: {
    flex: 2.5,
    width: "90%",
    flexDirection: "row",
  },

  bottomLeftContainer: {
    flex: 2,
    marginRight: 10,
    height: "100%",
    paddingVertical: 15,
    flexDirection: "column",
  },

  bottomRightContainer: {
    flex: 1,
    height: "100%",
    paddingVertical: 15,
    flexDirection: "column",
  },

  subtitle: {
    paddingHorizontal: 10,
    marginVertical: 10,
  },

  subtitleText: {
    fontFamily: "Lato_400Regular",
    fontSize: 16,
    color: "#585a61",
  },

  pointCardsContainer: {
    flex: 1,
  },

  pointCardWrapper: {
    height: "90%",
    elevation: 5,
    backgroundColor: "white",
    marginHorizontal: 5,
    borderRadius: 15,
    aspectRatio: 5 / 7,
  },

  pointCard: {
    borderRadius: 15,
    height: "100%",
    aspectRatio: 5 / 7,
  },

  emptyFooterContainer: {
    flex: 0.5,
  },

  veggiesContainer: {
    flex: 0.95,
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 3,
  },

  veggiesGrid: {
    flex: 2,
  },

  veggieSymbol: {
    flex: 1,
    aspectRatio: 4 / 3,
    maxWidth: "50%",
    marginVertical: 2,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  veggieImage: {
    flex: 1,
    resizeMode: "stretch",
    aspectRatio: 1,
    maxWidth: "50%", // 100% devided by the number of rows you want
  },

  veggieCount: {
    fontFamily: "Lato_400Regular",
    fontSize: 12,
    color: "#585a61",
    marginRight: "10%",
  },

  addCardWrapper: {
    position: "absolute",
    top: (windowHeight / 8.5) * 6 - windowWidth / 8,
  },

  addCardIcon: {
    width: windowWidth / 8,
    height: windowWidth / 8,
  },
});
