import React, { useState, useContext, useEffect } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Dimensions, View, Text, Image, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { supabase } from '../lib/supabase'
import themeContext from "../helper/ThemeCon";
import { useTranslation } from "react-i18next";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const Customer = ({ navigation }) => {
  const theme = useContext(themeContext);
  const { t } = useTranslation();
  const [user, setUser] = useState(null);
  const [image, setImage] = useState(require('../images/user.png'));

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: true
    });
    if (!result.cancelled) {
      setImage({ uri: result.uri });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('usuarios') // Nombre de la tabla de usuarios
        .select('*');
  
      if (error) {
        console.error('Error fetching user:', error.message);
      } else {
        // Verificar si hay datos y manejar los casos de múltiples filas o ninguna fila
        if (data && data.length > 0) {
          // Asignar el primer usuario si hay datos
          setUser(data[0]);
        } else {
          console.error('No user data found');
        }
      }
    };
  
    fetchData();
  }, []);
  

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.contImage, width >= 800 ? styles.contImageGnde : styles.contImage]}>
        <StatusBar hidden={true} />
        {image && (<Image source={image} style={[styles.image, width >= 800 ? styles.imageGnde : styles.image]} />)}
        <TouchableOpacity style={styles.editimage} onPress={pickImage}>
          <MaterialCommunityIcons name="pencil-plus-outline" color={'#000000'} size={30} />
        </TouchableOpacity>
      </View>
      <View style={styles.column}>
        <View>
          <Text adjustsFontSizeToFit={true} numberOfLines={1} style={[styles.nameUser, width >= 800 ? styles.nameUserGnde : styles.nameUser, { color: theme.color }]}>
            @{user ? user.UserName : ''}
          </Text>
        </View>
        <View style={styles.row}>
          <View style={[styles.sect21, { backgroundColor: theme.bla }]}>
            <Text style={[styles.ContsText, { color: theme.color }]}>{t("gnd")}: {user ? user.Sexo : ''} </Text>
          </View>
          <View style={[styles.sect21, { backgroundColor: theme.bla }]}>
            <Text style={[styles.ContsText, { color: theme.color }]}>{t("tpy")}: {user ? user.Blood_Type : ''}</Text>
          </View>
        </View>
        <View style={[styles.sctgrande, { backgroundColor: theme.bla }]}>
          <Text adjustsFontSizeToFit={true} numberOfLines={2} style={[styles.ContsText, { color: theme.color }]}>
            {t("name")}: {user ? user.FirstName : ''} {user ? user.LastName : ''}
          </Text>
        </View>
        <View style={[styles.sctgrande, { backgroundColor: theme.bla }]}>
          <Text style={[styles.ContsText, { color: theme.color }]}>
            {t("cty")}: {user ? user.City : ''}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ceecff',
    alignItems: 'center',
    flexDirection: 'column',
    height: height * 1,
  },
  contImage: {
    paddingTop: '23%',
    height: height * .45,
  },
  contImageGnde: {
    paddingTop: '23%',
    height: height * .40,
  },
  column: {
    alignItems: 'center',
    height: height * .60
  },
  image: {
    width: 199,
    height: 199,
    borderRadius: Math.round(height + width) / 2,
  },
  imageGnde: {
    width: width * .40,
    height: height * .30,
    borderRadius: 1000,
  },
  editimage: {
    alignSelf: 'flex-end',
  },
  row: {
    flexDirection: 'row',
  },
  sect21: {
    marginTop: '4.5%',
    backgroundColor: 'white',
    width: 'auto',
    minWidth: width * .3,
    minHeight: height * .06,
    height: 'auto',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: '3%',
    alignItems: 'center',
  },
  sctgrande: {
    marginTop: '4.5%',
    backgroundColor: 'white',
    width: width * .66,
    height: height * .06,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nameUser: {
    textAlign: 'center',
    paddingTop: '7%',
    fontFamily: 'Quicksand-Bold',
    fontSize: height * .05,
    color: '#FFFFFF',
  },
  nameUserGnde: {
    textAlign: 'center',
    paddingTop: '15%',
    fontFamily: 'Quicksand-Bold',
    fontSize: height * .05,
    color: '#FFFFFF',
  },
  ContsText: {
    textAlign: 'left',
    marginLeft: '2%',
    fontFamily: 'Quicksand-Bold',
    fontSize: height * .019,
  },
});

export default Customer;
