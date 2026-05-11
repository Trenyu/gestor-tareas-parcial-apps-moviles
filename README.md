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
- Actualización manual de la lista de tareas.
- Persistencia de datos usando AsyncStorage.
- Notificación local de prueba desde la pantalla principal.
- Botón nativo para actualizar manualmente la lista de tareas.
- Uso de componentes reutilizables.
- Uso de componentes básicos de React Native como View, Text, TextInput, Button y TouchableOpacity.
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

## Cómo ejecutar la app

1. Clonar el repositorio:

```bash
git clone https://github.com/Trenyu/gestor-tareas-parcial-apps-moviles.git
```

2. Ingresar a la carpeta del proyecto:

```bash
cd gestor-tareas-parcial-apps-moviles
```

3. Instalar las dependencias:

```bash
npm install
```

4. Ejecutar el proyecto con Expo:

```bash
npx expo start
```

5. Abrir la app:

- Presionar `a` para abrirla en un emulador Android.
- O escanear el código QR con Expo Go desde un celular.

## Usuario de prueba

La app permite registrar un usuario desde la pantalla de registro.

Ejemplo:

```text
Usuario: fede
Contraseña: 1234
```

## Video demo

Enlace al video demo:

PEGAR_ACA_LINK_DE_YOUTUBE
