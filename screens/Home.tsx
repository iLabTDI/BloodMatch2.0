import React, {useState, useContext, useCallback, useRef} from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, Image, FlatList, Dimensions, SafeAreaView, Animated, Appearance } from 'react-native';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { LinearGradient } from "expo-linear-gradient";
import themeContext from "../helper/ThemeCon";
import ListItem from "../components/ListItem";
import {
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import { Item } from "react-native-paper/lib/typescript/components/Drawer/Drawer";


//Parte de lola
const imagenes = ['https://yt3.googleusercontent.com/w9msOVoNGGNOwFsOu-8xm9f2-DNTXjyNzJSm7pvD-8GcwSsZrQ4MwkEemRBnZWcNDlPJAwBZ=s900-c-k-c0x00ffffff-no-rj',
'https://media.licdn.com/dms/image/C5603AQGDilRvOoaLPg/profile-displayphoto-shrink_800_800/0/1659575026205?e=2147483647&v=beta&t=QfnL7dHehrGzlsfTxbnmwID_uyHMZafZeH03qe31ZV0',
'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg',
'https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072821_1280.jpg', ];

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
//tere
const ANCHO_CONTENEDOR = width * 0.7;
const ESPACIO_LATERAL = (width - ANCHO_CONTENEDOR) / 2;
const ESPACIO = 10;
const ALTURA_BACKDROP = height * 0.5;


const TITLES = [
  {'user':'Juan', 'tipo':'O+', 'municipio':'Guadalajara', 'descripcion':'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'}
];

interface TaskInterface {
  user: string;
  tipo: string;
  municipio: string;
  descripcion: string;
  index: number;
}

const TASKS: TaskInterface[] = TITLES.map(({user, tipo, municipio, descripcion}, index) => ({user, tipo, municipio, descripcion, index}));

 
{/*
function BackDrop({ scrollX }){
  return(
    <View style = { ([{ height: ALTURA_BACKDROP, width, position: "absolute", 
      top: 0 }], StyleSheet.absoluteFillObject) }>
      
      {imagenes.map((imagen, index) => {

        const inputRange = [
          (index - 1) * ANCHO_CONTENEDOR,
          index * ANCHO_CONTENEDOR,
          (index + 1) * ANCHO_CONTENEDOR,
        ];

        const outputRange = [0, 1, 0];

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange,
        });

        return(
          <Animated.Image 
            source = {{ uri: imagen }} 
            key = { index } 
            blurRadius={10}
            style = {[{ height: ALTURA_BACKDROP, 
              width, position: "absolute", 
              top: 0, opacity }, ]}
          />
        );
      })}

      <LinearGradient
        colors = { ["transparent", "white" ]}
        style = {{ height: ALTURA_BACKDROP, width, position: "absolute", top: 0 }}
      />

    </View>
  );
}
 */}
function Home () {
  const [tasks, setTasks] = useState(TASKS);
  const onDismiss = useCallback((task: TaskInterface) => {
    setTasks((tasks) => tasks.filter((item) => item.index !== task.index))
  },[])
  {/*const [theme, setTheme] = useState(Appearance.getColorScheme())
  Appearance.addChangeListener((Scheme)=>{
    console.log(Scheme.colorScheme)
  })*/}
  
  // Usar context para la modificacion del dark mode y poder intercambiar entre estos JJ
  const teme = useContext(themeContext)
  const scrollRef = useRef(null)
  return (
    <LinearGradient
          colors={['white', teme.background]}
          style={styles.container}
        >
      {/*<View style = {[styles.container, , {backgroundColor: teme.background}]}>*/}
        <StatusBar style="auto" />
        <Text style={styles.title}>Ayuda a: </Text>
        <Animated.View style={styles.Scrollcont}>
          {tasks.map((task) => 
          (<ListItem  key={task.index} task={task} onDimiss={onDismiss}/>))}
        </Animated.View>
      {/*</View>*/}
      </LinearGradient>
  );
  {/*
  ref={scrollRef} style={styles.Scrollcont}
  simultaneousHandlers={scrollRef}
  const scrollX = React.useRef(new Animated.Value(0)).current;
    return (
        <SafeAreaView style={[styles.container, {backgroundColor: teme.background}]}>
          <BackDrop scrollX={ scrollX } />
          {/* CARRUSEL PARA MOSTRAR LAS IMAGENES */}{/*
          <Animated.FlatList 
            onScroll={Animated.event(
              [{ nativeEvent: {contentOffset: { x: scrollX }}}],
              {useNativeDriver: true}
            )}
            data={imagenes}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingTop: 200, paddingHorizontal: ESPACIO_LATERAL}}
            decelerationRate={0}
            snapToInterval={ANCHO_CONTENEDOR}
            scrollEventThrottle={16}
            keyExtractor={(item) => item}
            renderItem={({ item, index }) => {
              const inputRange = [
                (index - 1) * ANCHO_CONTENEDOR,
                index * ANCHO_CONTENEDOR,
                (index + 1) * ANCHO_CONTENEDOR,
              ];

              const outputRange = [0, -50, 0];

              const translateY = scrollX.interpolate({
                inputRange,
                outputRange,
              });

              return (
                <View style= {{width: ANCHO_CONTENEDOR}}>
                  <Animated.View style={{
                    marginHorizontal: ESPACIO,
                    padding: ESPACIO,
                    borderRadius: 34,
                    backgroundColor: '#fff',
                    alignItems: 'center',
                    transform: [{ translateY }]
                  }}>
                    <Image source={{uri:item}} style={styles.posterImage}/>
                    <Text>Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor desconocido.</Text>
                  </Animated.View>
              </View>)
            }}
          />*/}
          {/*Agregar/ modificar los pushes(direcciones) a otras pantallas y modificacion de vista ligera JJ y teres*/}
          {/*<View style={styles.buttonBlood}>
            <TouchableOpacity style={{paddingRight: 30}} onPress={() => navigation.push('Home')} >
              <MaterialCommunityIcons name="water-off" color={'#ab0d0f'} size={80} /> 
            </TouchableOpacity> 

            <TouchableOpacity style={{paddingRight: 30}} onPress={() => navigation.push('Messenger')}>
              <MaterialCommunityIcons name= "message-question-outline" color={'#ab0d0f'} size={80}/>
            </TouchableOpacity>
            
            <TouchableOpacity  onPress={() => navigation.push('Login')} > 
              <MaterialCommunityIcons name="water-check" color={'#ab0d0f'} size={80} />
            </TouchableOpacity> 
          </View>
        </SafeAreaView>
      );*/}

}

export default ({ navigation }) => {
  return (
    
      <Home />
  );
};

//Cuando cambiemos a un json colocar en el uri:item.imageURL de la imagen
//Cuando cambiemos a un json colocar en el uri:item.imageURL de la imagen
const styles = StyleSheet.create({
    container: {
      flex:1,
      backgroundColor: '#a3a3ff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    posterImage:{
      width: '100%',
      height: ANCHO_CONTENEDOR * 1.2,
      resizeMode: "cover",
      borderRadius: 24,
      margin: 0,
      marginBottom: 10,
    },
    buttonBlood: {
      marginBottom:'18%',
      flexDirection: "row",
      alignSelf: 'center', 
    },
    title: {
      fontSize:60,
      marginVertical: 20,
      paddingLeft:'3%',
      fontFamily: 'Quicksand-Bold',
    },
    Scrollcont:{
      flex:1,
      width: '100%',
      height: '100%',
    }
});

export { TaskInterface };
