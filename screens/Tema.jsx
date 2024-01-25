import React, {useState, useContext} from "react";
import { StyleSheet, Text, View, TouchableOpacity, Switch} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { EventRegister } from "react-native-event-listeners";
import themeContext from "../helper/ThemeCon";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
// Pantalla creada para la utilizacion del dark mode, en esta se puede seleccionar si activarlo o desactivarlo

const Tema = ({navigation}) => {
    const teme = useContext(themeContext)
    const [theme, setTheme] = useState(false)

    const ToogleTheme = (value) => {
        setTheme(value);
        EventRegister.emit('Cambiar el tema', value)
    }

    return (
            <View style= {[styles.container, {backgroundColor: teme.background}]}>
                <Text style={[styles.text, {color: teme.color}]}>
                    Esta pantalla la utilizamos para cambiar el tema
                </Text>
                  
                <Switch value={theme} onValueChange={ (value) => ToogleTheme(value) }
                />
                <TouchableOpacity style={styles.button} onPress={() => navigation.push('Home')}>
                    <MaterialCommunityIcons name="check-circle-outline" color={'#c20000'} size = {50}/>
                </TouchableOpacity>
            </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex:1,
      backgroundColor: '#ceecff',
      alignItems: 'center',
      justifyContent: 'center',
      justifyContent: 'center',
    },
    button: {
        alignItems: 'flex-start',
        padding: 10,
        
      },
    text:{
        fontWeight: 'bold',
        fontSize: 20,
        paddingBottom: 20
    },
});
export default Tema;