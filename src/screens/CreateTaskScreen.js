// src/screens/CreateTaskScreen.js

// Pantalla para crear una nueva tarea.
// Guarda la tarea en AsyncStorage.
// También programa una notificación local simple.

import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TextInput, View } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";

import CustomButton from "../components/CustomButton";
import { TASKS_KEY } from "../storage/storageKeys";

export default function CreateTaskScreen({ navigation }) {
  // Estado para guardar el título que escribe el usuario.
  const [title, setTitle] = useState("");

  /*
    Cuando se carga la pantalla, pedimos permiso para mostrar notificaciones.
    En Android suele funcionar directo, pero igual es buena práctica pedirlo.
  */
  useEffect(() => {
    requestNotificationPermissions();
  }, []);

  // Solicita permisos para enviar notificaciones locales.
  async function requestNotificationPermissions() {
    const { status } = await Notifications.requestPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permiso requerido",
        "Para recibir recordatorios, habilitá las notificaciones.",
      );
    }
  }

  // Programa una notificación local a los 5 segundos.
  async function scheduleTaskNotification(taskTitle) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Nueva tarea creada",
        body: `Recordatorio: ${taskTitle}`,
      },
      trigger: {
        seconds: 5,
      },
    });
  }

  // Guarda la tarea nueva.
  async function saveTask() {
    // Validamos que el campo no esté vacío.
    if (!title.trim()) {
      Alert.alert("Error", "Ingresá el título de la tarea.");
      return;
    }

    try {
      // Buscamos las tareas ya guardadas.
      const storedTasks = await AsyncStorage.getItem(TASKS_KEY);

      // Si hay tareas guardadas, las convertimos a array.
      // Si no hay, arrancamos con un array vacío.
      const currentTasks = storedTasks ? JSON.parse(storedTasks) : [];

      // Creamos una nueva tarea.
      const newTask = {
        id: Date.now().toString(),
        title: title,
        createdAt: new Date().toLocaleDateString(),
      };

      // Agregamos la nueva tarea a la lista anterior.
      const updatedTasks = [...currentTasks, newTask];

      // Guardamos la lista actualizada en AsyncStorage.
      await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(updatedTasks));

      /*
      Intentamos programar la notificación.
      Si Expo Go tiene alguna limitación, no dejamos que eso rompa la app.
    */
      //try {
      //  await scheduleTaskNotification(title);
      // } catch (notificationError) {
      //  console.log("No se pudo programar la notificación:", notificationError);
      // }

      Alert.alert("Tarea guardada", "La tarea fue creada correctamente.");

      // Volvemos al Home.
      navigation.navigate("Home");
    } catch (error) {
      console.log("Error al guardar la tarea:", error);
      Alert.alert("Error", "No se pudo guardar la tarea.");
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nueva tarea</Text>
      <Text style={styles.subtitle}>Cargá una tarea pendiente</Text>

      <TextInput
        style={styles.input}
        placeholder="Ejemplo: Estudiar React Native"
        value={title}
        onChangeText={setTitle}
      />

      <CustomButton title="Guardar tarea" onPress={saveTask} />

      <CustomButton
        title="Cancelar"
        type="secondary"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#F4F6F8",
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#1F2937",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 24,
    color: "#6B7280",
    textAlign: "center",
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    padding: 14,
    marginBottom: 14,
    fontSize: 16,
  },
});
