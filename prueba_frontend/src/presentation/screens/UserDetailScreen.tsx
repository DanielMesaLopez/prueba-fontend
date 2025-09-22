import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useUserStore } from "../../store/userStore";
import Loader from "../components/Loader";

export default function UserDetailScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { users } = useUserStore();
  const { userId } = route.params as { userId: number };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000); // Simula carga de 1 segundo

    return () => clearTimeout(timeout);
  }, []);

  const user = users.find((u) => u.id === userId);

  if (loading) return <Loader />;
  if (!user) return <CenteredText>Usuario no encontrado</CenteredText>;

  return (
    <Container>
      <Card>
        <Avatar
          source={{
            uri: `https://api.dicebear.com/8.x/avataaars/svg?seed=${user.name}`,
          }}
        />
        <Name>{user.name}</Name>
        <Detail>Email: {user.email}</Detail>
        <Detail>Teléfono: {user.phone}</Detail>
        <Detail>
          Dirección: {user.address.street}, {user.address.city}
        </Detail>
        <Detail>Empresa: {user.company.name}</Detail>

        <BackButton onPress={() => navigation.goBack()}>
          <BackButtonText>VOLVER</BackButtonText>
        </BackButton>
      </Card>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #f7f7f7;
  padding: 16px;
`;

const Card = styled.View`
  background-color: white;
  padding: 20px;
  border-radius: 16px;
  width: 100%;
  max-width: 400px;
  elevation: 4;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: 6px;
  align-items: center;
`;

const Avatar = styled.Image`
  width: 120px;
  height: 120px;
  border-radius: 60px;
  margin-bottom: 16px;
  background-color: #eee;
`;

const Name = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 12px;
`;

const Detail = styled.Text`
  font-size: 16px;
  margin-bottom: 6px;
  color: #333;
`;

const BackButton = styled.TouchableOpacity`
  background-color: #007aff;
  padding: 10px;
  margin-top: 20px;
  border-radius: 12px;
  width: 100%;
`;

const BackButtonText = styled.Text`
  color: white;
  text-align: center;
  font-weight: bold;
`;

const CenteredText = styled.Text`
  text-align: center;
  margin-top: 20px;
`;
