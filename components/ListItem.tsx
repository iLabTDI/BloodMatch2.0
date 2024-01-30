import React from 'react'
import { StyleSheet, View, Text, Dimensions, ImageBackground } from 'react-native'
import { TaskInterface } from '../screens/Home';
import { PanGestureHandler, PanGestureHandlerGestureEvent, PanGestureHandlerProps } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedGestureHandler,  useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import {
    FontAwesome5,
    Ionicons,
    Entypo,
    MaterialCommunityIcons,
    Feather, 
  } from "@expo/vector-icons";
import { Icon } from '@rneui/base';
import { red100 } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const imagenes = ['https://yt3.googleusercontent.com/w9msOVoNGGNOwFsOu-8xm9f2-DNTXjyNzJSm7pvD-8GcwSsZrQ4MwkEemRBnZWcNDlPJAwBZ=s900-c-k-c0x00ffffff-no-rj',
'https://media.licdn.com/dms/image/C5603AQGDilRvOoaLPg/profile-displayphoto-shrink_800_800/0/1659575026205?e=2147483647&v=beta&t=QfnL7dHehrGzlsfTxbnmwID_uyHMZafZeH03qe31ZV0',
'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg',
'https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072821_1280.jpg', ];

interface ListItemProps extends Pick<PanGestureHandlerProps, 'simultaneousHandlers'>{
    task: TaskInterface;
    onDimiss?: (task: TaskInterface) => void;
}
const LIST_ITEM_HEIGHT = height*.60;
const LIST_ICON_HEIGHT = height*.45;
const TEXT_DESCRIPTION = 18;
const LIST_ITEM_W = 70;
const {width: SCREEN_WIDTH} = Dimensions.get('window')
const TRANSLATE_X_THRESHOLD = -SCREEN_WIDTH * .1
const TRANSLATE_X_ACCEPT = SCREEN_WIDTH * .1



const ListItem: React.FC<ListItemProps> = ({task, onDimiss, simultaneousHandlers}) =>{
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
            //console.log("Dissmissed: "+shouldBeDismissed+" "+TRANSLATE_X_THRESHOLD)
            //console.log("Accepted: "+shouldBeAccepted+" "+TRANSLATE_X_ACCEPT)
            if(shouldBeDismissed) {
                translateX.value = withTiming(-SCREEN_WIDTH);
                itemHeight.value = withTiming(0);
                marginVertical.value = withTiming(0); 
                opacity.value = withTiming(0, undefined, (isFinished) => {
                   if(isFinished && onDimiss) {
                    runOnJS(onDimiss)(task);
                   }
                })
                console.log(translateX.value);
                
            }if(shouldBeAccepted){
                translateX.value = withTiming(SCREEN_WIDTH);
                itemHeight.value = withTiming(0);
                marginVertical.value = withTiming(0); 
                opacity.value = withTiming(0, undefined, (isFinished) => {
                   if(isFinished && onDimiss) {
                    runOnJS(onDimiss)(task);
                   }
                })
                console.log(translateX.value);
            } 
            else {
                translateX.value = withTiming(0);
                console.log(translateX.value);
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
        const opacity = withTiming( translateX.value < TRANSLATE_X_THRESHOLD ? 1 : 0);
        return {opacity};
    })

    const lIconContainerStyle = useAnimatedStyle(() => {
        const opacity = withTiming( translateX.value > TRANSLATE_X_ACCEPT ? 1 : 0);
        return {opacity};
    })
    
    const rTaskContainerStyle = useAnimatedStyle(() => {
        return {
            height: itemHeight.value,
            marginVertical: marginVertical.value,
            opacity: opacity.value,
        };
    })

    return (
        <Animated.View style={[styles.taskcontainer, rTaskContainerStyle]}>
             <Animated.View style={[width >= 800 ? styles.task: styles.tasksmall]}>
            <ImageBackground source={{uri:imagenes[1]}}  style={styles.image} imageStyle={{ borderRadius: 10}}></ImageBackground>
            </Animated.View>
            <Animated.View style={[styles.iconContainerL, lIconContainerStyle]}>
                <MaterialCommunityIcons name="water-check" size={LIST_ITEM_HEIGHT*0.4} color={'#dc143c'}  />
            </Animated.View>
            <Animated.View style={[styles.iconContainerR, rIconContainerStyle]}>
                <MaterialCommunityIcons name="water-remove" size={LIST_ITEM_HEIGHT*0.4} color={'#dc143c'}  />
            </Animated.View>
           
            <PanGestureHandler simultaneousHandlers={simultaneousHandlers} onGestureEvent={panGesture}>   
                        <Animated.View style={[styles.textContainer, rStyle]}>
                        <Text style={[width >= 800 ? styles.tasktitle : styles.tasktitlesmall]}>{task.user}</Text>
                            <Animated.View>
                                <Text style={[width >= 800 ? styles.tasktext : styles.tasktextsmall]}>Tipo: {task.tipo}</Text>
                                <Text style={[width >= 800 ? styles.tasktext : styles.tasktextsmall]}>Municipio: {task.municipio}</Text>
                                <Text style={[width >= 800 ? styles.taskdescpsmall : styles.taskdescpsmall]}>Descripción: {task.descripcion} </Text>
                            </Animated.View>
                </Animated.View>
            </PanGestureHandler>
            
        </Animated.View>
    );
};



const styles = StyleSheet.create({
    taskcontainer:{
        width: '100%',
        height: LIST_ITEM_HEIGHT,
        alignItems: 'center',

    },
    image: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingBottom: '10%',
        alignItems: 'center',
        
      },
    textContainer:{
        width: '85%',
        marginTop: '65%',
        height: '35%',
        position: 'absolute',
        //backgroundColor: 'rgba(255,255,255,0.5)',
        backgroundColor: 'white',
        flexDirection: 'column',
        borderRadius: 10,
        padding: 30,
        elevation: 20,
        shadowColor: '#171717',
    },
    tasksmall:{
        width: '60%',
        height: '60%',
        backgroundColor: 'white',
        marginVertical: 10,
        justifyContent: 'center',
        borderRadius: 10,
    },
    task:{
        width: '60%',
        height: 'auto',
        backgroundColor: 'white',
        marginVertical: 10,
        justifyContent: 'center',
        borderRadius: 10,
    },
    tasktitlesmall: {
        fontSize: 25,
        fontFamily: 'Quicksand-Bold',
    },
    tasktextsmall: {
        fontSize: 18,
        fontFamily: 'Quicksand-Bold',
        textAlign: 'auto',
    },
    taskdescpsmall: {
        fontSize: TEXT_DESCRIPTION,
        fontFamily: 'Quicksand-Bold',
        textAlign: 'auto',
    },
    tasktitle: {
        fontSize: 40,
        fontFamily: 'Quicksand-Bold',
    },
    tasktext: {
        fontSize: 30,
        fontFamily: 'Quicksand-Bold',
    },
    iconContainerR:{
        height:LIST_ICON_HEIGHT,
        width:LIST_ICON_HEIGHT,
        position: 'absolute',
        left: '49%',
        justifyContent: 'center',
        alignItems: 'center',
        top: '65%',
    },
    iconContainerL:{
        height:LIST_ICON_HEIGHT,
        width:LIST_ICON_HEIGHT,
        position: 'absolute',
        right: '49%',
        justifyContent: 'center',
        alignItems: 'center',
        top: '65%',
    }


});

export default ListItem;