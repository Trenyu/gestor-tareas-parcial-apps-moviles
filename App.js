// App.js

// Este archivo configura la navegación principal de la aplicación.
// Acá conectamos las pantallas: Login, Registro, Home y CrearTarea.


import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Importamos las pantallas de la app.
import CreateTaskScreen from "./src/screens/CreateTaskScreen";
import HomeScreen from "./src/screens/HomeScreen";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";

// Creamos el Stack Navigator.
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {/* Pantalla de inicio de sesión */}
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />

        {/* Pantalla de registro */}
        <Stack.Screen
          name="Registro"
          component={RegisterScreen}
          options={{
            title: "Registro",
          }}
        />

        {/* Pantalla principal */}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "Inicio",
            headerBackVisible: false,
          }}
        />

        {/* Pantalla para crear tareas */}
        <Stack.Screen
          name="CrearTarea"
          component={CreateTaskScreen}
          options={{
            title: "Crear tarea",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
