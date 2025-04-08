import React, { useState, useEffect } from "react";
import { Image, View, Modal, Text, TouchableOpacity, Linking, Platform} from 'react-native';
import MapView, { PROVIDER_DEFAULT, Marker } from "react-native-maps";
import * as location from 'expo-location';
import { mapStyle } from '../assets/API/mapStyle';
import hospitals from "../assets/bancosSangre.json";
import { useTranslation } from "react-i18next";
import MapboxGL from "@rnmapbox/maps";

const tokenmapbox = "sk.eyJ1IjoiZGllZ28xMjAzNzg0MyIsImEiOiJjbTkxaDFtdnYwMHdiMnJweXozcHB0MmM1In0.Qtq71L8irixFEi8Lc2K2Cw";

MapboxGL.setAccesToken(tokenmapbox);

const haversineDistance = (coords1, coords2) => {
  const toRad = x => x * Math.PI / 180;
  const lat1 = coords1.latitude;
  const lon1 = coords1.longitude;
  const lat2 = coords2.latitude;
  const lon2 = coords2.longitude;

  const R = 6371; // Radio de la Tierra en km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const Locate = ({ navigation }) => {
  const {t} = useTranslation();

 // Estado para la ubicación actual, inicialmente con valores por defecto
 const [origin, setOrigin] = useState({
    latitude: 20.6596988,
    longitude: -103.3496092,
  });

  const [selectedMarker, setSelectedMarker] = useState(null);
  const [nearbyHospitals, setNearbyHospitals] = useState([]);

  // Obtén la ubicación actual utilizando expo-location
  useEffect(() => {
    async function getLocationPermission() {
      const { status } = await location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission denied');
        return;
      }
      const loc = await location.getCurrentPositionAsync({});
      // Aqui pudes cambiar las coordenadas para ver de un estado en especifico
      const current = {
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude
      };
      setOrigin(current);
    }
    getLocationPermission();
  }, []);

  // Filtra los hospitales que estén a menos de 10 km del usuario
  useEffect(() => {
    if (origin && hospitals && hospitals.length > 0) {
      const thresholdKm = 10; // Ajusta el umbral de distancia según lo necesites
      const filtered = hospitals.filter(hospital => {
        const distance = haversineDistance(origin, {
          latitude: hospital.latitude,
          longitude: hospital.longitude,
        });
        return distance <= thresholdKm;
      });
      setNearbyHospitals(filtered);
    }
  }, [origin]);

  const handleMarkerPress = (marker) => {
    setSelectedMarker(marker);
  };

  // Función para abrir Google Maps
  const openInGoogleMaps = (latitude, longitude) => {
    if (Platform.OS === 'ios') {
      // Abre Apple Maps
      const url = `http://maps.apple.com/?daddr=${latitude},${longitude}`;
      Linking.openURL(url);
    } else {
      // Abre Google Maps (Android)
      const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
      Linking.openURL(url);
    }
  };

  return (
    // <View
    //   className="flex-1"
    // >
    //   <MapView
    //     customMapStyle={mapStyle}
    //     provider={PROVIDER_DEFAULT}
    //     googleMapId="a2f7835530245c97"
    //     className="w-screen h-screen"
    //     region={{
    //       latitude: origin.latitude,
    //       longitude: origin.longitude,
    //       latitudeDelta: 0.03,
    //       longitudeDelta: 0.03,
    //     }}
    //     mapType="standard"
    //     showsUserLocation
    //     showsMyLocationButton
    //     showsPointsOfInterest={false}
    //     showsTraffic={false}
    //     showsBuildings={false}
    //     showsIndoors={false}
    //     showsCompass={false}
    //     showsIndoorLevelPicker={false}
    //     marker={false}
    //   >
    //     {nearbyHospitals.map((hospital, index) => (
    //       <Marker
    //         key={index}
    //         coordinate={{
    //           latitude: hospital.latitude,
    //           longitude: hospital.longitude,
    //         }}
    //         title={hospital.nombre}
    //         onPress={() => handleMarkerPress({
    //           title: hospital.nombre,
    //           direccion: hospital.direccion,
    //           number: hospital.number,
    //           redes: hospital.redes,
    //           image: hospital.image,
    //           latitude: hospital.latitude,
    //           longitude: hospital.longitude
    //         })}
    //       >
    //         <View className="w-9 h-9 bg-transparent">
    //           <Image
    //             source={require('../assets/sangreb.png')}
    //             className="w-full h-full object-contain"
    //           />
    //         </View>
    //       </Marker>
    //     ))}
    //   </MapView>
  
    //   <Modal
    //     visible={selectedMarker !== null}
    //     animationType="slide"
    //     transparent={true}
    //     onRequestClose={() => setSelectedMarker(null)}
    //   >
    //     <View className="flex-1 justify-center items-center bg-black/40">
    //       <View className="w-5/6 bg-white rounded-xl border border-white">
    //         {selectedMarker && (
    //           <>
    //             <View className="flex items-center w-full h-1/2 mb-4">
    //               <Image source={{ uri: selectedMarker.image }} className="w-full h-full rounded-t-xl"/>
    //             </View>
    //             <Text className="text-xl font-bold text-center mb-4">{selectedMarker.title}</Text>
    //             <TouchableOpacity
    //               className="bg-red-600 rounded-xl w-3/4 p-3 mx-auto"
    //               onPress={() => openInGoogleMaps(selectedMarker.latitude, selectedMarker.longitude)}
    //             >
    //               <Text className="text-white text-center">{t("go_to_google_maps")}</Text>
    //             </TouchableOpacity>
    //             <TouchableOpacity onPress={() => setSelectedMarker(null)} className="mt-4 bg-red-600 rounded-xl w-3/4 p-3 mx-auto">
    //               <Text className="text-white text-center">Cerrar</Text>
    //             </TouchableOpacity>
    //           </>
    //         )}
    //       </View>
    //     </View>
    //   </Modal>
    // </View>
    <View style={{ flex: 1 }}>
      <MapboxGL.MapView
        style={{ flex: 1 }}
        logoEnabled={false}
      >
        <MapboxGL.Camera
          centerCoordinate={[origin.longitude, origin.latitude]}
          zoomLevel={14}
        />
        {nearbyHospitals.map((hospital, index) => (
          <MapboxGL.PointAnnotation
            key={index}
            id={`hospital-${index}`}
            coordinate={[hospital.longitude, hospital.latitude]}
            onSelected={() =>
              handleMarkerPress({
                title: hospital.nombre,
                direccion: hospital.direccion,
                number: hospital.number,
                redes: hospital.redes,
                image: hospital.image,
                latitude: hospital.latitude,
                longitude: hospital.longitude,
              })
            }
          >
            <View style={{ width: 36, height: 36, backgroundColor: "transparent" }}>
              <Image
                source={require("../assets/sangreb.png")}
                style={{ width: "100%", height: "100%", resizeMode: "contain" }}
              />
            </View>
          </MapboxGL.PointAnnotation>
        ))}
      </MapboxGL.MapView>

      <Modal
        visible={selectedMarker !== null}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setSelectedMarker(null)}
      >
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.4)" }}>
          <View style={{ width: "80%", backgroundColor: "white", borderRadius: 10, padding: 10 }}>
            {selectedMarker && (
              <>
                <View style={{ width: "100%", height: 200, marginBottom: 10 }}>
                  <Image
                    source={{ uri: selectedMarker.image }}
                    style={{ width: "100%", height: "100%", borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
                  />
                </View>
                <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center", marginBottom: 10 }}>
                  {selectedMarker.title}
                </Text>
                <TouchableOpacity
                  style={{ backgroundColor: "red", borderRadius: 10, padding: 10, alignSelf: "center", width: "70%", marginBottom: 10 }}
                  onPress={() => openInGoogleMaps(selectedMarker.latitude, selectedMarker.longitude)}
                >
                  <Text style={{ color: "white", textAlign: "center" }}>{t("go_to_google_maps")}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ backgroundColor: "red", borderRadius: 10, padding: 10, alignSelf: "center", width: "70%" }}
                  onPress={() => setSelectedMarker(null)}
                >
                  <Text style={{ color: "white", textAlign: "center" }}>Cerrar</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default Locate;
