import { View, Text } from "react-native";
import { Stack } from "expo-router";
import React from "react";

const HomeDetails = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="[id]" options={{ headerShown: false }} />
      </Stack>
    </>
  );
};

export default HomeDetails;
