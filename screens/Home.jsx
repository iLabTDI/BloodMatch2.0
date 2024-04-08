import React, { useState, useContext, useCallback } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Animated } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import themeContext from "../helper/ThemeCon";
import ListItem from "../components/ListItem";

const TITLES = [
  {//leo
    'id': '4',
    'user': 'Alejandra',
    'sangre': 'AB-',
    'municipio': 'Tonala, Jalisco',
    'descripcion': 'Me encuentro en una situación desesperada. Mi nombre es Alejandra y estoy embarazada, pero algo ha salido mal. Hay una hemorragia y mi vida, junto con la de mi bebé, está en peligro inminente. Necesito sangre, necesito ayuda. ',
    'image':'https://www.tork.mx/media/f3cjxo4z/500x500.png'
  },
   {
    'id': '3',
    'user': 'Marco',
    'sangre': 'O-',
    'municipio': 'Guadalajara, Jalisco',
    'descripcion': 'Mi nombre es Marco y he sufrido un grave accidente automovilístico. Los médicos dicen que necesito una cirugía de emergencia para sobrevivir. Por favor, si puedes donar sangre . Mi vida depende de ello y de tu generosidad. Ayúdame a volver a abrazar a mi familia y a seguir adelante. Te lo ruego, ven y sé mi esperanza en esta oscuridad.',
    'image':  'https://www.gaceta.udg.mx/wp-content/uploads/2022/05/tp.cucei_ilg-scaled.jpg'
  },
  {
    'id': '2',
    'user': 'Ricardo',
    'sangre': 'B+',
    'municipio': 'Guadalajara, Jalisco',
    'descripcion': 'Soy Ricardo y estoy luchando contra el cáncer. Necesito donaciones de sangre para mi tratamiento recurrente. Si puedes donar sangre. Tu generosidad podría salvar mi vida. Te lo ruego, ven y dona sangre para ayudarme en esta batalla contra el cáncer.',
    'image':'https://upload.wikimedia.org/wikipedia/commons/3/35/RGRV1.jpg',
  },
  {
    'id': '1',
    'user': 'Arturo',
    'sangre': 'AB-',
    'municipio': 'Zapopan, Jalisco',
    'descripcion': 'Soy Arturo y tengo una cirugía programada para el 25 de abril de 2024. Necesito donaciones de sangre para prepararme para este procedimiento. Si puedes donar sangre, tu generosidad marcará la diferencia en mi recuperación. Te lo ruego, dona sangre para ayudarme a enfrentar esta cirugía con esperanza y fortaleza.',
    'image': 'https://emprendedor.com/wp-content/uploads/2022/10/Arturo-Elias-Ayub.jpg',
  }, 
];

interface TaskInterface {
  user: string;
  sangre: string;
  municipio: string;
  descripcion: string;
  Edad: number;
  masInfo: string;
  index?: number; // make index optional
  image: string;
}

const TASKS: TaskInterface[] = TITLES.map(({ user, sangre, municipio, Edad, descripcion, masInfo,image }, index) => ({ user, sangre, municipio, Edad, descripcion, masInfo, index,image }));

function Home() {
  const [tasks, setTasks] = useState(TASKS);
  
  const onDismiss = useCallback((task) => {
    setTasks((tasks) => tasks.filter((item) => item.user !== task.user));
  }, []);

  const moveToNextUser = useCallback(() => {
    // Movemos al siguiente usuario al final del array
    setTasks((tasks) => {
      const nextTasks = [...tasks.slice(1), tasks[0]];
      return nextTasks;
    });
  }, []);

  const theme = useContext(themeContext);

  return (
    <LinearGradient
      colors={[ 'white', theme.background]}
      style={styles.container}
    >
      <StatusBar style="auto" />
      <Text style={styles.title}>Ayuda a: </Text>
      <Animated.View style={styles.Scrollcont}>
        {tasks.map((task, index) => (
          <ListItem key={index} task={task} onDismiss={onDismiss} moveToNextUser={moveToNextUser} />
        ))}
      </Animated.View>
    </LinearGradient>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
