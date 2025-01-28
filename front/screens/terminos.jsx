import React, {useState, useContext} from "react"
import { Text, View, Button, StyleSheet, Modal, ScrollView, Dimensions} from "react-native"
import themeContext from "../helper/ThemeCon"
import { useTranslation } from "react-i18next";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const Termycon = ({navigation}) => {
    const {t} = useTranslation();
    const teme = useContext(themeContext)
    
    return(
        <View 
            style={{backgroundColor: teme.background}}
            className="p-4"
        >
            <Text 
                style={{color: teme.color}}
                className="text-3xl text-center my-4 font-bold"
            > 
                Bloodmatch 
            </Text>
            <ScrollView 
                style={{backgroundColor: teme.bla}}
                className="p-3 rounded-lg"
            >
                <Text
                    className="bg-red-100 text-lg text-center rounded-md py-2 mb-4"
                >
                      {t("bienvenida")}                    
                </Text>
                <Text style={[{color: teme.color}, styles.terms]}>
                    1. {t("accep-terms")}{'\n'}
                </Text>
                <Text className="text-justify" style = {{color: teme.color}}>
                    {t("parrafo-1")}{'\n'}{'\n'}
                    {t("parrafo-1.1")}
                </Text>
                <Text style={[{color: teme.color}, styles.terms]}>
                    2. {t("elegi")}
                </Text>
                <Text className="text-justify" style = {{color: teme.color}}>
                    {t("parrafo-2")}{'\n'}{'\n'}
                    {t("parrafo-2.1")}{'\n'}
                    {t("parrafo-2.2")}{'\n'}
                    {t("parrafo-2.3")} {'\n'}
                    {t("parrafo-2.4")}{'\n'}
                    {t("parrafo-2.5")}{'\n'}
                </Text>
                <Text style={[{color: teme.color}, styles.terms]}>
                    3. {t("ur-acc")}
                </Text>
                <Text className="text-justify" style = {{color: teme.color}}>
                    {t("parrafo-3")}{'\n'}{'\n'}
                    {t("parrafo-3.1")}
                </Text>
                <Text style={[{color: teme.color}, styles.terms]}>
                    4. {t("mod-serv")}
                </Text>
                <Text className="text-justify" style = {{color: teme.color}}>
                    {t("parrafo-4")}{'\n'}{'\n'}
                    {t("parrafo-4.1")}{'\n'}{'\n'}
                    {t("parrafo-4.2")}
                </Text>
                <Text style={[{color: teme.color}, styles.terms]}>
                    5. {t("secur")}
                </Text>
                <Text className="text-justify" style = {{color: teme.color}}>
                    {t("parrafo-5")}{'\n'}{'\n'}
                    {t("parrafo-5.1")}
                </Text>
                <Text style={[{color: teme.color}, styles.terms]}>
                    6. {t("rights-blood")}
                </Text>
                <Text className="text-justify" style = {{color: teme.color}}>
                    {t("parrafo-6")}{'\n'}{'\n'}
                    {t("parrafo-6.1")}{'\n'}
                    {t("parrafo-6.2")}{'\n'}
                    {t("parrafo-6.3")}{'\n'}
                    {t("parrafo-6.4")}{'\n'}
                    {t("parrafo-6.5")}{'\n'}
                    {t("parrafo-6.6")}{'\n'}
                    {t("parrafo-6.7")}{'\n'}
                    {t("parrafo-6.8")}{'\n'}
                    {t("parrafo-6.9")}{'\n'}
                    {t("parrafo-6.10")}{'\n'}
                    {t("parrafo-6.11")}{'\n'}
                    {t("parrafo-6.12")}{'\n'}
                    {t("parrafo-6.13")}{'\n'}{'\n'}
                    {t("parrafo-6.14")}{'\n'}{'\n'}
                    {t("parrafo-6.15")}
                </Text>
                <Text style={[{color: teme.color}, styles.terms]}>
                    7. {t("ur-rights-to")}
                </Text>
                <Text className="text-justify" style = {{color: teme.color}}>
                    {t("parrafo-7")}{'\n'}{'\n'}
                    {t("parrafo-7.1")}{'\n'}{'\n'}
                    {t("parrafo-7.2")}{'\n'}{'\n'}
                    {t("parrafo-7.3")}{'\n'}{'\n'}
                    {t("parrafo-7.4")}{'\n'}{'\n'}
                    {t("parrafo-7.5")}
                </Text>
                <Text style={[{color: teme.color}, styles.terms]}>
                    8. {t("comm-rules")}
                </Text>
                <Text className="text-justify" style = {{color: teme.color}}>
                    {t("parrafo-8")}{'\n'}{'\n'}
                    {t("parrafo-8.1")}{'\n'}
                    {t("parrafo-8.2")}{'\n'}
                    {t("parrafo-8.3")}{'\n'}
                    {t("parrafo-8.4")}{'\n'}
                    {t("parrafo-8.5")}{'\n'}
                    {t("parrafo-8.6")}{'\n'}
                    {t("parrafo-8.7")}{'\n'}
                    {t("parrafo-8.8")}{'\n'}
                    {t("parrafo-8.9")}{'\n'}
                    {t("parrafo-8.10")}{'\n'}
                    {t("parrafo-8.11")}{'\n'}
                    {t("parrafo-8.12")}{'\n'}
                    {t("parrafo-8.13")}{'\n'}
                    {t("parrafo-8.14")}{'\n'}{'\n'}
                    {t("parrafo-8.15")}
                </Text>
                <Text style={[{color: teme.color}, styles.terms]}>
                    9. {t("user-cont")}
                </Text>
                <Text className="text-justify" style = {{color: teme.color}}>
                    {t("parrafo-9")}
                </Text>
                <Text style={[{color: teme.color}, styles.terms]}>
                    10. {t("nots-autor-rights")}
                </Text>
                <Text className="text-justify" style = {{color: teme.color}}>
                    {t("parrafo-10")}{'\n'}{'\n'}
                    {t("parrafo-10.1")}{'\n'}{'\n'}
                    {t("parrafo-10.2")}{'\n'}
                    {t("parrafo-10.3")}{'\n'}
                    {t("parrafo-10.4")}{'\n'}{'\n'}
                    {t("parrafo-10.5")}{'\n'}{'\n'}
                    {t("parrafo-10.6")}{'\n'}{'\n'}
                    {t("parrafo-10.7")}{'\n'}{'\n'}
                    {t("parrafo-10.8")}
                </Text>
                <Text style={[{color: teme.color}, styles.terms]}>
                    11. {t("downl")}
                </Text>
                <Text className="text-justify" style = {{color: teme.color}}>
                    {t("parrafo-11")}{'\n'}{'\n'}
                    {t("parrafo-11.1")}
                </Text>
                <Text style={[{color: teme.color}, styles.terms]}>
                    12. {t("resp-lim")}
                </Text>
                <Text className="text-justify" style = {{color: teme.color}}>
                    {t("parrafo-12")} {'\n'}{'\n'}
                    {t("parrafo-12.1")}
                </Text>
                <Text style={[{color: teme.color}, styles.terms]}>
                    13. {t("arb-ren-dem")}
                </Text>
                <Text className="text-justify" style = {{color: teme.color}}> 
                    {t("parrafo-13")}{'\n'}{'\n'}
                    {t("parrafo-13.1")}{'\n'}{'\n'}
                    {t("parrafo-13.2")}
                </Text>
                <Text style={[{color: teme.color}, styles.terms]}>
                    14. {t("legis-apli")}
                </Text>
                <Text className="text-justify" style = {{color: teme.color}}>
                    {t("parrafo-14")}
                </Text>
                <Text style={[{color: teme.color}, styles.terms]}>
                    15. {t("juris")}
                </Text>
                <Text className="text-justify" style = {{color: teme.color}}>
                    {t("parrafo-15")}
                </Text>
                <Text style={[{color: teme.color}, styles.terms]}>
                    16. {t("indem")}
                </Text>
                <Text className="text-justify" style = {{color: teme.color}}>
                    {t("parrafo-16")}
                </Text>
                <Text style={[{color: teme.color}, styles.terms]}>
                    17. {t("agree-full")}
                </Text>
                <Text className="text-justify" style = {{color: teme.color}}>
                    {t("parrafo-17")}
                </Text>
            </ScrollView>             
        </View>
    );
}
     
const styles = StyleSheet.create ({
    // container:{
    //     flex: 1,
    //     backgroundColor: '#ceecff',
    //     alignItems: 'stretch',
    // },
    
    // Scrollbase:{
    //   padding: 20,
    //   backgroundColor: 'white',
    //   margin: 20,
    //   borderRadius: 10,
    // },

    // text:{
    //     color:'black', 
    //     fontWeight: 'bold', 
    //     fontStyle: 'italic', 
    //     fontSize: height*.03,
    //     alignSelf: 'center',
    //     paddingTop: 30
    // },
    // termin: {
    //     backgroundColor: 'rgba(244, 146, 146, 0.4)',
    //     borderRadius: 10,
    //     marginTop: 10,
    //     fontSize: height*.03,
    //     alignSelf: 'center',
    //     padding: 10,
    //     fontFamily: 'Quicksand-Bold',
    //     /*borderColor: 'gray',
    //     backgroundColor: 'red',
    //     fontWeight: 'bold', 
    //     color:'black', 
    //     fontStyle: 'italic', 
    //     borderWidth: 3*/    
    // },
    // titles: {
    //     color: 'black',
    //     fontFamily: 'Quicksand-Bold',
    //     //fontStyle: 'italic',
    //     //fontWeight: 'bold',
    //     marginTop: 20,
    //     fontSize: height*.03,
    // },
    // mainText:{
    //     textAlign: "justify",
    //     fontFamily: 'Quicksand-Bold',
    //     fontSize: height*.02,
    // },
    terms: {
        fontSize: 14,
        fontWeight: 'bold',
        paddingTop: 25,
        paddingBottom: 5
    }
});

export default Termycon;