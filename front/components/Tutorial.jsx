import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { hp, wp } from "../helper/common";

export default function CustomOnboarding() {
  const [currentPage, setCurrentPage] = useState(0);

  const pages = [
    {
      backgroundColor: "#ffd6db",
      image: require("../assets/logotipo.png"),
      dimensions: { width: wp(90), height: hp(50) },
      color: "#c20600",
      title: "¡Bienvenido a BloodMatch!",
      subtitle: "Puedes avanzar cuando estés listo",
    },
    {
      backgroundColor: "#a6e4d0",
      image: require("../images/homeTutorial.png"),
      dimensions: { width: wp(58), height: hp(60) },
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
      dimensions: { width: wp(80), height: hp(60) },
      color: "#e46f15",
      title: "¿Necesitas Apoyo?",
      subtitle: "Pregunta tus dudas al chatbot",
    },
    {
      backgroundColor: "#ADD8E6",
      image: require("../images/mapaTutorial.png"),
      dimensions: { width: wp(65), height: hp(60) },
      color: "#1d2d7b",
      title: "Encuentra un hospital",
      subtitle: "El mapa te ayudará a encontrar un hospital para ir a donar",
    },
    {
      backgroundColor: "#FFEFD5",
      image: require("../images/perfilTutorial.png"),
      dimensions: { width: wp(70), height: hp(65) },
      color: "#c0a105",
      title: "¡Tu perfil aquí!",
      subtitle: "Aquí verás tu información y podrás cambiar tu foto",
    },
    {
      backgroundColor: "#e6e6fd",
      image: require("../images/configuracionTutorial.png"),
      dimensions: { width: wp(65), height: hp(65) },
      color: "#69379f",
      title: "¡Ajusta cuando quieras!",
      subtitle: "Aquí verás tu información y podrás cambiar tu foto",
    },
  ];

  const goToNextPage = () => {
    if (currentPage < pages.length - 1) setCurrentPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const goToHome = () => console.log("Ir al screen Home");

  const renderImage = () => {
    const { image, dimensions } = pages[currentPage];
    const style = currentPage === 0 ? styles.logo : styles.image;

    return <Image source={image} style={[style, dimensions]} />;
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: pages[currentPage].backgroundColor },
      ]}
    >
      {renderImage()}
      <Text style={[styles.title, { color: pages[currentPage].color }]}>
        {pages[currentPage].title}
      </Text>
      <Text style={styles.subtitle}>{pages[currentPage].subtitle}</Text>

      {/* Barra inferior */}
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
          onPress={currentPage === pages.length - 1 ? goToHome : goToNextPage}
        >
          <Text style={styles.buttonText}>
            {currentPage === pages.length - 1 ? "Finalizado" : "Siguiente"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
