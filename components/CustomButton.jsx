import { View, Text } from "react-native";
import { TouchableOpacity } from "react-native";
import React from "react";
import { isLoading } from "expo-font";

const CustomButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`bg-primary h-[50] justify-center rounded-3xl ${containerStyles} ${
        isLoading ? "opacity-50" : ""
      }`}
      disabled={isLoading}
    >
      <Text
        className={`text-center text-white text-xl font-InSemiBold ${textStyles}`}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
