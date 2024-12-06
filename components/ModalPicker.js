
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Dimensions,
ScrollView } from "react-native";


const genOp = ['Masculino', 'Femenino']
const TypeBloodOp = ['A+','A-','O+','O-','AB+','AB-','B+','B-']
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const ModalPickerg = (propsg) => {
    const onPressItem = (optiong) => {
        propsg.changeModalVisibilitygen(false)
        propsg.setGen(optiong)
    }

    const optiong = genOp.map((itemg, indexg) =>{
        return(
            <TouchableOpacity
                style= {styles.option}
                key={indexg}
                onPress={()=> onPressItem(itemg)}
            >
                <Text style={styles.text}>
                    {itemg}
                </Text>
            </TouchableOpacity>
        )
    })
    return( 
        <TouchableOpacity 
            onPress={() => propsg.changeModalVisibilitygen(false)}
            style={styles.container}
        >
            <View style={[styles.modal, {width: WIDTH - 50, height: HEIGHT/2}]}>
                <ScrollView>
                    {optiong}
                </ScrollView>
            </View>
        </TouchableOpacity>
    )
}

const ModalPicker = (props) => {

    const onPressItem = (option) => {
        props.changeModalVisibility(false)
        props.setType(option)
    }

    const option = TypeBloodOp.map((item, index) =>{
        return(
            <TouchableOpacity
                style= {styles.option}
                key={index}
                onPress={()=> onPressItem(item)}
            >
                <Text style={styles.text}>
                    {item}
                </Text>
            </TouchableOpacity>
        )
    })
    return( 
        <TouchableOpacity 
            onPress={() => props.changeModalVisibility(false)}
            style={styles.container}
        >
            <View style={[styles.modal, {width: WIDTH - 50, height: HEIGHT/2}]}>
                <ScrollView>
                    {option}
                </ScrollView>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent:'center',
    },
    modal:{
        backgroundColor: 'white',
        borderRadius: 10
    },
    option: {
        alignItems: 'flex-start'
    },
    text:{
        margin: 20,
        fontSize: 20,
        fontWeight: 'bold'
    }
})
export {ModalPicker}
export {ModalPickerg}