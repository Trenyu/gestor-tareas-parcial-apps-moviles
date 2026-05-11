// src/components/CustomButton.js

// Este componente representa un botón reutilizable.
// Lo usamos en varias pantallas para no repetir código.

import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function CustomButton({ title, onPress, type = "primary" }) {
  return (
    <TouchableOpacity
      style={[styles.button, type === "secondary" && styles.secondaryButton]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.buttonText,
          type === "secondary" && styles.secondaryButtonText,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#2563EB",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 12,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  secondaryButton: {
    backgroundColor: "#E5E7EB",
  },
  secondaryButtonText: {
    color: "#1F2937",
  },
});
