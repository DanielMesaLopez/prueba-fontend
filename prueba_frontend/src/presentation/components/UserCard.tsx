import React from "react";
import styled from "styled-components/native";
import { User } from "../../domain/user";

interface UserCardProps {
  user: User;
  onPressDetail: () => void;
}

export default function UserCard({ user, onPressDetail }: UserCardProps) {
  return (
    <CardContainer>
      <UserImage source={{ uri: `https://i.pravatar.cc/150?u=${user.id}` }} />
      <UserInfo>
        <UserName>{user.name}</UserName>
        <UserEmail>{user.email}</UserEmail>

        <DetailButton onPress={onPressDetail}>
          <DetailButtonText>Ver Detalle</DetailButtonText>
        </DetailButton>
      </UserInfo>
    </CardContainer>
  );
}

const CardContainer = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: white;
  margin-bottom: 10px;
  border-radius: 10px;
  padding: 10px;
  elevation: 3;
`;

const UserImage = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  margin-right: 10px;
`;

const UserInfo = styled.View`
  flex: 1;
`;

const UserName = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

const UserEmail = styled.Text`
  font-size: 14px;
  color: #555;
`;

const DetailButton = styled.TouchableOpacity`
  margin-top: 5px;
  background-color: #007aff;
  padding: 5px 10px;
  border-radius: 6px;
  align-self: flex-start;
`;

const DetailButtonText = styled.Text`
  color: white;
  font-weight: bold;
`;
