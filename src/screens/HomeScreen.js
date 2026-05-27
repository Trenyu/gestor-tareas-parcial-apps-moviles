// src/screens/HomeScreen.js

// Pantalla principal de la app.
// Muestra la lista de tareas guardadas.
// Permite ir a la pantalla de creación de tareas.
// También permite eliminar tareas, cerrar sesión y probar una notificación local.

import { useEffect, useState } from "react";
import {Button, FlatList, StyleSheet, Text, View } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";

import CustomButton from "../components/CustomButton";
import TaskItem from "../components/TaskItem";
import { TASKS_KEY } from "../storage/storageKeys";



export default function HomeScreen({ navigation }) {
  // Estado donde guardamos la lista de tareas.
  const [tasks, setTasks] = useState([]);

  /*
    useEffect se ejecuta cuando se carga la pantalla.

    Además, usamos navigation.addListener("focus") para volver a cargar
    las tareas cada vez que el usuario vuelve al Home desde otra pantalla.
  */
  useEffect(() => {
    loadTasks();

    const unsubscribe = navigation.addListener("focus", () => {
      loadTasks();
    });

    return unsubscribe;
  }, [navigation]);

  // Carga las tareas guardadas en AsyncStorage.
  async function loadTasks() {
    const storedTasks = await AsyncStorage.getItem(TASKS_KEY);

    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    } else {
      setTasks([]);
    }
  }

  // Elimina una tarea por su ID.
  async function deleteTask(id) {
    const updatedTasks = tasks.filter((task) => task.id !== id);

    // Actualizamos el estado para refrescar la pantalla.
    setTasks(updatedTasks);

    // Guardamos la nueva lista en AsyncStorage.
    await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(updatedTasks));
  }

 
  // Cierra la sesión y vuelve al Login.
  function logout() {
    navigation.replace("Login");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mis tareas</Text>

      <CustomButton
        title="Agregar tarea"
        onPress={() => navigation.navigate("CrearTarea")}
      />

      
      <View style={styles.nativeButtonContainer}>
        <Button title="Actualizar lista" onPress={loadTasks} />
      </View>

      {tasks.length === 0 ? (
        <Text style={styles.emptyText}>Todavía no hay tareas cargadas.</Text>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TaskItem task={item} onDelete={deleteTask} />
          )}
          style={styles.list}
        />
      )}

      <CustomButton title="Cerrar sesión" type="secondary" onPress={logout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#F4F6F8",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#1F2937",
    textAlign: "center",
  },
  emptyText: {
    textAlign: "center",
    color: "#6B7280",
    marginTop: 30,
    fontSize: 16,
  },
  list: {
    marginTop: 20,
    marginBottom: 20,
  },
  nativeButtonContainer: {
    marginBottom: 16,
  },
});
