// src/components/TaskItem.js

// Este componente representa una tarea dentro de la lista.
// Recibe la tarea y una función para eliminarla.

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function TaskItem({ task, onDelete }) {
  return (
    <View style={styles.taskItem}>
      <View>
        <Text style={styles.taskTitle}>{task.title}</Text>
        <Text style={styles.taskDate}>Creada: {task.createdAt}</Text>
      </View>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => onDelete(task.id)}
      >
        <Text style={styles.deleteButtonText}>Eliminar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  taskItem: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 4,
  },
  taskDate: {
    color: "#6B7280",
    marginBottom: 12,
  },
  deleteButton: {
    backgroundColor: "#DC2626",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  deleteButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});
