// src/screens/CreateTaskScreen.js

// Pantalla para crear una nueva tarea.
// Guarda la tarea en AsyncStorage.
// Permite programar una notificación local para una fecha y hora específica.

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";

import CustomButton from "../components/CustomButton";
import { TASKS_KEY } from "../storage/storageKeys";

// Configuración para que la notificación se vea incluso si la app está abierta.
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function CreateTaskScreen({ navigation }) {
  // Estado para guardar el título que escribe el usuario.
  const [title, setTitle] = useState("");

  // Estado para guardar la fecha del recordatorio.
  // Formato esperado: YYYY-MM-DD
  const [reminderDate, setReminderDate] = useState("");

  // Estado para guardar la hora del recordatorio.
  // Formato esperado: HH:mm
  const [reminderTime, setReminderTime] = useState("");

  useEffect(() => {
    requestNotificationPermissions();
  }, []);

  // Solicita permisos para enviar notificaciones locales.
  async function requestNotificationPermissions() {
    const { status } = await Notifications.requestPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permiso requerido",
        "Para recibir recordatorios, habilitá las notificaciones."
      );
    }
  }

  // Valida que la fecha y hora tengan un formato correcto.
  function buildReminderDate() {
    // Ejemplo esperado:
    // reminderDate = "2026-05-28"
    // reminderTime = "16:30"

      const cleanDate = reminderDate.trim();
      const cleanTime = reminderTime.trim();

      const dateTimeText = `${cleanDate}T${cleanTime}:00`;
      const selectedDate = new Date(dateTimeText);
    // Validamos que JavaScript haya podido crear una fecha válida.
    if (isNaN(selectedDate.getTime())) {
    return null;
  }

  return selectedDate;
}

  // Programa una notificación local para una fecha y hora específica.
  async function scheduleTaskNotification(taskTitle, selectedDate) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Recordatorio de tarea",
      body: `Tenés pendiente: ${taskTitle}`,
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DATE,
      date: selectedDate,
    },
  });
}

  // Guarda la tarea nueva.
  async function saveTask() {
    if (!title.trim()) {
      Alert.alert("Error", "Ingresá el título de la tarea.");
      return;
    }

    if (!reminderDate.trim() || !reminderTime.trim()) {
      Alert.alert(
        "Error",
        "Ingresá la fecha y hora del recordatorio."
      );
      return;
    }

    const selectedDate = buildReminderDate();

    if (!selectedDate) {
      Alert.alert(
        "Error",
        "La fecha u hora no tienen un formato válido. Usá fecha YYYY-MM-DD y hora HH:mm."
      );
      return;
    }

    const now = new Date();

    if (selectedDate <= now) {
      Alert.alert(
        "Error",
        "La fecha y hora del recordatorio deben ser posteriores al momento actual."
      );
      return;
    }

    try {
      const storedTasks = await AsyncStorage.getItem(TASKS_KEY);
      const currentTasks = storedTasks ? JSON.parse(storedTasks) : [];

      const newTask = {
        id: Date.now().toString(),
        title: title,
        createdAt: new Date().toLocaleDateString(),
        reminderDate: reminderDate,
        reminderTime: reminderTime,
      };

      const updatedTasks = [...currentTasks, newTask];

      await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(updatedTasks));

      await scheduleTaskNotification(title, selectedDate);

      Alert.alert(
        "Tarea guardada",
        "La tarea fue creada y el recordatorio quedó programado."
      );

      navigation.navigate("Home");
    } catch (error) {
      console.log("Error al guardar la tarea:", error);
      Alert.alert("Error", "No se pudo guardar la tarea.");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nueva tarea</Text>
      <Text style={styles.subtitle}>
        Cargá una tarea y programá un recordatorio
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Ejemplo: Estudiar React Native"
        placeholderTextColor="#6B7280"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={styles.input}
        placeholder="Fecha del recordatorio: 2026-05-28"
        placeholderTextColor="#6B7280"
        value={reminderDate}
        onChangeText={setReminderDate}
      />

      <TextInput
        style={styles.input}
        placeholder="Hora del recordatorio: 16:30"
        placeholderTextColor="#6B7280"
        value={reminderTime}
        onChangeText={setReminderTime}
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
    color: "#111827",
    fontWeight: "500",
  },
});