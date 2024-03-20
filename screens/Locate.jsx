import React, { useContext } from "react";
import { StyleSheet, Image, View, Dimensions, TextInput } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { mapStyle } from '../assets/API/mapStyle';
import themeContext from "../helper/ThemeCon";
import Icon from 'react-native-vector-icons/FontAwesome'; // Importa el ícono de FontAwesome
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; // Importa el ícono de hospital de react-native-vector-icons

const Locate = ({ navigation }) => {
  const teme = useContext(themeContext);
  const { width, height } = Dimensions.get('window'); // Obtener las dimensiones de la pantalla

  // Define la posición del marcador
const trinidad = { latitude: 20.674034328562605, longitude:-103.35456829223563};
const jardinesDeGuadalupe= {latitude: 20.669528654523617, longitude: -103.42169873652034} 
const Corbec= {latitude: 20.667801922005633, longitude: -103.40744118164494}
const Vidar= {latitude:20.68918864218836, longitude:  -103.38937245569257}
const cets = {latitude: 20.72176426843239, longitude: -103.37067217053128}
const ConvidarPatria= {latitude: 20.715078166056056, longitude: -103.35995092219794}
const Condivar1= {latitude: 20.708646991836105, longitude: -103.34644433989165}
const margarita= {latitude: 20.68163590662579, longitude: -103.35816213691017} 
const tyb= {latitude: 20.68504995368874, longitude: -103.35712830324414}
const civilviejo= {latitude: 20.68731976715467, longitude: -103.34375649724142}
const imms= {latitude: 20.685631451080248, longitude: -103.3279600746248} 
const Condivar2 = {latitude: 20.677734353893662, longitude: -103.31219535042946}

  return (
    <View style={[styles.container, { backgroundColor: teme.background }]}>
      <MapView
        customMapStyle={mapStyle}
        provider={PROVIDER_GOOGLE}
        style={styles.mapStyle}
        initialRegion={{
          latitude: 20.6596988,
          longitude: -103.3496092,
          latitudeDelta: 0.03,
          longitudeDelta: 0.03,
        }}
        mapType="standard"
      >
        {/* Marcador personalizado */}
        <Marker
          coordinate={trinidad}
          title="Hospital santísima Trinidad"
        >
          {/* Utiliza el ícono de hospital de react-native-vector-icons */}
          <Image source={require('../assets/sangreb.png')} style={{  width: 30, height: 30 }}/>
        </Marker>
        <Marker
          coordinate={jardinesDeGuadalupe}
          title="Banco de Sangre Jardines de Guadalupe"
        >
          {/* Utiliza el ícono de hospital de react-native-vector-icons */}
          <Image source={require('../assets/sangreb.png')} style={{ width: 30, height: 30 }}/>
        </Marker>
        <Marker
          coordinate={Corbec}
          title="Corbec Banco de Sangre"
        >
          {/* Utiliza el ícono de hospital de react-native-vector-icons */}
          <Image source={require('../assets/sangreb.png')} style={{  width: 30, height: 30 }}/>
        </Marker>
        <Marker
          coordinate={cets}
          title="CETS Jalisco"
        >
          {/* Utiliza el ícono de hospital de react-native-vector-icons */}
          <Image source={require('../assets/sangreb.png')} style={{  width: 30, height: 30}}/>
        </Marker>
        <Marker
          coordinate={Vidar}
          title="VIDAR BANCO DE SANGRE S. DE R.L. DE C.V."
          
        >
          {/* Utiliza el ícono de hospital de react-native-vector-icons */}
          <Image source={require('../assets/sangreb.png')} style={{  width: 30, height: 30 }}/>
        </Marker>
        <Marker
          coordinate={ConvidarPatria}
          title="Convidar Patria"
          
        >
          {/* Utiliza el ícono de hospital de react-native-vector-icons */}
          <Image source={require('../assets/sangreb.png')} style={{  width: 30, height: 30}}/>
        </Marker>
        <Marker
          coordinate={Condivar1}
          title="Convidar Hospital Versalles">
          {/* Utiliza el ícono de hospital de react-native-vector-icons */}
          <Image source={require('../assets/sangreb.png')} style={{  width: 30, height: 30 }}/>
        </Marker>
        <Marker
          coordinate={margarita}
          title="Banco de Sangre Hospital Santa Margarita">
          {/* Utiliza el ícono de hospital de react-native-vector-icons */}
          <Image source={require('../assets/sangreb.png')} style={{ width: 30, height: 30}}/>
        </Marker>
        <Marker
          coordinate={tyb}
          title="Centro De Transfusiones Y Banco De Sangre">
          {/* Utiliza el ícono de hospital de react-native-vector-icons */}
          <Image source={require('../assets/sangreb.png')} style={{  width: 30, height: 30}}/>
        </Marker>
        <Marker
          coordinate={civilviejo}
          title="Banco de sangre Hospital civil viejo.">
          {/* Utiliza el ícono de hospital de react-native-vector-icons */}
          <Image source={require('../assets/sangreb.png')} style={{  width: 30, height: 30 }}/>
        </Marker>
        <Marker
          coordinate={imms}
          title="IMSS CMN Occidente Banco de Sangre">
          {/* Utiliza el ícono de hospital de react-native-vector-icons */}
          <Image source={require('../assets/sangreb.png')} style={{  width: 30, height: 30 }}/>
        </Marker>
        <Marker
          coordinate={Condivar2}
          title="Convidar Santa Martha">
          {/* Utiliza el ícono de hospital de react-native-vector-icons */}
          <Image source={require('../assets/sangreb.png')} style={{ width: 30, height: 30 }}/>
        </Marker>
       
        
      </MapView>
      <View style={[styles.input, { marginTop: height * 0.03 }]}>
        <TextInput
          placeholder="Municipio"
          placeholderTextColor='#000'
          autoCapitalize="none"
          style={{ flex: 1, padding: 0 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  input: {
    backgroundColor: '#fff',
    position: 'absolute',
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 5,
    padding: 10,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
});

export default Locate;
