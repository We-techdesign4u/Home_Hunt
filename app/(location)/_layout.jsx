import { View, Text } from "react-native";
import { Stack } from "expo-router";
import React from "react";

const LocationLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="location" options={{ headerShown: false }} />
        <Stack.Screen name="locationAccess" options={{ headerShown: false }} />
      </Stack>
    </>
  );
};

export default LocationLayout;
