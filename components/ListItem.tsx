import React, { useRef, useEffect, useState } from 'react';
import { StyleSheet, View, Text, Dimensions, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { TaskInterface } from '../screens/Home';
import { PanGestureHandler, PanGestureHandlerGestureEvent, PanGestureHandlerProps, ScrollView, Directions } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';

const imagenes = [
  'https://yt3.googleusercontent.com/w9msOVoNGGNOwFsOu-8xm9f2-DNTXjyNzJSm7pvD-8GcwSsZrQ4MwkEemRBnZWcNDlPJAwBZ=s900-c-k-c0x00ffffff-no-rj',
  'https://media.licdn.com/dms/image/C5603AQGDilRvOoaLPg/profile-displayphoto-shrink_800_800/0/1659575026205?e=2147483647&v=beta&t=QfnL7dHehrGzlsfTxbnmwID_uyHMZafZeH03qe31ZV0',
  'https://upload.wikimedia.org/wikipedia/commons/3/35/RGRV1.jpg',
  'https://portal-jalisco.s3.amazonaws.com/jalisco/original_images/gobernador_enrique_alfaro.jpg',
];

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

interface ListItemProps extends Pick<PanGestureHandlerProps, 'simultaneousHandlers'> {
  task: TaskInterface;
  onDimiss?: (task: TaskInterface) => void;
  moveToNextUser?: () => void;
}

const ListItem: React.FC<ListItemProps> = ({ task, onDimiss, simultaneousHandlers, moveToNextUser }) => {
  const navigation = useNavigation();
  const translateX = useSharedValue(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const imageUrl = task.image;
  const itemHeight = useSharedValue(height * .60);
  const marginVertical = useSharedValue(10);
  const opacity = useSharedValue(1);
 
  

  const changeIndex = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % imagenes.length);
  };

  const panGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onActive: (event) => {
      translateX.value = event.translationX;
    },
    onEnd: (event) => {
      const shouldBeDismissed = translateX.value < -width * .1;
      const shouldBeAccepted = translateX.value > width * .1;

      if (shouldBeDismissed) {
        translateX.value = withTiming(-width);
        itemHeight.value = withTiming(0);
        marginVertical.value = withTiming(0);
        opacity.value = withTiming(0, undefined, (isFinished) => {
          if (isFinished && onDimiss) {
            runOnJS(onDimiss)(task);}
           
        });
      } else if (shouldBeAccepted) {
        translateX.value = withTiming(width);
        itemHeight.value = withTiming(0);
        marginVertical.value = withTiming(0);
        opacity.value = withTiming(0, undefined, (isFinished) => {
          if (isFinished && onDimiss) {
            runOnJS(onDimiss)(task);
          }
          if (moveToNextUser)
            runOnJS(moveToNextUser)();
          runOnJS(changeIndex)();
          /* navigation.navigate('Chat') */
          
        });
      } else {
        translateX.value = withTiming(0);
      }
    },
  });

  const rStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    position: "absolute",
  }));

  const rIconContainerStyle = useAnimatedStyle(() => {
    const opacity = withTiming(translateX.value < -width * .1 ? 1 : 0);
    return { opacity };
  });

  const lIconContainerStyle = useAnimatedStyle(() => {
    const opacity = withTiming(translateX.value > width * .1 ? 1 : 0);
    return { opacity };
  });

  const rTaskContainerStyle = useAnimatedStyle(() => {
    return {
      height: itemHeight.value,
      marginVertical: marginVertical.value,
      opacity: opacity.value,
    };
  });

  const scrollRef = useRef(null);

  return (
    <Animated.View style={[styles.taskcontainer, rTaskContainerStyle]}>
      <Animated.View style={[width >= 800 ? styles.iconContainerL : styles.iconContainerLsmall, lIconContainerStyle]}>
        <Image source={require('../images/donate.png')} />
      </Animated.View>
      <Animated.View style={[width >= 800 ? styles.iconContainerR : styles.iconContainerRsmall, rIconContainerStyle]}>
        <Image source={require('../images/next.png')} />
      </Animated.View>

      <PanGestureHandler simultaneousHandlers={simultaneousHandlers} onGestureEvent={panGesture}>
        <Animated.View style={[width >= 800 ? styles.textContainer : styles.textContainersmall, rStyle]}>
          <ImageBackground source={{ uri: imageUrl }} style={width >= 800 ? styles.image : styles.imageSmall} imageStyle={{ borderRadius: 30 }} />
          <View style={[styles.userInfoContainerSmall, width >= 800 ? styles.userInfoContainer : null]}>
            <Text style={[width >= 800 ? styles.tasktitle : styles.tasktitlesmall]}>{task.user}</Text>
            <View style={width >= 800 ? styles.bloodTypeContainer : styles.bloodTypeContainerSmall}>
              <Text style={[{ color: 'white', textAlign: 'center' }, width >= 800 ? styles.bloodTypeText : styles.bloodTypeTextSmall]}>{task.sangre}</Text>
            </View>
          </View>
          <View>
            <Text style={[width >= 800 ? styles.tasktext : styles.tasktextsmall]}>Municipio: {task.municipio}</Text>
            <Text style={[width >= 800 ? styles.tasktext : styles.tasktextsmall]}>Descripción:</Text>
            <ScrollView ref={scrollRef} style={styles.ScrollView}>
              <Text style={[width >= 800 ? styles.taskdescp : styles.taskdescpsmall]}>{task.descripcion} </Text>
            </ScrollView>
          </View>
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  taskcontainer: {
    width: '100%',
    height: 'auto',
    alignItems: 'center',
    position: 'absolute'
  },
  textContainer: {
    width: '78%',
    marginTop: Dimensions.get("window").height * 0.05,
    height: '125%',
    position: 'absolute',
    backgroundColor: 'white',
    flexDirection: 'column',
    borderRadius: 40,
    padding: 20,
    elevation: 20,
    shadowColor: '#171717',
  },
  textContainersmall: {
    width: '85%',
    marginTop: Dimensions.get("window").height * -0,
    height: '125%',
    position: 'absolute',
    backgroundColor: 'white',
    flexDirection: 'column',
    borderRadius: 40,
    padding: 20,
    elevation: 20,
    shadowColor: '#171717',
  },
  tasktitlesmall: {
    fontSize: height * 0.05,
    fontFamily: 'Quicksand-Bold',
    marginTop: '5%',
    marginBottom: '5%',
  },
  tasktitle: {
    fontSize: height * 0.05,
    fontFamily: 'Quicksand-Bold',
    marginTop: '-35%',
    marginLeft: '3%',
  },
  tasktextsmall: {
    fontSize: height * 0.02,
    fontFamily: 'Quicksand-Bold',
    marginBottom: '4%',
  },
  tasktext: {
    fontSize: height * 0.02,
    fontFamily: 'Quicksand-Bold',
    marginLeft:'3%',
    marginBottom: '2%',
  },
  imageSmall: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: '50%',
    alignItems: 'center',
  },
  image: {
    height: '77%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  iconContainerR: {
    height: height * 0.45,
    width: height * 0.45,
    position: 'absolute',
    left: '49%',
    justifyContent: 'center',
    alignItems: 'center',
    top: '30%',
  },
  iconContainerL: {
    height: height * 0.45,
    width: height * 0.45,
    position: 'absolute',
    right: '49%',
    justifyContent: 'center',
    alignItems: 'center',
    top: '30%',
  },
  iconContainerRsmall: {
    height: height * 0.45,
    width: height * 0.45,
    position: 'absolute',
    left: width * .37,
    justifyContent: 'center',
    alignItems: 'center',
    top: '20%',
  },
  iconContainerLsmall: {
    height: height * 0.45,
    width: height * 0.45,
    position: 'absolute',
    right: width * .37,
    justifyContent: 'center',
    alignItems: 'center',
    top: '20%',
  },
  bloodTypeContainer: {
    backgroundColor: 'red',
    marginRight: '2%',
    marginTop: '-30%',
    borderRadius: 50,
    paddingHorizontal: 10,
    width: width * 0.25,
    height: height * 0.07,
  },
  bloodTypeContainerSmall: {
    backgroundColor: 'red',
    borderRadius: 50,
    paddingHorizontal: 10,
    marginLeft: 'auto',
    width: width * 0.25,
    height: height * 0.07,
    marginTop: '5%',
  },
  bloodTypeText: {
    fontSize: height * 0.05,
    fontFamily: 'Quicksand-Bold',
    height: height * 0.08,
    verticalAlign: 'middle',
    top: '-15%'
  },
  bloodTypeTextSmall: {
    fontSize: height * 0.05,
    fontFamily: 'Quicksand-Bold',
  },
  userInfoContainerSmall: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userInfoContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  taskdescpsmall: {
    marginBottom: '15%',
    fontSize: height * 0.02,
  },
  taskdescp: {
    marginBottom: '15%',
    fontSize: height * 0.014,
    marginLeft:'3%'
  },
  confirmButton:{
flex: 1,
backgroundColor:'white'
  },
  confirmButtonText:{
    flex:1,
    backgroundColor:'white'
  }
});

export default ListItem;
