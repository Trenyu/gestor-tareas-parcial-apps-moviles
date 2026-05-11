# Gestor de Tareas - Parcial 1 Aplicaciones Móviles

## Opción elegida

Gestor de tareas.

## Descripción

Aplicación móvil desarrollada con React Native y Expo para gestionar tareas simples.

La app permite registrar un usuario, iniciar sesión, crear tareas, visualizar una lista de tareas, eliminar tareas y probar una notificación local.

## Funcionalidades implementadas

- Registro local de usuario.
- Inicio de sesión con validación de usuario y contraseña.
- Navegación con Stack Navigation.
- Pantalla principal con listado de tareas.
- Alta de nuevas tareas.
- Eliminación de tareas.
- Persistencia de datos usando AsyncStorage.
- Notificación local de prueba.
- Uso de componentes reutilizables.
- Estilos aplicados con StyleSheet.

## Tecnologías utilizadas

- React Native
- Expo
- React Navigation
- AsyncStorage
- Expo Notifications

## Estructura del proyecto

```text
src/
├── components/
│   ├── CustomButton.js
│   └── TaskItem.js
│
├── screens/
│   ├── LoginScreen.js
│   ├── RegisterScreen.js
│   ├── HomeScreen.js
│   └── CreateTaskScreen.js
│
└── storage/
    └── storageKeys.js
```
