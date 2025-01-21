import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Onboarding from "react-native-onboarding-swiper";
import { hp, wp } from "../helper/common";

const Tutorial = () => {
  return (
    <Onboarding
      NextButtonComponent={({ ...props }) => (
        <TouchableOpacity style={styles.nextButton} {...props}>
          <Text style={styles.nextButtonText}>Siguiente</Text>
        </TouchableOpacity>
      )}
      showSkip={false}
      pages={[
        {
          backgroundColor: "#ffd6db",
          image: (
            <Image
              source={require("../assets/logotipo.png")}
              style={{ width: wp(80), height: hp(50), resizeMode: "cover" }}
            />
          ),
          title: "¡Bienvenido a BloodMatch!",
          subtitle: "Puedes avanzar cuando estes listo",
          titleStyles: styles.title,
          subTitleStyles: styles.subtitle,
        },
        {
          backgroundColor: "#a6e4d0",
          image: (
            <Image
              source={require("../images/homeTutorial.png")}
              style={{
                width: wp(60),
                height: hp(60),
                resizeMode: "cover",
                borderRadius: 15,
                marginBottom: -35,
              }}
            />
          ),
          title: "¡Haz Match!!",
          subtitle: (
            <View>
              <Text style={[styles.subtitle, { marginTop: -10 }]}>
                Haz Match deslizando a la derecha
              </Text>
              <Text style={styles.subtitle}>
                Desliza a la izquierda para pasar de persona
              </Text>
            </View>
          ),
          titleStyles: styles.title,
        },
        {
          backgroundColor: "#fff3b5",
          image: (
            <Image
              source={require("../images/chatbotTutorial.png")}
              style={{
                width: wp(65),
                height: hp(50),
                resizeMode: "cover",
                borderRadius: 15,
              }}
            />
          ),
          title: "¿Necesitas Apoyo?",
          subtitle: "Pregunta tus dudas al chatbot",
          titleStyles: styles.title,
          subTitleStyles: styles.subtitle,
        },
        {
          backgroundColor: "#ADD8E6",
          image: (
            <Image
              source={require("../images/mapaTutorial.png")}
              style={{
                width: wp(65),
                height: hp(60),
                resizeMode: "cover",
                borderRadius: 15,
              }}
            />
          ),
          title: "Encuentra un hospital",
          subtitle:
            "El mapa te ayudará a encontrar un hospital para ir a donar",
          titleStyles: styles.title,
          subTitleStyles: styles.subtitle,
        },
        {
          backgroundColor: "#FFEFD5",
          image: (
            <Image
              source={require("../images/perfilTutorial.png")}
              style={{
                width: wp(65),
                height: hp(60),
                resizeMode: "cover",
                borderRadius: 15,
              }}
            />
          ),
          title: "¡Tu perfil aquí!",
          subtitle: "Aquí verás tu información y podrás cambiar tu foto",
          titleStyles: styles.title,
          subTitleStyles: styles.subtitle,
        },
        {
          backgroundColor: "#d6d6fc",
          image: (
            <Image
              source={require("../images/configuracionTutorial.png")}
              style={{
                width: wp(65),
                height: hp(65),
                resizeMode: "cover",
                borderRadius: 15,
                marginBottom: -30,
              }}
            />
          ),
          title: "¡Ajusta cuando quieras!",
          subtitle: "Aquí verás tu información y podrás cambiar tu foto",
          titleStyles: styles.title,
          subTitleStyles: styles.subtitle,
        },
      ]}
      onSkip={() => console.log("Skipped")}
      onDone={() => console.log("Completed")}
    />
  );
};

const styles = StyleSheet.create({
  nextButton: {
    padding: 10,
    backgroundColor: "#d8d8d8",
    borderRadius: 5,
    alignItems: "center",
    marginHorizontal: wp(3),
  },
  nextButtonText: {
    fontSize: 16,
    color: "#000", // Color del texto
    fontWeight: "bold",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#e74c3c",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#000",
    textAlign: "center",
    marginHorizontal: 30,
    marginBottom: 20,
    lineHeight: 22,
  },
});

export default Tutorial;
