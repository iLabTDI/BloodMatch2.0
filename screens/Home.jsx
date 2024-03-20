import React, { useState, useContext, useCallback, useRef } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Animated } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import themeContext from "../helper/ThemeCon";
import ListItem from "../components/ListItem";

const TITLES = [
  {//leo
    'user': 'Leonardo',
    'sangre': 'O+',
    'municipio': 'Guadalajara',
    'Edad': 28,
    'descripcion': 'Necesito sangre para una cirugía programada',
    'masInfo': '¡Ayúdame antes del: 5-mayo-2024!'
  }
];

interface TaskInterface {
  user: string;
  sangre: string;
  municipio: string;
  descripcion: string;
  Edad: number;
  masInfo: string;
  index?: number; // make index optional
}

const TASKS: TaskInterface[] = TITLES.map(({user,sangre,municipio,Edad,descripcion,masInfo}, index) => ({user,sangre,municipio,Edad,descripcion,masInfo,index}));

function Home() {
  const [tasks, setTasks] = useState(TASKS);
  const onDismiss = useCallback((task: TaskInterface) => {
    setTasks((tasks) => tasks.filter((item) => item.index !== task.index))
  }, []);

  // Usar context para la modificacion del dark mode y poder intercambiar entre estos JJ
  const teme = useContext(themeContext);

  return (
    <LinearGradient
      colors={['white', teme.background]}
      style={styles.container}
    >
      <StatusBar style="auto" />
      <Text style={styles.title}>Ayuda a: </Text>
      <Animated.View style={styles.Scrollcont}>
        {tasks.map((task, index) =>
          (<ListItem key={index} task={task} onDimiss={onDismiss} />))}
      </Animated.View>
    </LinearGradient>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#a3a3ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 60,
    marginVertical: 20,
    paddingLeft: '3%',
    fontFamily: 'Quicksand-Bold',
  },
  Scrollcont: {
    flex: 1,
    width: '100%',
    height: '100%',
  }
});
