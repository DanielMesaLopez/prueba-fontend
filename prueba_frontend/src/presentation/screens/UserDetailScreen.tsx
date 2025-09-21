import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useUserStore } from "../../store/userStore";

export default function UserDetailScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { users } = useUserStore();
  const { userId } = route.params as { userId: number };

  const user = users.find((u) => u.id === userId);

  if (!user) return <Text>Usuario no encontrado</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{user.name}</Text>
      <Text>Email: {user.email}</Text>
      <Text>Teléfono: {user.phone}</Text>
      <Text>Dirección: {user.address.street}, {user.address.city}</Text>
      <Text>Empresa: {user.company.name}</Text>
      <Button title="Volver" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
});