import React, { useState, useContext, useRef, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Keyboard,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import themeContext from "../helper/ThemeCon";
import DeckSwiper from "react-native-deck-swiper";
import { socket } from "../util/connectionChat";
import {
  getGlobalData,
  getAllGlobalData,
} from "../backend/querys/inserts/New_email";
import {
  generaldates,
  getTutorialValue,
  updateTutorialValue,
} from "../lib/querys";
import Tutorial from "../components/Tutorial";

interface TaskInterface {
  user: string;
  sangre: string;
  municipio: string;
  descripcion: string;
  index?: number;
  image: String;
}

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

function Home() {
  const [datos, setDatos] = useState(null);
  const [user, setUser] = useState(null);
  const [newGroup, setNewGroup] = useState("");
  const [secondNewGroup, setSecondNewGroup] = useState("Alex Robles");
  const [allChatGroups, setAllChatRooms] = useState([]);
  const theme = useContext(themeContext);
  const [tasks, setTasks] = useState([]);
  const swiperRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showTutorial, setShowTutorial] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      tabBarStyle: showTutorial ? { display: "none" } : undefined,
    });
  }, [showTutorial]);

  useEffect(() => {
    async function fetchUserData() {
      const tutorialValue = await getTutorialValue(getGlobalData("email"));
      console.log(tutorialValue);
      if (tutorialValue) {
        setShowTutorial(false);
      } else {
        setShowTutorial(true);
      }
    }
    fetchUserData();
  }, []);

  useEffect(() => {
    socket.emit("getAllGroups");

    user?.socket.on("groupList", (groups) => {
      setAllChatRooms(groups);
    });
  }, [socket]);

  useEffect(() => {
    async function fetchData() {
      const result = await getDatabase();
      setTasks(result);
    }
    fetchData();
  }, []);

  const handleCreateNewRoom = (user) => {
    try {
      //i get the global user
      const usuario = getGlobalData("usuario");
      console.log("lo que imprimo es=", usuario, "y", user);
      setNewGroup(usuario);

      socket.emit("createNewGroup", {
        currentGroupName: usuario,
        currentSecondGroup: user,
      });
      Keyboard.dismiss();
    } catch (error) {
      console.error("Error creating new group:", error);
    }
  };

  const getDatabase = async () => {
    try {
      const data = await generaldates();
      const list = [];
      let i = 0;
      const show = data.length;
      console.log("la longitud de la lista es", show);
      const datos = data.map((user) => ({
        id: user.Email,
        user: user.UserName,
        sangre: user.Blood_Type,
        municipio: user.City,
        descripcion: user.Situation,
      }));
      console.log("los datos son", datos);
      while (i <= show - 1) {
        console.log(i);
        let dat = getGlobalData("usuario");
        console.log("el usuario es=", dat);
        console.log("data", data[i].UserName);
        if (dat === data[i].UserName) {
          console.log("hola");
          i++;
        } else {
          const dates = [
            {
              id: data[i].Email,
              user: data[i].UserName,
              sangre: data[i].Blood_Type,
              municipio: data[i].City,
              descripcion: data[i].Situation,
              image: data[i].url,
            },
          ];

          i++;
          list.push(dates);
        }
      }

      return list;
    } catch (error) {
      console.log(error);
    }
  };

  const swipeRight = (cardIndex) => {
    console.log("Deslizamiento hacia la derecha detectado", cardIndex);
    let matchedCard = tasks[cardIndex][0]; // aqui tengo la lista de listas para agarrar al usuario
    const card = matchedCard.user;
    console.log("loque agarra de la carta es", card);
    handleCreateNewRoom(card);
  };

  const swipeLeft = () => {
    console.log("Deslizamiento hacia la izquierda detectado");
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const renderCard = (task: TaskInterface) => {
    if (!task) {
      console.log("Datos incompletos");
      return <Text>there's not a dates in </Text>;
    }
    return (
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <Image source={{ uri: task[0].image }} style={styles.image} />
          <Text style={styles.textBold}>{task[0].firstName}</Text>
          <Text style={styles.textBold}>{task[0].Blood_Type}</Text>
          <Text style={styles.textBold}>{task[0].City}</Text>
          <Text style={styles.text}>{task[0].Situation}</Text>
        </View>
      </View>
    );
  };

  const onClose = () => {
    async function updateTutorial() {
      const result = await updateTutorialValue(getGlobalData("email"));
      console.log("Checando result: ", result);
    }
    updateTutorial();
    setShowTutorial(false);
    console.log("onClose", showTutorial);
  };

  if (showTutorial) {
    return <Tutorial onClose={onClose} />;
  } else {
    return (
      <LinearGradient
        colors={["white", theme.background]}
        style={styles.container}
      >
        <StatusBar style="auto" />
        <Text style={styles.title}>Ayuda a: </Text>
        <DeckSwiper
          ref={swiperRef}
          cards={tasks}
          renderCard={renderCard}
          onSwipedRight={(cardIndex) => swipeRight(cardIndex)}
          onSwipedLeft={swipeLeft}
          backgroundColor="transparent"
          stackSize={2}
          stackSeparation={15}
          animateOverlayLabelsOpacity
          animateCardOpacity
          disableBottomSwipe
          disableTopSwipe
          infinite
          overlayLabels={{
            left: {
              element: (
                <Image
                  source={require("../images/next.png")}
                  style={styles.overlayImage}
                />
              ),
              style: {
                wrapper: {
                  flexDirection: "column",
                  alignItems: "flex-end",
                  justifyContent: "flex-start",
                  marginTop: 0,
                  marginLeft: -25,
                },
              },
            },
            right: {
              element: (
                <Image
                  source={require("../images/donate.png")}
                  style={styles.overlayImage}
                />
              ),
              style: {
                label: {
                  backgroundColor: "blue",
                  color: "white",
                  fontSize: 24,
                },
                wrapper: {
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  marginTop: 0,
                  marginLeft: 25,
                },
              },
            },
          }}
        />
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 0,
  },
  cardContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.7,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    borderRadius: 20,
    shadowRadius: 3,
    shadowOpacity: 0.2,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  image: {
    width: "80%",
    height: "40%",
    borderRadius: 50,
    marginBottom: 10,
    resizeMode: "cover",
  },
  text: {
    fontSize: 16,
    marginTop: 15,
    textAlign: "justify",
  },
  textBold: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  overlayImage: {
    width: "20%",
    height: "30%",
    resizeMode: "contain",
  },
});

export default Home;
