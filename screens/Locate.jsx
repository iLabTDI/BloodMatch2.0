import React, { useContext, useState } from "react";
import { StyleSheet, Image, View, Dimensions, TextInput, Modal, Text, Button, TouchableOpacity } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { mapStyle } from '../assets/API/mapStyle';
import themeContext from "../helper/ThemeCon";
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const Locate = ({ navigation }) => {
  const teme = useContext(themeContext);
  const { width, height } = Dimensions.get('window');

  const trinidad = { latitude: 20.674034328562605, longitude:-103.35456829223563 };
  const jardinesDeGuadalupe = { latitude: 20.669528654523617, longitude: -103.42169873652034 }; 
  const Corbec = { latitude: 20.667801922005633, longitude: -103.40744118164494 };
  const Vidar = { latitude: 20.68918864218836, longitude: -103.38937245569257 };
  const cets = { latitude: 20.72176426843239, longitude: -103.37067217053128 };
  const ConvidarPatria = { latitude: 20.715078166056056, longitude: -103.35995092219794 };
  const Condivar1 = { latitude: 20.708646991836105, longitude: -103.34644433989165 };
  const margarita = { latitude: 20.68163590662579, longitude: -103.35816213691017 }; 
  const tyb = { latitude: 20.68504995368874, longitude: -103.35712830324414 };
  const civilviejo = { latitude: 20.68731976715467, longitude: -103.34375649724142 };
  const imms = { latitude: 20.685631451080248, longitude: -103.3279600746248 }; 
  const Condivar2 = { latitude: 20.677734353893662, longitude: -103.31219535042946 };
  const aguascalientes ={latitude: 21.903298024012727, longitude: -102.30767946222157 }
  const general5={latitude:32.64570192616714,   longitude: -115.47650225426945 }
  const fray={latitude:32.508743095686505,  longitude:  -116.9850536450776  }
  const lapaz={latitude:24.140057570278387,   longitude: -110.34053204936485   }
  const ciudadConstitucion = {latitude: 25.025309341901632,longitude: -111.64164197685398};
  const santaRosalía = { latitude: 27.35418784142922, longitude: -112.27590203275865 };
  const sanJoseDelCabo = { latitude: 23.07555191287958, longitude: -109.70712002934016 };
  const ciudadDelCarmen = { latitude: 18.64765317959271,  longitude:-91.82209707466714  };
  const patricioTruebaRegil = { latitude: 19.82637334690695, longitude: -90.56403889340459 };
  const franciscoGalindoChávez = { latitude: 25.541538369235802, longitude: -103.44452892623792 };
  const joséMaríaRodríguez = { latitude: 25.43036134264174, longitude: -101.01190060829771 };
  const monclova = { latitude: 26.92855676295298, longitude: -101.42128327783746 };
  const nuevaRosita = { latitude: 27.93065609008513, longitude: -101.21230851103645 };
  const piedrasNegras = { latitude: 28.68621591598226, longitude: -100.54381501400276 };
  const sanPedroDeLasColonias = { latitude: 25.75399425193575, longitude: -102.99610457116451 };
  const colima = { latitude: 19.251139284280303, longitude: -103.71369713390013 };
  const manzanillo = { latitude: 19.089809552952488, longitude: -104.29476585821924 };
  const drBelisarioDominguez = { latitude: 16.748645426461902, longitude: -93.07442310688384 };
  const drRobertoNettelFlores = { latitude: 14.998285331149768, longitude: -92.24684901287463 };
  const ciudadJuarez = { latitude: 31.742946928257027, longitude: -106.44793133308693 };
  const presidenteLazaroCardenas = { latitude: 28.660210153481856, longitude: -106.09623645329144 };
  const hidalgoDelParral = { latitude: 26.967764953009613, longitude: -105.64713259677923 };
  const drSantiagoRamonYCajal = { latitude: 24.029604657091024, longitude: -104.6816341625963 };
  const bicentenarioIndependencia = { latitude: 19.629385072372592, longitude: -99.16383882039686 };
  const toluca = { latitude: 19.257012038833558, longitude: -99.63587500506449 };
  const leon = { latitude: 21.098293136266875, longitude: -101.64994760048603 };


  

  const [selectedMarker, setSelectedMarker] = useState(null);

  const handleMarkerPress = (marker) => {
    setSelectedMarker(marker);
  };

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
        <Marker
          coordinate={trinidad}
          title="Hospital santísima Trinidad"
          onPress={() => handleMarkerPress({
            title: "Hospital Santísima Trinidad",
            direccion: "C. Miguel Blanco 1225, Centro, 44100 Guadalajara, Jal.",
            number: "3336148515",
            redes: "Hospital Santísima Trinidad  (Facebook)",
            image: 'https://photos.wikimapia.org/p/00/03/98/78/82_big.jpg'
          })}
        >
          <Image source={require('../assets/sangreb.png')} style={{ width: 30, height: 30 }}/>
        </Marker>
        <Marker
          coordinate={jardinesDeGuadalupe}
          title="Banco de Sangre Jardines de Guadalupe"
          onPress={() => handleMarkerPress({
            title: "Banco de Sangre Jardines de Guadalupe",
            direccion: "Av Manuel J. Clouthier 669-interior2do Piso, Jardines de Guadalupe, 45030 Zapopan, Jal.",
            number: "3323428196",  
            redes: " Banco de Sangre Jardines de Guadalupe (Facebook)",
            image:'https://img.bookimed.com/clinic_webp/6436e4b1d7617.webp'
          })}
        >
          <Image source={require('../assets/sangreb.png')} style={{ width: 30, height: 30 }}/>
        </Marker>
        <Marker
          coordinate={Corbec}
          title="Corbec Banco de Sangre"
          onPress={() => handleMarkerPress({
            title: "Corbec Banco de Sangre",
            direccion: "Sta. Rita 1031, Chapalita Oriente, 45040 Zapopan, Jal.",
            number: "3318505025",
            redes: "http://corbec.com.mx",
            image: 'https://images.prismic.io/estudios/4466e0cad6e2606f3fad70d6357b80cd5e51981a_unidad-medica-santa-maria-chapalita.jpg?auto=compress,format'
          })}
        >
          {/* Utiliza el ícono de hospital de react-native-vector-icons */}
          <Image source={require('../assets/sangreb.png')} style={{  width: 30, height: 30 }}/>
        </Marker>
        <Marker
          coordinate={cets}
          title="CETS Jalisco"
          onPress={() => handleMarkerPress({
            title: "CETS Jalisco",
            direccion: "Edificio D, Av Zoquipan No. 1050, Zoquipan, 45170 Zapopan, Jal.",
            number: "3310951562",
            redes: "Cets Jalisco (Facebook)",
            image: 'https://img.gruporeforma.com/imagenes/960x640/5/470/4469456.jpg'
          })}
        >
          {/* Utiliza el ícono de hospital de react-native-vector-icons */}
          <Image source={require('../assets/sangreb.png')} style={{  width: 30, height: 30}}/>
        </Marker>
        <Marker
          coordinate={Vidar}
          title="VIDAR BANCO DE SANGRE S. DE R.L. DE C.V."
          onPress={() => handleMarkerPress({
            title: "Vidar Banco de Sangre S. de R.L. de C.V",
           direccion: "Av Terranova 556, Prados Providencia, 44670 Guadalajara, Jal.",
           number: "+523318160058",
            redes: "http://vidarbancodesangre.com",
            image: 'https://emelift.com/uploads/1557860375130058.jpg'
          })}
        >
          {/* Utiliza el ícono de hospital de react-native-vector-icons */}
          <Image source={require('../assets/sangreb.png')} style={{  width: 30, height: 30 }}/>
        </Marker>
        <Marker
          coordinate={ConvidarPatria}
          title="Convidar Patria"
          onPress={() => handleMarkerPress({
            title: "Convidar Patria",
            direccion: "Av. Patria #2056 Colonia, entre Enrique Diaz de León y Lomas Grandes, Lomas de Atemajac, 45178 Guadalajara, Jal.",
            number: "3318160058",
            redes: "http://convidar.com.mx/",
            image: 'https://scontent.fgdl9-1.fna.fbcdn.net/v/t39.30808-6/331972343_720891849516707_4248476751300339861_n.png?_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeEcyM19wRUu3KLdbHuJz3tylJFTIxrAO2iUkVMjGsA7aH_HYcuLh31pht185YgiKtGpG-IT0v334d44zb43xbPN&_nc_ohc=Z49rAIvhSWoAX8Y4XAB&_nc_ht=scontent.fgdl9-1.fna&oh=00_AfAuI3m69K6fsLcPgwxJ43RnMtYyVXsxlJVM6bxy50pDeQ&oe=660D341E'
          })}
        >
          {/* Utiliza el ícono de hospital de react-native-vector-icons */}
          <Image source={require('../assets/sangreb.png')} style={{  width: 30, height: 30}}/>
        </Marker>
        <Marker
          coordinate={Condivar1}
          title="Convidar Hospital Versalles"
          onPress={() => handleMarkerPress({
            title: "Convidar Hospital Versalles",
            direccion: "Av. Prol. Alcalde 2174, Santa Monica, 44220 Guadalajara, Jal.",
            number: "3338549311",
            redes: "https://www.hospitalversalles.com.mx",
            image: 'https://www.hospitalversalles.com.mx/wp-content/uploads/2022/06/directorio.png'
          })}
        >
          {/* Utiliza el ícono de hospital de react-native-vector-icons */}
          <Image source={require('../assets/sangreb.png')} style={{  width: 30, height: 30 }}/>
        </Marker>
        <Marker
          coordinate={margarita}
          title="Santa margarita"
          onPress={() => handleMarkerPress({
            title: "Banco de Sangre Hospital Santa Margarita",
            direccion: "Capilla de Jesús, Garibaldi 880, entre Juan N. Cumplido, C. Cruz Verde y, Col. Jesús, 44200 Guadalajara, Jal.",
            number: "3338253305",
            redes: "http://www.hsmgdl.com/",
            image : 'https://hospitalsantamargarita.com/public/img/home_slider-bg-1.jpg'
          })}
        >
          {/* Utiliza el ícono de hospital de react-native-vector-icons */}
          <Image source={require('../assets/sangreb.png')} style={{ width: 30, height: 30}}/>
        </Marker>
        <Marker
          coordinate={tyb}
          title="Centro De Transfusiones Y Banco De Sangre"
          onPress={() => handleMarkerPress({
            title: "Centro de Transfusiones y Banco de Sangre",
            direccion: "C. Juan Álvarez 945, Artesanos, 44200 Guadalajara, Jal.",
            number: "3338253422",
            redes: "http://transfusionesybancodesangre.com.mx/",
            image: 'https://streetviewpixels-pa.googleapis.com/v1/thumbnail?output=thumbnail&cb_client=maps_sv.tactile.gps&panoid=ID7Fvo6LO1SDazVF9rgbvw&w=588&h=290&thumb=2&yaw=149.2225&pitch=0&quot'
          })}
        >
          {/* Utiliza el ícono de hospital de react-native-vector-icons */}
          <Image source={require('../assets/sangreb.png')} style={{  width: 30, height: 30}}/>
        </Marker>
        <Marker
          coordinate={civilviejo}
          title="Banco de sangre Hospital civil viejo."
          onPress={() => handleMarkerPress({
            title: "Banco de Sangre Hospital Civil Viejo",
            direccion: "C. Belén 799-789, Centro Barranquitas, 44280 Guadalajara, Jal.",
            number: "3339424400",
            redes: "https://www.hcg.gob.mx/hcg/",
            image: 'https://www.gaceta.udg.mx/wp-content/uploads/2020/10/el_hospital_civil_de_guadalajara_fue_el_primero_y_mas_grande_hospital_7.jpg'
          })}
        >
          {/* Utiliza el ícono de hospital de react-native-vector-icons */}
          <Image source={require('../assets/sangreb.png')} style={{  width: 30, height: 30 }}/>
        </Marker>
        <Marker
          coordinate={imms}
          title="IMSS CMN Occidente Banco de Sangre"
          onPress={() => handleMarkerPress({
            title: "IMMS CMN  Occidente Banco de Sangre",
            direccion: "Av. Belisario Domínguez 1000, Independencia Oriente, 44340 Guadalajara, Jal.",
            number: "3336172207",
            redes: "http://www.imss.gob.mx/",
            image: 'https://lh4.googleusercontent.com/-o5kHfdVYUI4/V2h7Mw_NwhI/AAAAAAAAi4U/xT0PPQ3NNhQsbRSan-QsPYIPrJv-u0o-wCJkC/photo.jpg'
          })}
        >
          {/* Utiliza el ícono de hospital de react-native-vector-icons */}
          <Image source={require('../assets/sangreb.png')} style={{  width: 30, height: 30 }}/>
        </Marker>
        <Marker
          coordinate={Condivar2}
          title="Convidar Santa Martha"
          onPress={() => handleMarkerPress({
            title: "Convidar Santa Martha",
            direccion: "C. Juan de Dios Robledo 678, Huerta Baeza, 44730 Guadalajara, Jal.",
            number: "3336442865",
            redes: "http://convidar.com.mx",
            image: 'https://www.tocdoc.com/sites/default/files/consultorios/hospital_santa_martha_guadalajara.png'
          })}
        >
          {/* Utiliza el ícono de hospital de react-native-vector-icons */}
          <Image source={require('../assets/sangreb.png')} style={{ width: 30, height: 30 }}/>
        </Marker>
        <Marker
          coordinate={aguascalientes}
          title="Hospital General Aguascalientes"
          onPress={() => handleMarkerPress({
            title: "Hospital General Aguascalientes",
            direccion: "Av. Universidad 410, San Cayetano, 20010 Aguascalientes, Ags.",
           number: "4499141198",
            redes: "http://www.issste.gob.mx/",
            image: 'https://media.zenfs.com/es/newsweek_en_espanol_491/429c770a9fd62152ffbc7a0321660cea'
          })}
        >
          {/* Utiliza el ícono de hospital de react-native-vector-icons */}
          <Image source={require('../assets/sangreb.png')} style={{ width: 30, height: 30 }}/>
        </Marker>
        <Marker
          coordinate={general5}
          title="ISSSTE Hospital General 5 de Diciembre"
          onPress={() => handleMarkerPress({
            title: "ISSSTE Hospital General 5 de Diciembre",
           direccion: "Calz Independencia 940, Centro Cívico, 21000 Mexicali, B.C.",
            number: "6863048048",
            redes: "http://www.issste.gob.mx/",
            image: 'https://podermx.tv/wp-content/uploads/2018/01/IMG_2327.jpg'
          })}
        >
          {/* Utiliza el ícono de hospital de react-native-vector-icons */}
          <Image source={require('../assets/sangreb.png')} style={{ width: 30, height: 30 }}/>
        </Marker>
        <Marker
          coordinate={fray}
          title="ISSSTE Hospital General Fray Junipero Serra"
          onPress={() => handleMarkerPress({
            title: "ISSSTE Hospital General Fray Junipero Serra",
            direccion: "Av. las Palmas 4141, 20 de Noviembre, 22100 Tijuana, B.C.",
            number: "6646814386",
            redes: "http://www.issste.gob.mx/",
            image: 'https://statics.uniradioinforma.com/2022/05/cc3c8abf6094da2a8521f60708e46222.jpg'
          })}
        >
          {/* Utiliza el ícono de hospital de react-native-vector-icons */}
          <Image source={require('../assets/sangreb.png')} style={{ width: 30, height: 30 }}/>
        </Marker>
        <Marker
          coordinate={lapaz}
          title="Hospital General ISSSTE La Paz"
          onPress={() => handleMarkerPress({
            title: "Hospital General ISSSTE La Paz",
            direccion: "Calle Mar Caribe s/n, El Conchalito, 23090 La Paz, BC",
            number: "6121224888",
            redes: "http://www.issste.gob.mx/",
            image: 'https://www.palabrabcs.com/wp-content/uploads/2020/01/Issste.jpg'
          })}
        >
          {/* Utiliza el ícono de hospital de react-native-vector-icons */}
          <Image source={require('../assets/sangreb.png')} style={{ width: 30, height: 30 }}/>
        </Marker>
        <Marker
          coordinate={ciudadConstitucion}
          title="Clínica Hospital Ciudad Constitución"
          onPress={() => handleMarkerPress({
            title: "Clínica Hospital Ciudad Constitución",
            direccion: "Niños Heroes, Pueblo Nuevo, 23670 Cdad. Constitución, B.C.S.",
            number: "6131322322",
            redes: "http://www.issste.gob.mx/",
            image: 'https://www.canal13mexico.com/wp-content/uploads/2022/11/apoyara-issste-campana-4da1d771-focus-0-0-696-423-87caaa80.jpg'
          })}
        >
          {/* Utiliza el ícono de hospital de react-native-vector-icons */}
          <Image source={require('../assets/sangreb.png')} style={{ width: 30, height: 30 }}/>
        </Marker>
        <Marker
        coordinate={santaRosalía}
        title="Clínica Hospital Santa Rosalía"
        onPress={() => handleMarkerPress({
          title: "Clínica Hospital Santa Rosalía",
          direccion: "Cuauhtémoc, Adán G. Velarde 98, Magisterial, 23920 Santa Rosalía, B.C.S.",
          number: "6151522418",
          redes: "http://www.issste.gob.mx/",
          image: 'https://www.palabrabcs.com/wp-content/uploads/2023/09/Issste-Rosalia.jpg'
        })}
      >
        {/* Utiliza el ícono de hospital de react-native-vector-icons */}
        <Image source={require('../assets/sangreb.png')} style={{ width: 30, height: 30 }}/>
      </Marker>

      <Marker
        coordinate={sanJoseDelCabo}
        title="Clínica Hospital San José del Cabo"
        onPress={() => handleMarkerPress({
          title: "Clínica Hospital San José del Cabo",
          direccion: "Tifon y C. Tifón, C. Retorno Supermanzana del, El Rosarito, 23444 San José del Cabo, B.C.S.",
          number: "6241421600",
          redes: "http://www.issste.gob.mx/",
          image: 'https://cabovision.tv/images/1012/2023/05/18/1684431766.jpg'
        })}
      >
        {/* Utiliza el ícono de hospital de react-native-vector-icons */}
        <Image source={require('../assets/sangreb.png')} style={{ width: 30, height: 30 }}/>
      </Marker>

      <Marker
        coordinate={ciudadDelCarmen}
        title="Clínica Hospital Ciudad del Carmen"
        onPress={() => handleMarkerPress({
          title: "Clínica Hospital Ciudad del Carmen",
          direccion: "Petrolera, 24160 Cdad. del Carmen, Camp.",
          number: "9383825828",
          redes: "http://www.issste.gob.mx/",
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxqe3vV8Sj3Zzwp1YYoMHgz_koHXerboMjxN6JqCNB5A&s'
        })}
      >
        {/* Utiliza el ícono de hospital de react-native-vector-icons */}
        <Image source={require('../assets/sangreb.png')} style={{ width: 30, height: 30 }}/>
      </Marker>

      <Marker
        coordinate={patricioTruebaRegil}
        title="Clínica Hospital Dr. Patricio Trueba Regil"
        onPress={() => handleMarkerPress({
          title: "Clínica Hospital Dr. Patricio Trueba Regil",
          direccion: "C. 7 30, Miramar, 24030 San Francisco de Campeche, Camp.",
          number: "9811051025",
          redes: "http://www.issste.gob.mx/",
          image: 'https://www.yo-local.com/sites/default/files/imagen_negocio/Negocio_1813.JPG'
        })}
      >
        {/* Utiliza el ícono de hospital de react-native-vector-icons */}
        <Image source={require('../assets/sangreb.png')} style={{ width: 30, height: 30 }}/>
      </Marker>

      <Marker
        coordinate={franciscoGalindoChávez}
        title="Hospital General Dr. Fracisco Galindo Chávez"
        onPress={() => handleMarkerPress({
          title: "Hospital General Dr. Fracisco Galindo Chávez",
          direccion: "Donato Guerra S/N, Segundo de Cobián Centro, 27000 Torreón, Coah.a",
          number: "8712850350",
          redes: "http://www.issste.gob.mx/",
          image: 'https://tecolotito.elsiglodetorreon.com.mx/i/2024/02/1775472.jpeg'
        })}
      >
        {/* Utiliza el ícono de hospital de react-native-vector-icons */}
        <Image source={require('../assets/sangreb.png')} style={{ width: 30, height: 30 }}/>
      </Marker>

      <Marker
        coordinate={joséMaríaRodríguez}
        title="Clínica Hospital Dr. José María Rodríguez"
        onPress={() => handleMarkerPress({
          title: "Clínica Hospital Dr. José María Rodríguez",
          direccion: "Francisco Murguía N° 405 esq, Calle Gral. Manuel Pérez Treviño Centro, Zona Centro, 25000 Saltillo, Coah.",
          number: "8444141900",
          redes: "http://www.issste.gob.mx/",
          image: 'https://i0.wp.com/noticiasnrt.com/wp-content/uploads/2024/02/image-149.png?resize=696%2C464&ssl=1'
        })}
      >
          {/* Utiliza el ícono de hospital de react-native-vector-icons */}
          <Image source={require('../assets/sangreb.png')} style={{ width: 30, height: 30 }}/>
        </Marker>
        <Marker
    coordinate={monclova}
    title="Clínica Hospital Monclova"
    onPress={() => handleMarkerPress({
      title: "Clínica Hospital Monclova",
      direccion: "Av. Roble 801, Fraccionamiento La Salle, 25720 Monclova, Coah.",
      number: "8666331826",
      redes: "http://www.issste.gob.mx/",
      image: 'https://tecolotito.elsiglodetorreon.com.mx/i/2023/09/1725230.jpeg'
    })}
  >
    {/* Utiliza el ícono de hospital de react-native-vector-icons */}
    <Image source={require('../assets/sangreb.png')} style={{ width: 30, height: 30 }}/>
  </Marker>

  <Marker
    coordinate={nuevaRosita}
    title="Clínica Hospital Nueva Rosita"
    onPress={() => handleMarkerPress({
      title: "Clínica Hospital Nueva Rosita",
      direccion: "20 de Noviembre 2402-A, Dávila Moncada, 26870 Nueva Rosita, Coah.",
      number: "8616142287",
      redes: "http://www.issste.gob.mx/",
      image: 'https://blobcore.periodicolavoz.com.mx/images/2021/04/18/alma40-1-focus-0-0-696-391.png'
    })}
  >
    {/* Utiliza el ícono de hospital de react-native-vector-icons */}
    <Image source={require('../assets/sangreb.png')} style={{ width: 30, height: 30 }}/>
  </Marker>

  <Marker
    coordinate={piedrasNegras}
    title="Clínica Hospital Piedras Negras"
    onPress={() => handleMarkerPress({
      title: "Clínica Hospital Piedras Negras",
      direccion: "Nava - Piedras Negras, Parque Industrial Piedras Negras, 26070 Piedras Negras, Coah.",
      number: "8781120646",
      redes: "http://www.issste.gob.mx/",
      image: 'https://superchannel12.com/images/publicaciones/605587/image_09-10-22_13-21-13.webp'
    })}
  >
    {/* Utiliza el ícono de hospital de react-native-vector-icons */}
    <Image source={require('../assets/sangreb.png')} style={{ width: 30, height: 30 }}/>
  </Marker>

  <Marker
    coordinate={sanPedroDeLasColonias}
    title="Clínica Hospital San Pedro de las Colonias"
    onPress={() => handleMarkerPress({
      title: "Clínica Hospital San Pedro de las Colonias",
      direccion: "27846, De Los Granados 2, La Quinta, San Pedro, Coah.",
      number: "8727720405",
      redes: "http://www.issste.gob.mx/",
      image: 'https://www.elsoldelalaguna.com.mx/local/vs1emp-issste/ALTERNATES/LANDSCAPE_1140/ISSSTE'
    })}
  >
    {/* Utiliza el ícono de hospital de react-native-vector-icons */}
    <Image source={require('../assets/sangreb.png')} style={{ width: 30, height: 30 }}/>
  </Marker>
  <Marker
  coordinate={colima}
  title="Clínica Hospital Dr. Miguel Angel Trejo Ochoa"
  onPress={() => handleMarkerPress({
    title: "Clínica Hospital Dr. Miguel Angel Trejo Ochoa",
    direccion: "Calle Ignacio Sandoval 867, Lomas de Circunvalación, 28010 Colima, Col.",
    number: "3123124460",
    redes: "http://www.issste.gob.mx/",
    image: 'https://www.afmedios.com/wp-content/uploads/2015/08/af_issstecolima5deagosto2015.jpg'
  })}
>
  {/* Utiliza el ícono de hospital de react-native-vector-icons */}
  <Image source={require('../assets/sangreb.png')} style={{ width: 30, height: 30 }}/>
</Marker>

<Marker
  coordinate={manzanillo}
  title="Clínica Hospital Manzanillo"
  onPress={() => handleMarkerPress({
    title: "Clínica Hospital Manzanillo",
   direccion: "Av. Parotas, Valle de Las Garzas, I, 28219 Manzanillo, Col.",
    number: "3123142379",
    redes: "http://www.issste.gob.mx/",
    image: 'https://www.eloccidental.com.mx/local/xvp7uv-unidad-medica-en-manzanillo.jpg/ALTERNATES/LANDSCAPE_768/Unidad%20m%C3%A9dica%20en%20Manzanillo.jpg'
  })}
>
  {/* Utiliza el ícono de hospital de react-native-vector-icons */}
  <Image source={require('../assets/sangreb.png')} style={{ width: 30, height: 30 }}/>
</Marker>

<Marker
  coordinate={drBelisarioDominguez}
  title="Hospital General Dr. Belisario Domínguez"
  onPress={() => handleMarkerPress({
    title: "Hospital General Dr. Belisario Domínguez",
    direccion: "GTZ, Boulevard Salomón González Blanco #4650, Fracc, Blvrd Lic Salomon Gonzalez Blanco, Las Torres, 29040 Tuxtla Gutiérrez, Chis.",
    number: "9191378578",
    redes: "http://www.issste.gob.mx/",
    image: 'https://areopago.mx/wp-content/uploads/2022/04/hospital.jpg'
  })}
>
  {/* Utiliza el ícono de hospital de react-native-vector-icons */}
  <Image source={require('../assets/sangreb.png')} style={{ width: 30, height: 30 }}/>
</Marker>

<Marker
  coordinate={drRobertoNettelFlores}
  title="Clínica Hospital Dr. Roberto Nettel Flores"
  onPress={() => handleMarkerPress({
    title: "Clínica Hospital Dr. Roberto Nettel Flores",
    direccion: "Av. Tuxtepec y Oaxaca s/n, Francisco Villa, 30740 Tapachula de Córdova y Ordóñez, Chis.",
    number: "9626261927",
    redes: "http://www.issste.gob.mx/",
    image: 'https://contralacorrupcion.mx/wp-content/uploads/2021/06/chiapas-infraestructura-06.jpg'
  })}
>
  {/* Utiliza el ícono de hospital de react-native-vector-icons */}
  <Image source={require('../assets/sangreb.png')} style={{ width: 30, height: 30 }}/>
</Marker>

<Marker
  coordinate={ciudadJuarez}
  title="Hospital General Ciudad Juárez"
  onPress={() => handleMarkerPress({
    title: "Hospital General Ciudad Juárez",
    direccion: "Av. Paseo Triunfo de la República 2404, Partido Escobedo, 32330 Juárez, Chih.",
    number: "6561730700",
    redes: "http://www.issste.gob.mx/",
    image: 'https://diario.mx/jrz/media/uploads/galeria/2022/10/18/20221018114755876-0-1983535.jpg'
  })}
>
  {/* Utiliza el ícono de hospital de react-native-vector-icons */}
  <Image source={require('../assets/sangreb.png')} style={{ width: 30, height: 30 }}/>
</Marker>

<Marker
  coordinate={presidenteLazaroCardenas}
  title="Hospital General Presidente Lázaro Cárdenas"
  onPress={() => handleMarkerPress({
    title: "Hospital General Presidente Lázaro Cárdenas",
    description: "Descripción corta",
    additionalInfo: "Más información",
    redes: "http://www.issste.gob.mx/",
    image: 'https://elpuntero.com.mx/inicio/wp-content/uploads/2022/06/WhatsApp-Image-2022-06-07-at-14.09.25.jpeg'
  })}
>
  {/* Utiliza el ícono de hospital de react-native-vector-icons */}
  <Image source={require('../assets/sangreb.png')} style={{ width: 30, height: 30 }}/>
</Marker>
<Marker
  coordinate={hidalgoDelParral}
  title="Clínica Hospital Hidalgo del Parral"
  onPress={() => handleMarkerPress({
    title: "Clínica Hospital Hidalgo del Parral",
    direccion: "FRANCISCO MIRANDA Y, Rep. de Cuba NO. 8, Hidalgo del Parral, Chih.",
    number: "6275228883",
    redes: "http://www.issste.gob.mx/",
    image: 'https://www.elsoldeparral.com.mx/incoming/w1edez-issste1.jpg/ALTERNATES/LANDSCAPE_400/ISSSTE1.jpg'
  })}
>
  {/* Utiliza el ícono de hospital de react-native-vector-icons */}
  <Image source={require('../assets/sangreb.png')} style={{ width: 30, height: 30 }}/>
</Marker>

<Marker
  coordinate={drSantiagoRamonYCajal}
  title="Hospital General Dr. Santiago Ramón y Cajal"
  onPress={() => handleMarkerPress({
    title: "Hospital General Dr. Santiago Ramón y Cajal",
    direccion: "Predio Canoas s/n, Colonia Obrera, Silvestre Dorador, 34070 Durango, Dgo.",
    number: "6188117513",
    redes: "http://www.issste.gob.mx/",
    image: 'https://tecolotito.elsiglodedurango.com.mx/i/2023/07/1192818.jpeg'
  })}
>
  {/* Utiliza el ícono de hospital de react-native-vector-icons */}
  <Image source={require('../assets/sangreb.png')} style={{ width: 30, height: 30 }}/>
</Marker>
<Marker
  coordinate={bicentenarioIndependencia}
  title="Hospital Regional Bicentenario de la Independencia"
  onPress={() => handleMarkerPress({
    title: "Hospital Regional Bicentenario de la Independencia",
    direccion: "C. Ciruelos 4, Lázaro Cárdenas, 54916 Tultitlán de Mariano Escobedo, Méx.",
    number: "5551409617",
    redes: "http://www.issste.gob.mx/",
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqYB5PFQRh3VZ-cU1XMcoi1eodkdKI_TLXSfE_MZRPhg&s'
  })}
>
  {/* Utiliza el ícono de hospital de react-native-vector-icons */}
  <Image source={require('../assets/sangreb.png')} style={{ width: 30, height: 30 }}/>
</Marker>

<Marker
  coordinate={toluca}
  title="Hospital General Toluca"
  onPress={() => handleMarkerPress({
    title: "Hospital General Toluca",
    direccion: "C. Daniel Espinoza SN, Jesus Jimenez Gallardo, 52167 San Jorge Pueblo Nuevo, Méx.",
    number: "7222174505",
    redes: "http://www.issste.gob.mx/",
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSk6-s6NVGPXhPPzza5wB2zxmvZN8VEhnKGOHlLuTlLYw&s'
  })}
>
  {/* Utiliza el ícono de hospital de react-native-vector-icons */}
  <Image source={require('../assets/sangreb.png')} style={{ width: 30, height: 30 }}/>
</Marker>

<Marker
  coordinate={leon}
  title="Hospital Regional León"
  onPress={() => handleMarkerPress({
    title: "Hospital Regional León",
    direccion: "Av. Pradera 1101, Azteca, 37520 León de los Aldama, Gto.",
    number: "4777119949",
    redes: "http://www.issste.gob.mx/",
    image: 'https://www.noticiasvespertinas.com.mx/doble-via/setthh-issste-3/ALTERNATES/LANDSCAPE_768/ISSSTE%20(3)'
  })}
>
  {/* Utiliza el ícono de hospital de react-native-vector-icons */}
  <Image source={require('../assets/sangreb.png')} style={{ width: 30, height: 30 }}/>
</Marker>


      </MapView>

      <Modal
        visible={selectedMarker !== null}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setSelectedMarker(null)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedMarker && (
              <>
                <View style={styles.imageContainer}>
                  <Image source={{ uri: selectedMarker.image }} style={styles.markerImage} />
                </View>
                <Text style={styles.markerTitle}>{selectedMarker.title}</Text>
                <Text style={styles.des}>{selectedMarker.direccion}</Text>
                <Text style={styles.num}>{selectedMarker.number}</Text>
                <Text style={styles.red}>{selectedMarker.redes}</Text>
                <TouchableOpacity onPress={() => setSelectedMarker(null)} style={styles.buttonStyle}>
                  <Text style={{ color: '#fff', textAlign: 'center', paddingVertical: 10 }}>Cerrar</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 30,
    elevation: 5,
  },
  markerTitle: {
    fontSize: height* 0.027,
    maxWidth: width* 0.65,
    fontFamily:'Quicksand-Bold',
    marginBottom: 10,
  },
  buttonStyle: {
    marginTop: 50,
    backgroundColor:'#ea0000',
    borderRadius: 30,
  },
  imageContainer: {
    alignItems: 'center',
  },
  markerImage: {
    width: width*0.75,
    height: height*0.35,
    borderRadius:20,
    marginBottom: 35,
  },
  des:{
    marginBottom:'3%',
    fontFamily:'Quicksand-Bold',
    fontStyle:'italic',
    fontSize: height* 0.02,
    maxWidth: width* 0.75
  },
  num:{
    marginBottom:'3%',
    fontFamily:'Quicksand-Bold',
    fontSize: height*0.027,
    
  },
  red:{ 
    marginBottom:'5%',
    fontFamily:'Quicksand-Bold',
    fontSize: height*0.017,
    maxWidth: width* 0.75
  },
});

export default Locate;
