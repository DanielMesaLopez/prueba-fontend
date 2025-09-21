import React, { useEffect } from "react";
import {
  FlatList,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  View,
  TextInput,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/types";
import { useUserStore } from "../../store/userStore";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "UserList">;

export default function UserListScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { users, loading, fetchAll, setSearch, loadMore, hasMore, search } = useUserStore();

  useEffect(() => {
    fetchAll(true);
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Buscar por nombre o email"
        value={search}
        onChangeText={setSearch}
        style={styles.searchInput}
      />

      {loading && users.length === 0 ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={users}
          keyExtractor={(item) => item.id.toString()}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={hasMore && loading ? <ActivityIndicator /> : null}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("UserDetail", { userId: item.id })}
              style={styles.userItem}
            >
              <Text style={styles.userName}>{item.name}</Text>
              <Text>{item.email}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    padding: 8,
    marginBottom: 16,
  },
  userItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
  },
});