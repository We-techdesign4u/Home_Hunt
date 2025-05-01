import { View, Text } from "react-native";
import { Stack } from "expo-router";
import React from "react";

const Explore = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="[query]" options={{ headerShown: false }} />
      </Stack>
    </>
  );
};

export default Explore;
