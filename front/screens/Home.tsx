import React, { useState, useEffect, useCallback, useRef } from "react";
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
  TouchableOpacity,
  ScrollView,
  BackHandler,
  findNodeHandle
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { styled } from 'nativewind';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Filter, Heart, Loader, X} from 'react-native-feather';
import Constants from 'expo-constants';
import { socket } from "../util/connectionChat";
import { getGlobalData, setGlobalData, getAllGlobalData } from "../backend/querys/inserts/New_email";
import { generaldates, updateTutorialValue, rejectUser, getDates } from "../lib/querys";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Tutorial from "../components/Tutorial";
import ModalFilters from '../components/ModalFilters'
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import Toast from "react-native-toast-message";
import CustomNotification from "../components/customNotification";
import AntDesign from "@expo/vector-icons/AntDesign";
import RedLoader from "../components/RedLoader";
import ModalUserProfile from "../components/ModalUserProfile";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { setExpoTokenNotification } from "../lib/querys";

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

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

function Home() {
  const [user, setUser] = useState(null);
  const [newGroup, setNewGroup] = useState("");
  const [allChatGroups, setAllChatRooms] = useState([]);

  const [showTutorial, setShowTutorial] = useState(false);

  const [users, setUsers] = useState([]);
  const [usersCopy, setUsersCopy] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [isLoading, setIsLoading] = useState(false);

  const [showModalFilter, setShowModalFilter] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({ category: "", value: "" });

  const [isProfileModalVisible, setIsProfileModalVisible] = useState(false)
  const pan = useState(new Animated.ValueXY())[0];

  const navigation = useNavigation();
  const { t } = useTranslation();

  const [expoPushToken, setExpoPushToken] = useState(null);

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });

  async function registerForPushNotifications() {
    if (!Device.isDevice) {
      Alert.alert("Error", "Las notificaciones solo funcionan en dispositivos físicos.");
      return;
    }

    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permiso denegado", "Habilita las notificaciones en la configuración.");
      return;
    }

    // Obtener token de Expo
    const token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log("Expo Push Token:", token);
    setExpoPushToken(token);

    // Guardar token en la base de datos
    const email = getGlobalData("email");
    await setExpoTokenNotification(email, token);
  }

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        Alert.alert(
          t("exit_app"),
          t("exit_app_confirm"),
          [
            { text: t("cancel"), style: "cancel" },
            { text: t("exit"), onPress: () => BackHandler.exitApp() }
          ]
        );
        return true; 
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () => {
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
      };
    }, [])
  );

  useEffect(() => {
    async function getTutorialValue(){
      let value = await AsyncStorage.getItem("tutorial");
      if(value){
        setShowTutorial(false);
      }else{
        setShowTutorial(true);
      }
      // await AsyncStorage.setItem("currentPage", newPage.toString());
    }

    async function fetchUserData() {
      // const tutorialValue = await getTutorialValue(getGlobalData("email"));
      const currentUser = await getDates(getGlobalData("email"));
      setGlobalData("state", currentUser.State);
      setGlobalData("city", currentUser.City);
      // if (tutorialValue) {
      //   setShowTutorial(false);
      // } else {
      //   setShowTutorial(true);
      // }
    }

    async function fetchData() {
      const result = await getDatabase();
      // setTasks(result);
      setUsers(result);
      setUsersCopy(result);
    }

    getTutorialValue();
    fetchUserData();
    fetchData();
    registerForPushNotifications();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      tabBarStyle: showTutorial ? { height: 0 } : { height: 60 }
    });
  }, [showTutorial]);

  useEffect(() => {
    socket.emit("getAllGroups");

    user?.socket.on("groupList", (groups) => {
      setAllChatRooms(groups);
    });
  }, [socket]);

  

  const handleCreateNewRoom = (user) => {
    try {
      //i get the global user
      const email = getGlobalData("email");
      console.log("lo que imprimo es=", email, "y", user);
      setNewGroup(email);

      socket.emit("createNewGroup", {
        currentGroupName: email,
        currentSecondGroup: user,
      });
      Keyboard.dismiss();
    } catch (error) {
      console.error("Error creating new group:", error);
    }
  };

  const getDatabase = async () => {
    setIsLoading(true);
    try {
      const data = await generaldates();
      const list = [];
      let i = 0;
      const show = data.length;
      console.log("la longitud de la lista es", show);
      const datos = data.map((user) => ({
        id: user.IdUser,
        blood_type: user.Blood_Type,
        city: user.City,
        situation: user.Status,
        role: user.Role,
        state: user.State,
        name: user.FirstName,
        email: user.Email,
        gender: user.Gender
      }));
      console.log("los datos son", datos);
      while (i <= show - 1) {
        console.log(i);
        let dat = getGlobalData("email");
        console.log("el usuario es=", dat);
        console.log("data", data[i].Email);
        if (dat === data[i].Email) {
          console.log("hola");
          i++;
        } else {
          const dates = [
            {
              id: data[i].IdUser,
              blood_type: data[i].Blood_Type,
              city: data[i].City,
              Status: data[i].Status,
              image: data[i].Url,
              role: data[i].Role,
              state: data[i].State,
              name: data[i].FirstName,
              email: data[i].Email,
              gender: data[i].Gender
            },
          ];

          i++;
          list.push(dates);
        }
      }
      setIsLoading(false);
      // return list;

      const rejectedUsers: number[] = JSON.parse((await AsyncStorage.getItem("rejectedUsers")) || "[]");
      return list.filter(user => !rejectedUsers.includes(user[0].id));

    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const swipeRight = (cardIndex) => {
    console.log("Deslizamiento hacia la derecha detectado", cardIndex);
    let matchedCard = users[cardIndex][0]; // aqui tengo la lista de listas para agarrar al usuario
    const card = matchedCard.email;
    console.log("loque agarra de la carta es", card);
    handleCreateNewRoom(card);

    Toast.show({
      type: "my_custom_toast",
      text1: t("made_a_match"),
      text2: t("chat_created"),
      position: "bottom",
      props: {
        iconClose: <AntDesign name="close" size={24} color="white" />,
        iconHeart: <AntDesign name="heart" size={24} color="red" />,
      },
    });
  };

  const swipeLeft = () => {
    console.log("Deslizamiento hacia la izquierda detectado");
  
    Animated.spring(pan, {
      toValue: { x: -SCREEN_WIDTH - 100, y: 0 },
      useNativeDriver: false,
    }).start(() => {
      pan.setValue({ x: 0, y: 0 });
    });
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

  const Card = ({ user, pan, panResponders }) => {
    if (!user) {
      // return null;
      return (<View className="p-4">
        <Text className="text-xl font-bold">{t("no_results")}</Text>
      </View>)
    }
  
    return (
      <>
      <AnimatedView
        className="absolute w-[300px] h-[400px] bg-white rounded-xl shadow-lg"
        style={{
          transform: [{ translateX: pan.x }, { translateY: pan.y }],
        }}
        {...panResponders.panHandlers}
      >
        <Image source={{ uri: user.image }} className="w-full h-3/4 rounded-t-xl" />
        <View className="p-4">
          <Text className="text-xl font-bold">{user.name}</Text>
          <Text className="text-lg font-semibold text-red-500">{user.blood_type}</Text>
          <Text className="text-sm text-gray-600">{user.city}, {user.state}</Text>
          <View className="mt-2 bg-green-500 rounded-full px-3 py-1 self-start">
            <Text className="text-white font-semibold">{user.role === 'donor' ? t("donor") : t("recipient")}</Text>
          </View>
        </View>
      </AnimatedView>
      </>
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
        console.log(`Match con ${users[currentIndex][0].email}`);
        swipeRight(currentIndex);
      } else if (gesture.dx < -120) {
        Animated.spring(pan, {
          toValue: { x: -SCREEN_WIDTH - 100, y: gesture.dy },
          useNativeDriver: false,
        }).start(() => {
          setCurrentIndex(currentIndex + 1);
          pan.setValue({ x: 0, y: 0 });
        });
        console.log(`Reject  ${users[currentIndex][0].email}`);
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
    console.log(`Match con ${users[currentIndex][0].email}`);
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
    console.log(`Reject  ${users[currentIndex][0].email}`);
    console.log(`Reject ID: ${users[currentIndex][0].id}`);
    rejectUser(users[currentIndex][0].id);
    swipeLeft();
  };

  const onClose = () => {
    async function updateTutorial() {
      // const result = await updateTutorialValue(getGlobalData("email"));
      // console.log("Checando result: ", result);
      await AsyncStorage.setItem("tutorial", "true");
    }
    updateTutorial();
    setShowTutorial(false);
    console.log("onClose", showTutorial);
  };

  const handleApplyFilters = (category: string, value: string) => {
    if (!category || !value) {
      console.log("SIN FILTROS APLICADOS");
      setUsers(usersCopy);
    } else if(category === "my_municipality" || value === "my_municipality"){
      const city = getGlobalData("city");
      const filteredUsers = usersCopy.filter(user => user[0]["city"] === city);
      setSelectedFilters({ category, value });
      setUsers(filteredUsers);
    } else if(category === "my_state" || value === "my_state"){
      const state = getGlobalData("state");
      const filteredUsers = usersCopy.filter(user => user[0]["state"] === state);
      setSelectedFilters({ category, value });
      setUsers(filteredUsers);
    } else {
      const filteredUsers = usersCopy.filter(user => user[0][category] === value);
      setSelectedFilters({ category, value });
      setUsers(filteredUsers);
      console.log("Filtros aplicados:", category, value);
    }
  };

  if (showTutorial) {
    return <Tutorial onClose={onClose} />;
  } else {
    return (
      <SafeAreaView
        // behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 bg-gray-100"
      >
        <StatusBar backgroundColor={"#fff"} style="dark"/>
        <TouchableOpacity onPress={() => setShowModalFilter(true)} className="bg-white p-4 border-b border-gray-200">
          <View className="flex-row items-center bg-gray-100 rounded-full px-2 py-2 pr-5">
            <TouchableOpacity
              className="flex-1 ml-2 text-base"
              onPress={() => setShowModalFilter(true)}
            >
              <Text className="text-[#9CA3AF]">{t("search_by")}</Text>
            </TouchableOpacity> 
            <FontAwesome5 name="sliders-h" size={24} color="black" />
          </View>
        </TouchableOpacity>
        <ScrollView 
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex-1 items-center justify-center">
            {isLoading ? <RedLoader/> : 
            (users[currentIndex] 
              ? (
                <>
                <Card user={users[currentIndex][0]} pan={pan} panResponders={panResponders} />
                <ModalUserProfile
                  isVisible={isProfileModalVisible}
                  onClose={() => setIsProfileModalVisible(false)}
                  userData={users[currentIndex][0]}
                />
                <CustomNotification />
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
                <TouchableOpacity 
                  className="bg-green-800 rounded-full py-3 px-3 self-end mr-2"
                  onPress={() => setIsProfileModalVisible(true)}
                >
                  <Text className="text-white font-semibold">{t("view_profile")}</Text>
                </TouchableOpacity>
                </>
                )
              : <Card user={null} pan={pan} panResponders={panResponders} />)
            }
          </View>
        </ScrollView>
        <ModalFilters 
          onClose={() => setShowModalFilter(false)}
          isVisible={showModalFilter}
          onApplyFilters={handleApplyFilters}
        />
      </SafeAreaView>      
    );
  }
}

const styles = StyleSheet.create({
  search: {
    marginTop: Constants.statusBarHeight
  }
});

export default Home;
