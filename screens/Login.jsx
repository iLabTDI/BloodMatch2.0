import React, { useState, useContext } from 'react';
import { StyleSheet, View, Image, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import { ButtonGeneric } from '../components/Buttons';
import { validateUser } from '../helper/validations/validationUser';
import { validatePassword } from '../helper/validations/validationPassw';
import { size } from "lodash";
import { useTranslation } from "react-i18next";
import themeContext from "../helper/ThemeCon";
import { supabase } from '../lib/supabase';

const PlaceImage = require('../assets/logotipo.png');

const LogIn = (props) => {
    const { navigation } = props;
    const { t } = useTranslation();
    const theme = useContext(themeContext);
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [errorUserName, setErrorUserName] = useState("");
    const [errorPassword, setErrorPassword] = useState("");

    const DoSignIn = async () => {
        try {
            const { data, error } = await supabase
                .from('usuarios')
                .select('*')
                //.eq('UserName',user)
                //.eq('UserName', user);
                
            if (error) {
                return;
            }

            const usuario = data[0];

            if (usuario && usuario.password === password) {
                navigation.push('Home');
            } else {
                Alert.alert('Error', 'Usuario o contraseña incorrectos.');
            }

        } catch (error) {
            console.error("Error en el inicio de sesión:", error);
        }
    };

    const validateData = () => {
        let isValid = true;

        if (!validateUser(user)) {
            setErrorUserName("Debe ingresar un nombre de usuario válido.");
            isValid = false;
        }

        if (!validatePassword(password) || size(password) < 8) {
            setErrorPassword("Debe ingresar una contraseña válida.");
            isValid = false;
        }

        return isValid;
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <Image source={PlaceImage} style={styles.image} />
            <TextInput
                style={[styles.textInput, { backgroundColor: theme.bla }, { color: theme.color }]}
                placeholder="Usuario"
                value={user}
                onChangeText={val => setUser(val)}
                error={errorUserName}
            />
            <TextInput
                style={[styles.textInput, { backgroundColor: theme.bla }, { color: theme.color }]}
                placeholder="Contraseña"
                secureTextEntry={true}
                value={password}
                onChangeText={val => setPassword(val)}
                error={errorPassword}
            />
            <ButtonGeneric
                text={t("log-in")}
                onPress={() => {
                    if (validateData()) {
                        DoSignIn();
                    }
                }}
            />
            <TouchableOpacity style={styles.regisButton} onPress={() => { navigation.navigate('new-reg') }}>
                <Text style={{ ...styles.textLink, marginStart: '40%' }}>{t("rgst")}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#a3a3ff',
        alignItems: 'center',
    },
    image: {
        marginTop: '27%',
        marginVertical: 10,
        width: 203,
        height: 310,
    },
    textInput: {
        width: '83%',
        height: 40,
        borderRadius: 10,
        marginVertical: 7,
        fontWeight: 'bold',
        fontStyle: 'italic',
        fontSize: 16,
        backgroundColor: '#fff'
    },
    textLink: {
        color: '#fff',
        fontWeight: 'bold',
        fontStyle: 'italic',
        fontSize: 15.5,
    },
    regisButton: {
        borderRadius: 10,
        marginVertical: 13,
        paddingVertical: 11,
        width: '84%',
        flexDirection: 'row',
        borderColor: '#fff',
        borderWidth: 1,
    }
});

export default LogIn;
