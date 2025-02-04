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
  Animated,
  PanResponder,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
  Platform
} from "react-native";
import { styled } from 'nativewind';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Heart, X, MessageCircle, MapPin, User, Settings, Search } from 'react-native-feather';
import { LinearGradient } from "expo-linear-gradient";
import Constants from 'expo-constants';
import { useNavigation } from "@react-navigation/native";
import themeContext from "../helper/ThemeCon";
import DeckSwiper from "react-native-deck-swiper";
import { socket } from "../util/connectionChat";
import { getGlobalData, getAllGlobalData } from "../backend/querys/inserts/New_email";
import {
  generaldates,
  getTutorialValue,
  updateTutorialValue,
} from "../lib/querys";
import Tutorial from "../components/Tutorial";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ModalFilters from '../components/ModalFilters'

interface TaskInterface {
  user: string;
  sangre: string;
  municipio: string;
  descripcion: string;
  index?: number;
  image: String;
}

const StyledView = styled(View);
const AnimatedView = Animated.createAnimatedComponent(StyledView);


const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

function Home() {
  const [datos, setDatos] = useState(null);
  const [user, setUser] = useState(null);
  const [newGroup, setNewGroup] = useState("");
  const [secondNewGroup, setSecondNewGroup] = useState("Alex Robles");
  const [allChatGroups, setAllChatRooms] = useState([]);
  const theme = useContext(themeContext);
  const navigation = useNavigation();
  const [tasks, setTasks] = useState([]);
  const swiperRef = useRef(null);
  // const [currentIndex, setCurrentIndex] = useState(0);
  const [showTutorial, setShowTutorial] = useState(false);
  const [users, setUsers] = useState([]);



  const [currentIndex, setCurrentIndex] = useState(0);
  const [showModalFilter, setShowModalFilter] = useState(false);
  const pan = useState(new Animated.ValueXY())[0];


  // useEffect(() => {
  //   async function fetchUserData() {
  //     try {
  //       const usuario = getGlobalData("usuario");
  //       setUser(usuario);

  //       const estadoTutorial = usuario?.estadoTutorial === "true";
  //       console.log("Entra al useeffect de serch");
  //       setShowTutorial(!estadoTutorial);
  //     } catch (error) {
  //       console.error("Error fetching user data", error);
  //     }
  //   }
  //   fetchUserData();
  // }, []);

  useEffect(() => {
    async function fetchUserData() {
      const tutorialValue = await getTutorialValue(getGlobalData("email"));
      console.log(tutorialValue)
      if (tutorialValue) {
        setShowTutorial(false);
      } else {
        setShowTutorial(true);
      }
    }

    async function fetchData() {
      const result = await getDatabase();
      // setTasks(result);
      setUsers(result);
      console.log("**************************************************************************");
      console.log(result);
      console.log("**************************************************************************");
    }

    fetchUserData();
    fetchData();
  }, []);

  useEffect(() => {
    socket.emit("getAllGroups");

    user?.socket.on("groupList", (groups) => {
      setAllChatRooms(groups);
    });
  }, [socket]);

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
        rol: user.role
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
              rol: data[i].role
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
    let matchedCard = users[cardIndex][0]; // aqui tengo la lista de listas para agarrar al usuario
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
          <Text style={styles.textBold}>{task[0].user}</Text>
          <Text style={styles.textBold}>{task[0].sangre}</Text>
          <Text style={styles.textBold}>{task[0].municipio}</Text>
          <Text style={styles.text}>{task[0].descripcion}</Text>
        </View>
      </View>
    );
  };

  // const Card = ({ user, pan, panResponders }) => (
  //   <AnimatedView
  //     className="absolute w-[300px] h-[400px] bg-white rounded-xl shadow-lg"
  //     style={{
  //       transform: [{ translateX: pan.x }, { translateY: pan.y }],
  //     }}
  //     {...panResponders.panHandlers}
  //   >
  //     <Image source={user[0].image} className="w-full h-3/4 rounded-t-xl" />
  //     <View className="p-4">
  //       <Text className="text-xl font-bold">{user[0].name}, {user[0].age}</Text>
  //       <Text className="text-lg font-semibold text-red-500">{user[0].bloodType}</Text>
  //       <Text className="text-sm text-gray-600">{user[0].description}</Text>
  //       <View className="mt-2 bg-green-500 rounded-full px-3 py-1 self-start">
  //         <Text className="text-white font-semibold">Disponible para donar</Text>
  //       </View>
  //     </View>
  //   </AnimatedView>
  // );

  const Card = ({ user, pan, panResponders }) => {
    if (!user) {
      return null;
    }
  
    return (
      <AnimatedView
        className="absolute w-[300px] h-[400px] bg-white rounded-xl shadow-lg"
        style={{
          transform: [{ translateX: pan.x }, { translateY: pan.y }],
        }}
        {...panResponders.panHandlers}
      >
        <Image source={{ uri: user.image }} className="w-full h-3/4 rounded-t-xl" />
        <View className="p-4">
          <Text className="text-xl font-bold">{user.user}</Text>
          <Text className="text-lg font-semibold text-red-500">{user.sangre}</Text>
          <Text className="text-sm text-gray-600">{user.municipio}</Text>
          <View className="mt-2 bg-green-500 rounded-full px-3 py-1 self-start">
            <Text className="text-white font-semibold">{user.rol === 'donor' ? 'Donador' : 'Receptor'}</Text>
          </View>
        </View>
      </AnimatedView>
    );
  };



  const panResponders = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], { useNativeDriver: false }),
    onPanResponderRelease: (_, gesture) => {
      if (gesture.dx > 120) {
        Animated.spring(pan, {
          toValue: { x: SCREEN_WIDTH + 100, y: gesture.dy },
          useNativeDriver: false,
        }).start(() => {
          setCurrentIndex(currentIndex + 1);
          pan.setValue({ x: 0, y: 0 });
        });
        console.log(`Match con ${users[currentIndex][0].user}`);
        swipeRight(currentIndex);
      } else if (gesture.dx < -120) {
        Animated.spring(pan, {
          toValue: { x: -SCREEN_WIDTH - 100, y: gesture.dy },
          useNativeDriver: false,
        }).start(() => {
          setCurrentIndex(currentIndex + 1);
          pan.setValue({ x: 0, y: 0 });
        });
        console.log(`Reject  ${users[currentIndex][0].user}`);
        swipeLeft();
      } else {
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start();
      }
    },
  });

  const handleMatch = () => {
    Animated.timing(pan, {
      toValue: { x: SCREEN_WIDTH + 100, y: 0 },
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      setCurrentIndex(currentIndex + 1);
      pan.setValue({ x: 0, y: 0 });
    });
    console.log(`Match con ${users[currentIndex][0].user}`);
    swipeRight(currentIndex);
  };

  const handleReject = () => {
    Animated.timing(pan, {
      toValue: { x: -SCREEN_WIDTH - 100, y: 0 },
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      setCurrentIndex(currentIndex + 1);
      pan.setValue({ x: 0, y: 0 });
    });
    console.log(`Reject  ${users[currentIndex][0].user}`);
    swipeLeft();
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
      // <LinearGradient
      //   colors={["white", theme.background]}
      //   style={styles.container}
      // >
      //   <StatusBar style="auto" />
      //   <Text style={styles.title}>Ayuda a: </Text>
      //   <DeckSwiper
      //     ref={swiperRef}
      //     cards={tasks}
      //     renderCard={renderCard}
      //     onSwipedRight={(cardIndex) => swipeRight(cardIndex)}
      //     onSwipedLeft={swipeLeft}
      //     backgroundColor="transparent"
      //     stackSize={2}
      //     stackSeparation={15}
      //     animateOverlayLabelsOpacity
      //     animateCardOpacity
      //     disableBottomSwipe
      //     disableTopSwipe
      //     infinite
      //     overlayLabels={{
      //       left: {
      //         element: (
      //           <Image
      //             source={require("../images/next.png")}
      //             style={styles.overlayImage}
      //           />
      //         ),
      //         style: {
      //           wrapper: {
      //             flexDirection: "column",
      //             alignItems: "flex-end",
      //             justifyContent: "flex-start",
      //             marginTop: 0,
      //             marginLeft: -25,
      //           },
      //         },
      //       },
      //       right: {
      //         element: (
      //           <Image
      //             source={require("../images/donate.png")}
      //             style={styles.overlayImage}
      //           />
      //         ),
      //         style: {
      //           label: {
      //             backgroundColor: "blue",
      //             color: "white",
      //             fontSize: 24,
      //           },
      //           wrapper: {
      //             flexDirection: "column",
      //             alignItems: "flex-start",
      //             justifyContent: "flex-start",
      //             marginTop: 0,
      //             marginLeft: 25,
      //           },
      //         },
      //       },
      //     }}
      //   />
      // </LinearGradient>




      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 bg-gray-100"
      >
        <TouchableOpacity onPress={() => setShowModalFilter(true)} className="bg-white p-4 border-b border-gray-200" style={styles.search}>
          <View className="flex-row items-center bg-gray-100 rounded-full px-2 py-2 pr-5">
            <TouchableOpacity
              className="flex-1 ml-2 text-base"
              onPress={() => setShowModalFilter(true)}
            >
              <Text className="text-[#9CA3AF]">Buscar donantes o receptores según ...</Text>
            </TouchableOpacity> 
            <FontAwesome5 name="sliders-h" size={24} color="black" />
          </View>
        </TouchableOpacity>
        <ScrollView 
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex-1 items-center justify-center">
            {users[currentIndex] && (
              <Card user={users[currentIndex][0]} pan={pan} panResponders={panResponders} />
            )}
            <View className="flex-row justify-between w-full mt-8 mb-4 px-2">
              <TouchableOpacity
                className="bg-red-500 w-16 h-16 rounded-full items-center justify-center"
                onPress={handleReject}
              >
                <X stroke="white" width={32} height={32} />
              </TouchableOpacity>
              <TouchableOpacity
                className="bg-green-500 w-16 h-16 rounded-full items-center justify-center"
                onPress={handleMatch}
              >
                <Heart stroke="white" fill="white" width={32} height={32} />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        {showModalFilter && <ModalFilters onClose={() => setShowModalFilter(false)}/>}
      </KeyboardAvoidingView>












      
    );
  }
}

const styles = StyleSheet.create({
  search: {
    marginTop: Constants.statusBarHeight
  }
});

export default Home;
