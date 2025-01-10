
//Tere
import React, {useState, useContext} from "react"
import { Text, View, Button, StyleSheet, Modal, ScrollView, Dimensions} from "react-native"
import themeContext from "../helper/ThemeCon"
import i18next, { language_resources } from "../helper/idiom-changer";
import languageList from "../components/languageList.json"
import { useTranslation } from "react-i18next";

{/* 
    Pantalla creada para añadir las politicas de privacidad por parte de TERE
*/ }
//obtener tamaño de pantalla
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
//Componente principal
const Privacidad = ({navigation}) => {
    const {t} = useTranslation();
    const teme = useContext(themeContext)
    
    return(
                //se agrega los estilos para intercambiar entre darkMode y el lightMode
            <View style={[styles.container, {backgroundColor: teme.background}]}>
                {/*Texto 1 Bloodmatch */}
                <Text style={[styles.text, {color: teme.color}]}>Bloodmatch </Text>
                {/*Contenedor de las politicas de privacidad con desplazamiento*/}
                <ScrollView style={[styles.Scrollbase, {backgroundColor: teme.bla}]}>
                {/*Titulo de privacidad*/}
                <Text style={styles.termin}>
                                {t("priv-pol")}                   
                    </Text>
                    {/*Texto de las politicas*/}
                    <Text style={[styles.titles, {color: teme.color}]}>
                        {t("compromiso")}
                    </Text>
                    <Text style = {[styles.mainText, {color: teme.color}]}>
                    {t("priv-1")}
                    {'\n'}{'\n'}
                    {t("priv-2")}
                    {'\n'}{'\n'}
                    {t("priv-3")}
                    {'\n'}{'\n'}
                    {t("priv-4")}
                    {'\n'}{'\n'}
                    {t("priv-5")}
                    {'\n'}{'\n'}
                   </Text>
                   <Text style={[styles.titles, {color: teme.color}]}>
                        {t("priv-pol")}
                    </Text>
                    <Text style = {[styles.mainText, {color: teme.color}]}>
                    {t("priv-6")}
                    {'\n'}{'\n'}
                    {t("priv-7")}
                    {'\n'}{'\n'}
                    {t("priv-8")}
                    {'\n'}{'\n'}
                    {t("priv-8.1")}{'\n'}                    
                    {t("priv-8.2")}{'\n'}
                    {t("priv-8.3")}{'\n'}
                    {t("priv-8.4")}{'\n'}
                    {t("priv-8.5")}{'\n'}
                    {t("priv-8.6")}{'\n'}
                    {t("priv-8.7")}{'\n'}
                    {t("priv-8.8")}{'\n'}
                    {t("priv-8.9")}{'\n'}
                    {t("priv-8.10")}{'\n'}
                    {t("priv-8.11")}{'\n'}
                    {'\n'}
                    </Text>
                    <Text style={[styles.titles, {color: teme.color}]}>
                        {t("priv-8.1")}
                    </Text>
                    <Text style = {[styles.mainText, {color: teme.color}]}>
                    {t("priv-8.1.1")}
                    {'\n'}{'\n'}
                    </Text>
                    <Text style={[styles.titles, {color: teme.color}]}>
                    {t("priv-8.2")}
                    </Text>
                    <Text style = {[styles.mainText, {color: teme.color}]}>
                    {t("priv-8.2.1")}                    
                    {'\n'}{'\n'}
                    {t("priv-8.2.2")}
                    {'\n'}{'\n'}
                    </Text>
                    <Text style={[styles.titles, {color: teme.color}]}>
                    {t("priv-8.3")}
                    </Text>
                    <Text style = {[styles.mainText, {color: teme.color}]}>
                    {t("priv-8.3.1")}
                    {'\n'}{'\n'}
                    {t("priv-8.3.2")}                    
                    {'\n'}{'\n'}
                    {t("priv-8.3.3")}                    
                    {'\n'}
                    {t("priv-8.3.4")}                  
                    {'\n'}
                    {t("priv-8.3.5")}                    
                    {'\n'}
                    {t("priv-8.3.6")}
                    {'\n'}
                    {t("priv-8.3.7")}
                    {'\n'}
                    {t("priv-8.3.8")}
                    {'\n'}
                    {t("priv-8.3.9")}
                    {'\n'}
                    {t("priv-8.3.10")}
                    {'\n'}
                    {t("priv-8.3.11")}
                    {'\n'}{'\n'}
                    {t("priv-8.3.12")}
                    {'\n'}
                    {t("priv-8.3.13")}
                    {'\n'}
                    {t("priv-8.3.14")}                    
                    {'\n'}{'\n'}
                    {t("priv-8.3.15")}  
                    {'\n'}{'\n'}
                    {t("priv-8.3.16")}
                    {'\n'}
                    {t("priv-8.3.17")}
                    {'\n'}
                    {t("priv-8.3.18")}
                    {'\n'}{'\n'}
                    {t("priv-8.3.19")}
                    {'\n'}{'\n'}
                    {t("priv-8.3.20")}
                    {'\n'}
                    {t("priv-8.3.21")}
                    {'\n'}{'\n'}
                    </Text>
                    <Text style={[styles.titles, {color: teme.color}]}>
                    {t("priv-8.4")}
                    </Text>
                    <Text style = {[styles.mainText, {color: teme.color}]}>
                    {t("priv-8.4.1")}
                    {'\n'}{'\n'}
                    {t("priv-8.4.2")}
                    {'\n'}
                    {t("priv-8.4.3")}
                    {'\n'}
                    {t("priv-8.4.4")}
                    {'\n'}
                    {t("priv-8.4.5")}
                    {'\n'}
                    {t("priv-8.4.6")}
                    {'\n'}{'\n'}
                    {t("priv-8.4.7")}
                    {'\n'}
                    {t("priv-8.4.8")}
                    {'\n'}
                    {t("priv-8.4.9")}
                    {'\n'}
                    {t("priv-8.4.10")}
                    {'\n'}{'\n'}
                    {t("priv-8.4.11")}
                    {'\n'}
                    {t("priv-8.4.12")}
                    {'\n'}
                    {t("priv-8.4.13")}
                    {'\n'}{'\n'}
                    {t("priv-8.4.14")}
                    {'\n'}
                    {t("priv-8.4.15")}
                    {'\n'}
                    {t("priv-8.4.16")}
                    {'\n'}{'\n'}
                    {t("priv-8.4.17")}
                    {'\n'}
                    {t("priv-8.4.18")}
                    {'\n'}
                    {t("priv-8.4.19")}
                    {'\n'}
                    {t("priv-8.4.20")}
                    {'\n'}
                    {t("priv-8.4.21")}
                    {'\n'}{'\n'}
                    {t("priv-8.4.22")}
                    {'\n'}
                    {t("priv-8.4.23")}
                    {'\n'}
                    {t("priv-8.4.24")}
                    {'\n'}
                    {t("priv-8.4.25")}
                    {'\n'}
                    {t("priv-8.4.26")}
                    {'\n'}
                    {t("priv-8.4.27")}
                    {'\n'}{'\n'}
                    {t("priv-8.4.28")}
                    {'\n'}
                    {t("priv-8.4.29")}
                    {'\n'}
                    {t("priv-8.4.30")}
                    {'\n'}
                    {t("priv-8.4.31")}
                    {'\n'}{'\n'}
                    {t("priv-8.4.32")}
                    {'\n'}
                    {t("priv-8.4.33")}
                    {'\n'}
                    {t("priv-8.4.34")}
                    {'\n'}
                    {t("priv-8.4.35")}
                    {'\n'}
                    {t("priv-8.4.36")}
                    {'\n'}{'\n'}
                    </Text>
                    <Text style={[styles.titles, {color: teme.color}]}>
                    {t("priv-8.5")}
                    </Text>
                    <Text style = {[styles.mainText, {color: teme.color}]}>
                    {t("priv-8.5.1")}
                    {'\n'}{'\n'}
                    {t("priv-8.5.2")}
                    {'\n'}
                    {t("priv-8.5.3")}
                    {'\n'}{'\n'}
                    {t("priv-8.5.4")}
                    {'\n'}{'\n'}
                    {t("priv-8.5.5")}
                    {'\n'}{'\n'}
                    {t("priv-8.5.6")}
                    {'\n'}
                    {t("priv-8.5.7")}
                    {'\n'}{'\n'}
                    {t("priv-8.5.8")}
                    {'\n'}{'\n'}
                    {t("priv-8.5.9")}
                    {'\n'}
                    {t("priv-8.5.10")}
                    {'\n'}{'\n'}
                    {t("priv-8.5.11")}
                    {'\n'}
                    {t("priv-8.5.12")}
                    {'\n'}{'\n'}
                    {t("priv-8.5.13")}
                    {'\n'}    
                    {t("priv-8.5.14")}
                    {'\n'}{'\n'}
                    {t("priv-8.5.15")}
                    {'\n'}
                    {t("priv-8.5.16")}
                    {'\n'}{'\n'}
                    {t("priv-8.5.17")}
                    {'\n'}
                    {t("priv-8.5.18")}
                    {'\n'}{'\n'}
                    {t("priv-8.5.19")}
                    {'\n'}{'\n'}
                    </Text>
                    <Text style={[styles.titles, {color: teme.color}]}>
                    {t("priv-8.6")}
                    </Text>
                    <Text style = {[styles.mainText, {color: teme.color}]}>
                    {t("priv-8.6.1")}
                    {'\n'}
                    {t("priv-8.6.2")}
                    {'\n'}
                    {t("priv-8.6.3")}
                    {'\n'}
                    {t("priv-8.6.4")}
                    {'\n'}
                    {t("priv-8.6.5")}
                    {'\n'}{'\n'}
                    {t("priv-8.6.6")}
                    {'\n'}
                    {t("priv-8.6.7")}
                    {'\n'}
                    {t("priv-8.6.8")}
                    {'\n'}
                    {t("priv-8.6.9")}
                    {'\n'}
                    {t("priv-8.6.10")}
                    {'\n'}{'\n'}
                    {t("priv-8.6.11")}
                    {'\n'}{'\n'}
                    </Text>
                    <Text style={[styles.titles, {color: teme.color}]}>
                    {t("priv-8.7")}
                    </Text>
                    <Text style = {[styles.mainText, {color: teme.color}]}>
                    {t("priv-8.7.1")}
                    {'\n'}{'\n'}
                    {t("priv-8.7.2")}
                    {'\n'}
                    {t("priv-8.7.3")}
                    {'\n'}{'\n'}
                    {t("priv-8.7.4")}
                    {'\n'}
                    {t("priv-8.7.5")}
                    {'\n'}
                    {t("priv-8.7.6")}
                    {'\n'}{'\n'}
                    </Text>
                    <Text style={[styles.titles, {color: teme.color}]}>
                    {t("priv-8.8")}
                    </Text>
                    <Text style = {[styles.mainText, {color: teme.color}]}>
                    {t("priv-8.8.1")}
                    {'\n'}{'\n'}
                    </Text>
                    <Text style={[styles.titles, {color: teme.color}]}>
                    {t("priv-8.9")}
                    </Text>
                    <Text style = {[styles.mainText, {color: teme.color}]}>
                    {t("priv-8.9.1")}
                    {'\n'}{'\n'}
                    {t("priv-8.9.2")}
                    {'\n'}{'\n'}
                    </Text>
                    <Text style={[styles.titles, {color: teme.color}]}>
                    {t("priv-8.10")}
                    </Text>
                    <Text style = {[styles.mainText, {color: teme.color}]}>
                    {t("priv-8.10.1")}
                    {'\n'}{'\n'}
                    </Text>
                    <Text style={[styles.titles, {color: teme.color}]}>
                    {t("priv-8.11")}
                    </Text>
                    <Text style = {[styles.mainText, {color: teme.color}]}>
                    {t("priv-8.11.1")}
                    {'\n'}
                    (datos)
                    {'\n'}{'\n'}
                    </Text>
                </ScrollView>
            </View>
    );
}


const styles = StyleSheet.create ({
    //Estilos del contenedor principal
    container:{
        flex: 1,
        backgroundColor: '#ceecff',
        alignItems: 'stretch',
    },
    //Estilos del scrollview
    Scrollbase:{
      padding: 20,
      backgroundColor: 'white',
      margin: 20,
      borderRadius: 10,
    },
    //Estilos del texto (Bloodmatch)
    text:{
        color:'black', 
        fontWeight: 'bold', 
        fontStyle: 'italic', 
        fontSize: height*.03,
        alignSelf: 'center',
        paddingTop: 30
    },
    //Estilos de contenedor rojo
    termin: {
        backgroundColor: 'rgba(244, 146, 146, 0.4)',
        borderRadius: 10,
        marginTop: 10,
        fontSize: height*.03,
        alignSelf: 'center',
        padding: 10,
        fontFamily: 'Quicksand-Bold',
        /*borderColor: 'gray',
        backgroundColor: 'red',
        fontWeight: 'bold', 
        color:'black', 
        fontStyle: 'italic', 
        borderWidth: 3*/    
    },
    //Estilos de los titulos
    titles: {
        color: 'black',
        fontFamily: 'Quicksand-Bold',
        //fontStyle: 'italic',
        //fontWeight: 'bold',
        marginTop: 20,
        fontSize: height*.03,
    },
    //Estilos de los parrafos
    mainText:{
        textAlign: "justify",
        fontFamily: 'Quicksand-Bold',
        fontSize: height*.02,
    },
});

export default Privacidad