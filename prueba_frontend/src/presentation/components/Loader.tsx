import React, { useEffect, useRef } from "react";
import styled from "styled-components/native";
import { Animated, Easing } from "react-native";

export default function Loader() {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [rotateAnim]);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <Overlay>
      <AnimatedSpinner style={{ transform: [{ rotate: spin }] }} />
      <LoadingText>Cargando...</LoadingText>
    </Overlay>
  );
}

const Overlay = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.8);
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const AnimatedSpinner = styled(Animated.View)`
  width: 40px;
  height: 40px;
  border: 4px solid #007aff;
  border-top-color: transparent;
  border-radius: 20px;
`;

const LoadingText = styled.Text`
  margin-top: 12px;
  font-size: 16px;
  color: #007aff;
  font-weight: bold;
`;
