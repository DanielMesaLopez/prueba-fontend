import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserListScreen from "./src/presentation/screens/UserListScreen";
import UserDetailScreen from "./src/presentation/screens/UserDetailScreen";

export type RootStackParamList = {
  UserList: undefined;
  UserDetail: { userId: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="UserList">
        <Stack.Screen
          name="UserList"
          component={UserListScreen}
          options={{ title: "Lista de usuarios" }} // 👈 Aquí cambias el título
        />
        <Stack.Screen
          name="UserDetail"
          component={UserDetailScreen}
          options={{ title: "Detalle del usuario" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
