import React, { useRef } from 'react';
import { StyleSheet, View, Text, Dimensions, ImageBackground, Image } from 'react-native';
import { TaskInterface } from '../screens/Home';
import { PanGestureHandler, PanGestureHandlerGestureEvent, PanGestureHandlerProps, ScrollView } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const imagenes = ['https://yt3.googleusercontent.com/w9msOVoNGGNOwFsOu-8xm9f2-DNTXjyNzJSm7pvD-8GcwSsZrQ4MwkEemRBnZWcNDlPJAwBZ=s900-c-k-c0x00ffffff-no-rj',
  'https://media.licdn.com/dms/image/C5603AQGDilRvOoaLPg/profile-displayphoto-shrink_800_800/0/1659575026205?e=2147483647&v=beta&t=QfnL7dHehrGzlsfTxbnmwID_uyHMZafZeH03qe31ZV0',
  'https://upload.wikimedia.org/wikipedia/commons/3/35/RGRV1.jpg',
  'https://portal-jalisco.s3.amazonaws.com/jalisco/original_images/gobernador_enrique_alfaro.jpg',
];

interface ListItemProps extends Pick<PanGestureHandlerProps, 'simultaneousHandlers'> {
  task: TaskInterface;
  onDimiss?: (task: TaskInterface) => void;
}
const LIST_ITEM_HEIGHT = height * .60;
const LIST_ICON_HEIGHT = height * .45;
const TEXT_DESCRIPTION = 18;
const LIST_ITEM_W = 70;
const { width: SCREEN_WIDTH } = Dimensions.get('window')
const TRANSLATE_X_THRESHOLD = -SCREEN_WIDTH * .1
const TRANSLATE_X_ACCEPT = SCREEN_WIDTH * .1

const ListItem: React.FC<ListItemProps> = ({ task, onDimiss, simultaneousHandlers }) => {
  const translateX = useSharedValue(0);
  const itemHeight = useSharedValue(LIST_ITEM_HEIGHT)
  const marginVertical = useSharedValue(10)
  const opacity = useSharedValue(1)

  const panGesture = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent
  >({
    onActive: (event) => {
      translateX.value = event.translationX;
    },
    onEnd: (event) => {
      const shouldBeDismissed = translateX.value < TRANSLATE_X_THRESHOLD;
      const shouldBeAccepted = translateX.value > TRANSLATE_X_ACCEPT;
      if (shouldBeDismissed) {
        translateX.value = withTiming(-SCREEN_WIDTH);
        itemHeight.value = withTiming(0);
        marginVertical.value = withTiming(0);
        opacity.value = withTiming(0, undefined, (isFinished) => {
          if (isFinished && onDimiss) {
            runOnJS(onDimiss)(task);
          }
        })
      } if (shouldBeAccepted) {
        translateX.value = withTiming(SCREEN_WIDTH);
        itemHeight.value = withTiming(0);
        marginVertical.value = withTiming(0);
        opacity.value = withTiming(0, undefined, (isFinished) => {
          if (isFinished && onDimiss) {
            runOnJS(onDimiss)(task);
          }
        })
      }
      else {
        translateX.value = withTiming(0);
      }
    },
  });

  const rStyle = useAnimatedStyle(() => ({
    transform: [{
      translateX: translateX.value,
    },
    ],
  }));

  const rIconContainerStyle = useAnimatedStyle(() => {
    const opacity = withTiming(translateX.value < TRANSLATE_X_THRESHOLD ? 1 : 0);
    return { opacity };
  })

  const lIconContainerStyle = useAnimatedStyle(() => {
    const opacity = withTiming(translateX.value > TRANSLATE_X_ACCEPT ? 1 : 0);
    return { opacity };
  })

  const rTaskContainerStyle = useAnimatedStyle(() => {
    return {
      height: itemHeight.value,
      marginVertical: marginVertical.value,
      opacity: opacity.value,
    };
  })

  const scrollRef = useRef(null);
  return (
    <Animated.View style={[styles.taskcontainer, rTaskContainerStyle]}>
      <Animated.View style={[width >= 800 ? styles.task : styles.tasksmall]}>

      </Animated.View>
      <Animated.View style={[width >= 800 ? styles.iconContainerL : styles.iconContainerLsmall, lIconContainerStyle]}>
        <Image source={require('../images/donate.png')} />
      </Animated.View>
      <Animated.View style={[width >= 800 ? styles.iconContainerR : styles.iconContainerRsmall, rIconContainerStyle]}>
        <Image source={require('../images/next.png')} />
      </Animated.View>

      <PanGestureHandler simultaneousHandlers={simultaneousHandlers} onGestureEvent={panGesture}>
        <Animated.View style={[width >= 800 ? styles.textContainer : styles.textContainersmall, rStyle]}>
          <ImageBackground source={{ uri: imagenes[2] }} style={styles.image} imageStyle={{ borderRadius: 30 }}></ImageBackground>
          
          <View style={[styles.userInfoContainerSmall, width >= 800 ? styles.userInfoContainer : null]}>
            <Text style={[width >= 800 ? styles.tasktitle : styles.tasktitlesmall]}>{task.user}</Text>
            <View style={width >= 800 ? styles.bloodTypeContainer : styles.bloodTypeContainerSmall}>
              <Text style={[{ color: 'white', textAlign: 'center' }, width >= 800 ? styles.bloodTypeText : styles.bloodTypeTextSmall]}>{task.sangre}</Text>
            </View>
          </View>

          <Animated.View>
            <Text style={[width >= 800 ? styles.tasktext : styles.tasktextsmall]}>Municipio: {task.municipio}</Text>
            <Text style={[width >= 800 ? styles.tasktext : styles.tasktextsmall]}>Descripción:</Text>
            <ScrollView ref={scrollRef} style={styles.ScrollView}>
              <Text style={[width >= 800 ? styles.taskdescp : styles.taskdescpsmall]}>{task.descripcion} </Text>
            </ScrollView>
          </Animated.View>

        </Animated.View>
      </PanGestureHandler>

    </Animated.View>
  );
};

const styles = StyleSheet.create({
  // Estilo para el contenedor principal del ítem de la lista
  taskcontainer: {
    width: '100%', // Afecta al ancho del contenedor
    height: LIST_ITEM_HEIGHT, // Afecta a la altura del contenedor
    alignItems: 'center', // Alinea los elementos hijos horizontalmente
  },
  
  // Estilo para el contenedor del texto y la imagen
  textContainer: {
    flex: 1,
    width: '85%', // Ancho del contenedor de texto
    marginBottom: '80%', // Margen inferior del contenedor de texto
    height: '120%', // Altura del contenedor de texto
    position: 'absolute',
    backgroundColor: 'white',
    flexDirection: 'column',
    borderRadius: 50, // Radio del borde del contenedor de texto
    padding: 30, // Espaciado interno del contenedor de texto
    elevation: 10,
    shadowColor: '#171717',
  },
  textContainersmall: {
    width: '85%',
    marginTop: Dimensions.get("window").height * -0,
    height: '125%',
    position: 'absolute',
    backgroundColor: 'white',
    flexDirection: 'column',
    borderRadius: 40, // Radio del borde del contenedor de texto en dispositivos pequeños
    padding: 20, // Espaciado interno del contenedor de texto en dispositivos pequeños
    elevation: 20,
    shadowColor: '#171717',
  },

  // Estilo para el título del ítem de la lista
  tasktitlesmall: {
    fontSize: height * 0.05, // Tamaño de fuente del título en dispositivos pequeños
    fontFamily: 'Quicksand-Bold',
    marginTop: '5%', // Margen superior del título en dispositivos pequeños
    marginBottom: '5%', // Margen inferior del título en dispositivos pequeños
  },
  tasktitle: {
    fontSize: height * 0.05, // Tamaño de fuente del título en dispositivos grandes
    fontFamily: 'Quicksand-Bold',
    marginBottom: '-5%', // Margen inferior del título en dispositivos grandes
  },

  // Estilo para el texto del ítem de la lista
  tasktextsmall: {
    fontSize: height * 0.02, // Tamaño de fuente del texto en dispositivos pequeños
    fontFamily: 'Quicksand-Bold',
    marginBottom: '4%',
    
  },
  tasktext: {
    fontSize: height * 0.02, // Tamaño de fuente del texto en dispositivos grandes
    fontFamily: 'Quicksand-Bold',
    marginBottom: '4%',
    
  },

  // Estilo para el contenedor de la imagen de fondo
  image: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: '50%', // Relleno dentro del contenedor de imagen de fondo
    alignItems: 'center',
    
  },

  // Estilo para los contenedores de iconos de acciones
  iconContainerR: {
    height: LIST_ICON_HEIGHT,
    width: LIST_ICON_HEIGHT,
    position: 'absolute',
    left: '49%', // Posición izquierda del contenedor de icono de acción derecho
    justifyContent: 'center',
    alignItems: 'center',
    top: '30%', // Posición superior del contenedor de icono de acción derecho
  },
  iconContainerL: {
    height: LIST_ICON_HEIGHT,
    width: LIST_ICON_HEIGHT,
    position: 'absolute',
    right: '49%', // Posición derecha del contenedor de icono de acción izquierdo
    justifyContent: 'center',
    alignItems: 'center',
    top: '30%', // Posición superior del contenedor de icono de acción izquierdo
  },
  iconContainerRsmall: {
    height: LIST_ICON_HEIGHT,
    width: LIST_ICON_HEIGHT,
    position: 'absolute',
    left: width * .37, // Posición izquierda del contenedor de icono de acción derecho en dispositivos pequeños
    justifyContent: 'center',
    alignItems: 'center',
    top: '30%', // Posición superior del contenedor de icono de acción derecho en dispositivos pequeños
  },
  iconContainerLsmall: {
    height: LIST_ICON_HEIGHT,
    width: LIST_ICON_HEIGHT,
    position: 'absolute',
    right: width * .37, // Posición derecha del contenedor de icono de acción izquierdo en dispositivos pequeños
    justifyContent: 'center',
    alignItems: 'center',
    top: '30%', // Posición superior del contenedor de icono de acción izquierdo en dispositivos pequeños
  },

  // Estilo para el contenedor del tipo de sangre en dispositivos grandes
  bloodTypeContainer: {
    backgroundColor: 'red', // Color de fondo del contenedor del tipo de sangre
    marginRight:'2%', // Margen derecho del contenedor del tipo de sangre
    marginTop: '5%', // Margen superior del contenedor del tipo de sangre
    borderRadius: 50, // Radio del borde del contenedor del tipo de sangre
    paddingHorizontal: 10, // Espaciado horizontal dentro del contenedor del tipo de sangre
    width: width * 0.16, // Ancho del contenedor del tipo de sangre en dispositivos grandes
    height: height * 0.07, // Altura del contenedor del tipo de sangre en dispositivos grandes
  },

  // Estilo para el contenedor del tipo de sangre en dispositivos pequeños
  bloodTypeContainerSmall: {
    backgroundColor: 'red', // Color de fondo del contenedor del tipo de sangre
    borderRadius: 50, // Radio del borde del contenedor del tipo de sangre en dispositivos pequeños
    paddingHorizontal: 10, // Espaciado horizontal dentro del contenedor del tipo de sangre en dispositivos pequeños
    marginLeft: '11%', // Margen izquierdo del contenedor del tipo de sangre en dispositivos pequeños
    width: width * 0.2, // Ancho del contenedor del tipo de sangre en dispositivos pequeños
    height: height * 0.07, // Altura del contenedor del tipo de sangre en dispositivos pequeños
    marginTop: '5%', // Margen superior del contenedor del tipo de sangre en dispositivos pequeños
  },

  // Estilo para el texto dentro del contenedor del tipo de sangre en dispositivos grandes
  bloodTypeText: {
    fontSize: height * 0.05, // Tamaño de fuente del texto del tipo de sangre en dispositivos grandes
    fontFamily: 'Quicksand-Bold',
    height: height * 0.08, // Altura del texto del tipo de sangre en dispositivos grandes
  },

  // Estilo para el texto dentro del contenedor del tipo de sangre en dispositivos pequeños
  bloodTypeTextSmall: {
    fontSize: height * 0.05, // Tamaño de fuente del texto del tipo de sangre en dispositivos pequeños
    fontFamily: 'Quicksand-Bold',
  },

  // Estilo para el contenedor de la información del usuario en dispositivos pequeños
  userInfoContainerSmall: {
    flexDirection: 'row', // Dirección de los elementos hijos en el contenedor de información del usuario en dispositivos pequeños
    alignItems: 'center', // Alineación de los elementos hijos verticalmente en el contenedor de información del usuario en dispositivos pequeños
    
  },

  // Estilo para el contenedor de la información del usuario en dispositivos grandes
  userInfoContainer: {
    justifyContent: 'space-between', // Distribución de espacio entre los elementos hijos en el contenedor de información del usuario en dispositivos grandes
    width: '100%', // Ancho del contenedor de información del usuario en dispositivos grandes
  },
  taskdescpsmall:{
    marginBottom: '15%',
    fontSize: height*0.02,
  },
  taskdescp:{
    marginBottom: '15%',
    fontSize: height*0.014,
  },
});

export default ListItem;