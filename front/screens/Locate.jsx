import React, { useState, useEffect, useRef } from "react";
import {
    View,
    Modal,
    Text,
    TouchableOpacity,
    Linking,
    Platform,
    ActivityIndicator,
    Image,
} from "react-native";
import * as Location from "expo-location";
import hospitals from "../assets/bancosSangre.json";
import { useTranslation } from "react-i18next";
import { WebView } from "react-native-webview";

const leafletHTML = `
<!DOCTYPE html><html><head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>
  <style>html,body,#map{height:100%;margin:0;padding:0}</style>
</head><body>
  <div id="map"></div>
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  <script>
    const map = L.map('map').setView([0,0], 2);
    var sangreb = L.icon({
      iconUrl: 'https://i.imgur.com/c7wdsOU.png',
      iconSize: [38, 41], // Ajusta el tamaño según tus necesidades
    });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
      attribution:'&copy; OpenStreetMap'
    }).addTo(map);

    function handleMsg(e) {
      try {
        const msg = JSON.parse(e.data);
        console.log('📨 recibí mensaje en WebView:', msg);
        if (msg.type === 'origin') {
          const o = msg.payload;
          map.setView([o.latitude, o.longitude], 13);
          L.marker([o.latitude, o.longitude]).addTo(map)
            .bindPopup('Tú estás aquí').openPopup();
        }
        if (msg.type === 'hospitals') {
          msg.payload.forEach(h => {
            L.marker([h.latitude, h.longitude], {icon: sangreb}).addTo(map)
              .on('click', () => {
                window.ReactNativeWebView.postMessage(JSON.stringify({
                  type:'select', 
                  payload: {
                    nombre: h.nombre,
                    direccion: h.direccion,
                    imageUrl: h.image, // Asegúrate de incluir la URL de la imagen
                    latitud: h.latitude,
                    longitud: h.longitude
                  }
                }));
              });
          });
        }
      } catch (err) {
        console.error('⚠️ error procesando mensaje:', err);
      }
    }

    // iOS
    window.addEventListener('message', handleMsg);
    // Android
    document.addEventListener('message', handleMsg);
  </script>
</body></html>`;

export default function Locate() {
    const { t } = useTranslation();
    const [origin, setOrigin] = useState(null);
    const [selected, setSelected] = useState(null);
    const webview = useRef(null);

    const [isWebViewReady, setIsWebViewReady] = useState(false);

    // 1) Pido permisos y guardo origin
    useEffect(() => {
        (async () => {
            const { status } =
                await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") return alert("Permission denied");
            const loc = await Location.getCurrentPositionAsync();
            setOrigin({
                latitude: loc.coords.latitude,
                longitude: loc.coords.longitude,
            });
        })();
    }, []);

    useEffect(() => {
        if (origin && isWebViewReady && webview.current) {
            setTimeout(() => {
                // Enviar ubicación del usuario
                webview.current.postMessage(
                    JSON.stringify({ type: "origin", payload: origin })
                );

                // Filtrar hospitales
                const filtered = hospitals.filter((h) => {
                    const toRad = (x) => (x * Math.PI) / 180;
                    const R = 6371;
                    const dLat = toRad(h.latitude - origin.latitude);
                    const dLon = toRad(h.longitude - origin.longitude);
                    const a =
                        Math.sin(dLat / 2) ** 2 +
                        Math.cos(toRad(origin.latitude)) *
                            Math.cos(toRad(h.latitude)) *
                            Math.sin(dLon / 2) ** 2;
                    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                    return R * c <= 10;
                });

                // Enviar hospitales
                webview.current.postMessage(
                    JSON.stringify({ type: "hospitals", payload: filtered })
                );
            }, 300); // pequeño delay para asegurar setup
        }
    }, [origin, isWebViewReady]);

    const openInMaps = ({ latitud, longitud }) => {
        const url =
            Platform.OS === "ios"
                ? `http://maps.apple.com/?daddr=${latitud},${longitud}`
                : `https://www.google.com/maps/dir/?api=1&destination=${latitud},${longitud}`;
        Linking.openURL(url);
    };

    if (!origin) return <ActivityIndicator style={{ flex: 1 }} size="large" />;

    return (
        <View style={{ flex: 1 }}>
            <WebView
                ref={webview}
                originWhitelist={["*"]}
                source={{ html: leafletHTML }}
                onMessage={(e) => {
                    const msg = JSON.parse(e.nativeEvent.data);
                    if (msg.type === "select") setSelected(msg.payload);
                }}
                onLoadEnd={() => setIsWebViewReady(true)}
                style={{ flex: 1 }}
            />

            <Modal
                visible={!!selected}
                transparent
                animationType="slide"
                onRequestClose={() => setSelected(null)}
            >
                {selected && (
                    <View
                        style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: "rgba(0,0,0,0.4)",
                        }}
                    >
                        <View
                            style={{
                                width: "80%",
                                backgroundColor: "white",
                                borderRadius: 10,
                                padding: 16,
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 18,
                                    fontWeight: "bold",
                                    marginBottom: 8,
                                }}
                            >
                                {selected.nombre}
                            </Text>
                            <View className="flex items-center w-full h-1/2 mb-4">
                                <Image
                                    source={{ uri: selected.imageUrl }}
                                    className="w-full h-full rounded-t-xl"
                                />
                            </View>
                            <TouchableOpacity
                                style={{
                                    backgroundColor: "red",
                                    padding: 12,
                                    borderRadius: 8,
                                    marginBottom: 8,
                                }}
                                onPress={() => {
                                    openInMaps(selected);
                                    setSelected(null);
                                }}
                            >
                                <Text
                                    style={{
                                        color: "white",
                                        textAlign: "center",
                                    }}
                                >
                                    {t("go_to_google_maps")}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ padding: 12, borderRadius: 8 }}
                                onPress={() => setSelected(null)}
                            >
                                <Text style={{ textAlign: "center" }}>
                                    Cerrar
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </Modal>
        </View>
    );
}
