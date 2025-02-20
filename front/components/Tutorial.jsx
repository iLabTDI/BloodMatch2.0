import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
  Dimensions,
} from "react-native";
import { hp, wp } from "../helper/common";

export default function Tutorial({ onClose }) {
  const [currentPage, setCurrentPage] = useState(0);
  const translateX = useRef(new Animated.Value(0)).current;

  const screenWidth = Dimensions.get("window").width;

  const pages = [
    {
      backgroundColor: "#ffd6db",
      image: require("../assets/logotipo.png"),
      dimensions: { width: wp(90), height: hp(50) },
      color: "#c3251f",
      title: "¡Bienvenido a BloodMatch!",
      subtitle: "Puedes avanzar cuando estés listo",
    },
    {
      backgroundColor: "#a6e4d0",
      image: require("../images/homeTutorial.png"),
      dimensions: { width: wp(48), height: hp(50) },
      color: "#0f7448",
      title: "¡Haz Match!",
      subtitle: (
        <View>
          <Text style={styles.subtitle}>Haz Match deslizando a la derecha</Text>
          <Text style={styles.subtitle}>
            Desliza a la izquierda para pasar de persona
          </Text>
        </View>
      ),
    },
    {
      backgroundColor: "#fff3b5",
      image: require("../images/chatbotTutorial.png"),
      dimensions: { width: wp(75), height: hp(55) },
      color: "#e46f15",
      title: "¿Necesitas Apoyo?",
      subtitle: "Pregunta tus dudas al chatbot",
    },
    {
      backgroundColor: "#ADD8E6",
      image: require("../images/mapaTutorial.png"),
      dimensions: { width: wp(60), height: hp(55) },
      color: "#1d2d7b",
      title: "Encuentra un hospital",
      subtitle: "El mapa te ayudará a encontrar un hospital para ir a donar",
    },
    {
      backgroundColor: "#FFEFD5",
      image: require("../images/perfilTutorial.png"),
      dimensions: { width: wp(60), height: hp(55) },
      color: "#c0a105",
      title: "¡Tu perfil aquí!",
      subtitle: "Aquí verás tu información y podrás cambiar tu foto",
    },
    {
      backgroundColor: "#e6e6fd",
      image: require("../images/configuracionTutorial.png"),
      dimensions: { width: wp(55), height: hp(55) },
      color: "#69379f",
      title: "¡Ajusta cuando quieras!",
      subtitle: "Personaliza la aplicación como gustes",
    },
  ];

  const goToNextPage = () => {
    if (currentPage < pages.length - 1) {
      Animated.timing(translateX, {
        toValue: -(currentPage + 1) * screenWidth, // Mueve a la siguiente página
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setCurrentPage(currentPage + 1);
      });
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 0) {
      Animated.timing(translateX, {
        toValue: -(currentPage - 1) * screenWidth, // Mueve a la página anterior
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setCurrentPage(currentPage - 1);
      });
    }
  };

  const renderPages = () => {
    return (
      <Animated.View
        style={{
          flexDirection: "row",
          width: screenWidth * pages.length,
          transform: [{ translateX }],
        }}
      >
        {pages.map((page, index) => (
          <View
            key={index}
            style={[
              styles.container,
              {
                backgroundColor: page.backgroundColor,
                width: screenWidth, // Asegura que cada página ocupe toda la pantalla
              },
            ]}
          >
            {index === 0 ? (
              <Image
                source={page.image}
                style={[styles.logo, page.dimensions]}
              />
            ) : (
              <Image
                source={page.image}
                style={[styles.image, page.dimensions]}
              />
            )}

            <Text style={[styles.title, { color: page.color }]}>
              {page.title}
            </Text>

            {typeof page.subtitle === "string" ? (
              <Text style={styles.subtitle}>{page.subtitle}</Text>
            ) : (
              page.subtitle
            )}
          </View>
        ))}
      </Animated.View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      {renderPages()}
      <View style={styles.bottomBar}>
        {currentPage > 0 && (
          <TouchableOpacity style={styles.button} onPress={goToPreviousPage}>
            <Text style={styles.buttonText}>Atrás</Text>
          </TouchableOpacity>
        )}
        <Text style={styles.pageIndicator}>
          {currentPage + 1}/{pages.length}
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={currentPage === pages.length - 1 ? onClose : goToNextPage}
        >
          <Text style={styles.buttonText}>
            {currentPage === pages.length - 1 ? "Finalizar" : "Siguiente"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: hp(100),
  },
  image: {
    marginBottom: 20,
    resizeMode: "cover",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logo: {
    marginBottom: 20,
    resizeMode: "cover",
    borderRadius: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 0.3,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  bottomBar: {
    position: "absolute",
    bottom: 30,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: "#d90a03",
    padding: 10,
    borderRadius: 5,
    minWidth: 80,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  pageIndicator: {
    fontSize: 16,
    color: "#000",
    fontWeight: "bold",
    alignSelf: "center",
  },
});