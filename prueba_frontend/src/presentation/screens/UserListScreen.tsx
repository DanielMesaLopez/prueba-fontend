import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/types";
import { useUserStore } from "../../store/userStore";
import UserCard from "../components/UserCard";
import Loader from "../components/Loader";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "UserList">;

export default function UserListScreen() {
  const [showLoader, setShowLoader] = useState(true);
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

  // tiempo de ejecucion del loader
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowLoader(false);
    }, 3000); // 3 segundos

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
    color: #666;
    font-style: italic;
  `;

  if (loading || showLoader) return <Loader />;

  return (
    <Container>
      <SearchInput
        placeholder="Buscar por nombre o email"
        value={search}
        onChangeText={(text: string) => setSearch(text)}
      />

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

      {users.length > 0 && (
        <PaginationContainer>
          {page > 1 && (
            <PaginationButton onPress={loadPrevious}>
              <PaginationText>Anterior</PaginationText>
            </PaginationButton>
          )}

          <PageIndicator>Página {page}</PageIndicator>

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

const Container = styled.View`
  flex: 1;
  background-color: #f5f5f5;
  padding: 16px;
`;

const SearchInput = styled.TextInput`
  background-color: white;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
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

const PageIndicator = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;
