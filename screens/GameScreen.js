import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  TextComponent,
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
import { collection, collectionGroup, getDocs } from "firebase/firestore";

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
  const [currentScore, setCurrentScore] = useState(0);
  const [cards, setCards] = useState([]);

  const [myCards, setMyCards] = useState([]);
  const [myVeggies, setMyVeggies] = useState([
    {
      veggie: "carrot",
      num: 0,
    },
    {
      veggie: "cabbage",
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
  ]);

  const [cardPile, setCardPile] = useState([]);
  const [gameCardPile, setGameCardPile] = useState([]);

  const getCardPile = async () => {
    const cardsRef = collectionGroup(fs, "cards");
    let tempCardPile = [];

    const allCards = await getDocs(cardsRef);
    allCards.forEach((card) => {
      tempCardPile.push(card.data());
    });

    return tempCardPile;
  };

  const getGameCardPile = () => {
    let tempCardPile = [];

    for (let i = 0; i < 50; i++) {
      let random = Math.floor(Math.random() * cardPile.length);
      tempCardPile.push(cardPile[random]);
    }

    setGameCardPile(tempCardPile);
  };

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

  useEffect(() => {
    getCardPile().then((card) => setCardPile(card));
  }, []);

  useEffect(() => {
    getGameCardPile();
  }, [cardPile]);

  useEffect(() => {
    getInitCards();
  }, [gameCardPile]);

  const [images, setImages] = useState({});
  const listRef = ref(st, "/");

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

  const isActivated = () => {
    let sum = 0;
    cards.forEach((card) => {
      sum += card.num > 3 ? card.selected * 1 : card.selected * 2;
    });

    return sum == 2;
  };

  const getCards = () => {
    cards.forEach((card) => {
      if (card.num > 3 && card.selected) {
        let temp = [...myVeggies];
        temp.forEach((item) => {
          if (item.veggie == card.veg) item.num++;
        });
        setMyVeggies(temp);
      }
      card.selected = false;
    });
  };

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
        <TouchableOpacity
          style={{ marginHorizontal: 15 }}
          onPress={() => navigation.navigate("Instruction")}
        >
          <FontAwesome name="question-circle" size={50} color="#799c7b" />
        </TouchableOpacity>

        <Text style={styles.text}>Current Score: {currentScore}</Text>
      </View>

      <View style={styles.middleContainer}>
        <View style={styles.gridTop}>
          <FlatList
            data={cards}
            numColumns={3}
            renderItem={({ item }) => {
              return item.num > 3 ? (
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
                    cards[item.num - 1].selected =
                      !cards[item.num - 1].selected;
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

      <TouchableOpacity
        style={styles.addCardWrapper}
        onPress={() => getCards()}
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

      <View style={styles.bottomContainer}>
        <View style={styles.bottomLeftContainer}>
          <View style={styles.subtitle}>
            <Text style={styles.subtitleText}>Point Cards</Text>
          </View>

          <View style={styles.pointCardsContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <TouchableOpacity style={styles.pointCardWrapper}>
                <Image
                  resizeMode="cover"
                  style={styles.pointCard}
                  source={require("../assets/homebg.png")}
                />
              </TouchableOpacity>

              <TouchableOpacity style={styles.pointCardWrapper}>
                <Image
                  resizeMode="stretch"
                  style={styles.pointCard}
                  source={require("../assets/homebg.png")}
                />
              </TouchableOpacity>

              <TouchableOpacity style={styles.pointCardWrapper}>
                <Image
                  resizeMode="cover"
                  style={styles.pointCard}
                  source={require("../assets/homebg.png")}
                />
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>

        <View style={styles.bottomRightContainer}>
          <View style={styles.subtitle}>
            <Text style={styles.subtitleText}>Vegetables</Text>
          </View>

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

  text: {
    alignItems: "center",
    fontFamily: "Baloo2_400Regular",
    fontSize: 24,
    color: "#333333",
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
