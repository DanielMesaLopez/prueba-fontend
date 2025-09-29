import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { Moon, Sun } from "lucide-react-native"; // Iconos bonitos

interface DarkModeToggleProps {
  onToggle: (isDarkMode: boolean) => void;
}

export default function DarkModeToggle({ onToggle }: DarkModeToggleProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handlePress = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    onToggle(newMode); // notifica al padre
  };

  return (
    <ToggleButton onPress={handlePress}>
      {isDarkMode ? (
        <Moon color="white" size={20} />
      ) : (
        <Sun color="white" size={20} />
      )}
    </ToggleButton>
  );
}

const ToggleButton = styled(TouchableOpacity)`
  background-color: #333;
  padding: 8px;
  border-radius: 50px;
  align-items: center;
  justify-content: center;
`;
