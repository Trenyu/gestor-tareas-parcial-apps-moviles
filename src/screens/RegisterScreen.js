// src/screens/RegisterScreen.js

// Pantalla de Registro.
// Permite crear un usuario local con usuario y contraseña.
// Los datos se guardan en AsyncStorage.

import { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, View } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import CustomButton from "../components/CustomButton";
import { USER_KEY } from "../storage/storageKeys";

export default function RegisterScreen({ navigation }) {
  // Estados para guardar lo que escribe el usuario.
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Función que se ejecuta al tocar "Registrarme".
  async function handleRegister() {
    // Validamos que los campos no estén vacíos.
    if (!username.trim() || !password.trim()) {
      Alert.alert("Error", "Completá usuario y contraseña.");
      return;
    }

    // Creamos un objeto con los datos del usuario.
    const newUser = {
      username: username,
      password: password,
    };

    // Guardamos el usuario en AsyncStorage.
    // Como AsyncStorage guarda texto, convertimos el objeto a JSON.
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(newUser));

    Alert.alert("Registro exitoso", "Ya podés iniciar sesión.");

    // Volvemos al Login para que el usuario pueda ingresar.
    navigation.navigate("Login");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>
      <Text style={styles.subtitle}>Crear usuario local</Text>

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

      <CustomButton title="Registrarme" onPress={handleRegister} />

      <CustomButton
        title="Volver al login"
        type="secondary"
        onPress={() => navigation.navigate("Login")}
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
