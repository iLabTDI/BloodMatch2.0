import 'react-native-url-polyfill/auto';
import React, { useState, useContext, useRef } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from '@react-navigation/native';
import themeContext from "../helper/ThemeCon";
import DeckSwiper from 'react-native-deck-swiper';
import { AntDesign } from '@expo/vector-icons';
import Chat from "./Chat.jsx";

const TITLES = [
  {
    'id': '4',
    'user': 'Alejandra',
    'sangre': 'AB-',
    'municipio': 'Tonala, Jalisco',
    'descripcion': 'Me encuentro en una situación desesperada. Mi nombre es Alejandra y estoy embarazada, pero algo ha salido mal. Hay una hemorragia y mi vida, junto con la de mi bebé, está en peligro inminente. Necesito sangre, necesito ayuda. ',
    'image':'https://www.tork.mx/media/f3cjxo4z/500x500.png'
  },
  {
    'id': '3',
    'user': 'Marco',
    'sangre': 'O-',
    'municipio': 'Guadalajara, Jalisco',
    'descripcion': 'Mi nombre es Marco y he sufrido un grave accidente automovilístico. Los médicos dicen que necesito una cirugía de emergencia para sobrevivir. Por favor, si puedes donar sangre . Mi vida depende de ello y de tu generosidad. Ayúdame a volver a abrazar a mi familia y a seguir adelante. Te lo ruego, ven y sé mi esperanza en esta oscuridad.',
    'image':  'https://www.gaceta.udg.mx/wp-content/uploads/2022/05/tp.cucei_ilg-scaled.jpg'
  },
  {
    'id': '2',
    'user': 'Ricardo',
    'sangre': 'B+',
    'municipio': 'Guadalajara, Jalisco',
    'descripcion': 'Soy Ricardo y estoy luchando contra el cáncer. Necesito donaciones de sangre para mi tratamiento recurrente. Si puedes donar sangre. Tu generosidad podría salvar mi vida. Te lo ruego, ven y dona sangre para ayudarme en esta batalla contra el cáncer.',
    'image':'https://upload.wikimedia.org/wikipedia/commons/3/35/RGRV1.jpg',
  },
  {
    'id': '1',
    'user': 'Arturo',
    'sangre': 'AB-',
    'municipio': 'Zapopan, Jalisco',
    'descripcion': 'Soy Arturo y tengo una cirugía programada para el 25 de abril de 2024. Necesito donaciones de sangre para prepararme para este procedimiento. Si puedes donar sangre, tu generosidad marcará la diferencia en mi recuperación. Te lo ruego, dona sangre para ayudarme a enfrentar esta cirugía con esperanza y fortaleza.',
    'image': 'https://emprendedor.com/wp-content/uploads/2022/10/Arturo-Elias-Ayub.jpg',
  }, 
];

interface TaskInterface {
  user: string;
  sangre: string;
  municipio: string;
  descripcion: string;
  index?: number; // make index optional
  image: string;
}

const TASKS: TaskInterface[] = TITLES.map(({ user, sangre, municipio, descripcion, image }, index) => ({ user, sangre, municipio, descripcion, index,image }));

function Home() {
  const theme = useContext(themeContext);
  const navigation = useNavigation();
  const [tasks, setTasks] = useState(TASKS);
  const swiperRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const swipeRight = () => {
    console.log('Deslizamiento hacia la derecha detectado');
    navigation.navigate('Chat');
  };

  const swipeLeft = () => {
    console.log('Deslizamiento hacia la izquierda detectado');
    setCurrentIndex(prevIndex => prevIndex + 1); // Pasar a la siguiente tarjeta
  };

  const renderCard = (task: TaskInterface) => (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        <Image source={{ uri: task.image }} style={styles.image} />
        <Text style={styles.text}>{task.user}</Text>
        <Text style={styles.text}>{task.sangre}</Text>
        <Text style={styles.text}>{task.municipio}</Text>
        <Text style={styles.text}>{task.descripcion}</Text>
      </View>
    </View>
  );

  return (
    <LinearGradient
      colors={[ 'white', theme.background]}
      style={styles.container}
    >
      <StatusBar style="auto" />
      <Text style={styles.title}>Ayuda a: </Text>
      <DeckSwiper
        ref={swiperRef}
        cards={tasks}
        renderCard={renderCard}
        onSwipedRight={swipeRight}
        onSwipedLeft={swipeLeft}
        backgroundColor="transparent"
        stackSize={2}
        stackSeparation={15}
        animateOverlayLabelsOpacity
        animateCardOpacity
        disableBottomSwipe
        disableTopSwipe
      />

    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  card: {
    width: '90%', // Reducir el ancho de la tarjeta
    height: '80%', // Reducir la altura de la tarjeta
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'black',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: '80%', // Reducir el tamaño de la imagen
    height: '40%', // Reducir la altura de la imagen
    marginBottom: 10,
    resizeMode: 'cover',
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default Home;
