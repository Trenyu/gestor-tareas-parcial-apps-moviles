// src/screens/LoginScreen.js

// Pantalla de Login.
// Permite ingresar usuario y contraseña.
// Valida esos datos contra el usuario guardado en AsyncStorage.

import { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, View } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import CustomButton from "../components/CustomButton";
import { USER_KEY } from "../storage/storageKeys";

export default function LoginScreen({ navigation }) {
  // Estados para guardar lo que escribe el usuario.
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Función que se ejecuta al tocar "Ingresar".
  async function handleLogin() {
    // Validamos que no estén vacíos.
    if (!username.trim() || !password.trim()) {
      Alert.alert("Error", "Ingresá usuario y contraseña.");
      return;
    }

    // Buscamos el usuario guardado en AsyncStorage.
    const storedUser = await AsyncStorage.getItem(USER_KEY);

    // Si no existe usuario registrado, avisamos.
    if (!storedUser) {
      Alert.alert("Error", "No hay ningún usuario registrado.");
      return;
    }

    // Convertimos el texto guardado a objeto JavaScript.
    const user = JSON.parse(storedUser);

    // Comparamos usuario y contraseña ingresados.
    if (user.username === username && user.password === password) {
      // Si los datos son correctos, vamos al Home.
      // Usamos replace para que no se pueda volver al Login con "atrás".
      navigation.replace("Home");
    } else {
      Alert.alert("Error", "Usuario o contraseña incorrectos.");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestor de Tareas</Text>
      <Text style={styles.subtitle}>Iniciar sesión</Text>

      <TextInput
        style={styles.input}
        placeholder="Usuario"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <CustomButton title="Ingresar" onPress={handleLogin} />

      <CustomButton
        title="Crear cuenta"
        type="secondary"
        onPress={() => navigation.navigate("Registro")}
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
