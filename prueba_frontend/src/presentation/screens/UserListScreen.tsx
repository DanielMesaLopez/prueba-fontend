import React, { useEffect, useState } from "react";
import { FlatList, View, Text } from "react-native";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/types";
import { useUserStore } from "../../store/userStore";
import UserCard from "../components/UserCard";
import Loader from "../components/Loader";
import DarkModeToggle from "../components/DarkModeToggle";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "UserList">;

export default function UserListScreen() {
  const [showLoader, setShowLoader] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const navigation = useNavigation<NavigationProp>();
  const {
    users,
    fetchAll,
    search,
    setSearch,
    hasMore,
    loadMore,
    page,
    loadPrevious,
    loading,
  } = useUserStore();

  // loader inicial
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowLoader(false);
    }, 3000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    fetchAll(true);
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  const FinalPageText = styled.Text`
    font-size: 14px;
    color: ${darkMode ? "#aaa" : "#666"};
    font-style: italic;
  `;

  if (loading || showLoader) return <Loader />;

  return (
    <Container darkMode={darkMode}>
      {/* Header con buscador + toggle */}
      <Header>
        <SearchInput
          placeholder="Buscar por nombre o email"
          placeholderTextColor={darkMode ? "#ccc" : "#999"}
          value={search}
          onChangeText={(text: string) => setSearch(text)}
          darkMode={darkMode}
        />
        <DarkModeToggle onToggle={setDarkMode} />
      </Header>

      {/* Lista */}
      <FlatList
        data={filteredUsers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <UserCard
            user={item}
            onPressDetail={() =>
              navigation.navigate("UserDetail", { userId: item.id })
            }
          />
        )}
      />

      {/* Paginación */}
      {users.length > 0 && (
        <PaginationContainer>
          {page > 1 && (
            <PaginationButton onPress={loadPrevious}>
              <PaginationText>Anterior</PaginationText>
            </PaginationButton>
          )}

          <PageIndicator darkMode={darkMode}>Página {page}</PageIndicator>

          {hasMore ? (
            <PaginationButton onPress={loadMore}>
              <PaginationText>Siguiente</PaginationText>
            </PaginationButton>
          ) : (
            <FinalPageText>Última página</FinalPageText>
          )}
        </PaginationContainer>
      )}
    </Container>
  );
}

const Container = styled.View<{ darkMode: boolean }>`
  flex: 1;
  background-color: ${(props: { darkMode: any }) =>
    props.darkMode ? "#121212" : "#f5f5f5"};
  padding: 16px;
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const SearchInput = styled.TextInput<{ darkMode: boolean }>`
  background-color: ${(props: { darkMode: any }) =>
    props.darkMode ? "#222" : "white"};
  color: ${(props: { darkMode: any }) => (props.darkMode ? "white" : "black")};
  flex: 1;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid
    ${(props: { darkMode: any }) => (props.darkMode ? "#444" : "#ddd")};
  margin-right: 10px;
`;

const PaginationContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  gap: 10px;
`;

const PaginationButton = styled.TouchableOpacity<{ disabled?: boolean }>`
  background-color: ${(props: { disabled?: boolean }) =>
    props.disabled ? "#ccc" : "#007aff"};
  padding: 8px 14px;
  border-radius: 8px;
`;

const PaginationText = styled.Text`
  color: white;
  font-weight: bold;
`;

const PageIndicator = styled.Text<{ darkMode: boolean }>`
  font-size: 16px;
  font-weight: bold;
  color: ${(props: { darkMode: any }) => (props.darkMode ? "white" : "black")};
`;
