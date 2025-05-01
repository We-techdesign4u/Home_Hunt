import { Stack } from "expo-router";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { withLayoutContext } from "expo-router";
import { SearchBar } from "react-native-screens";

import { View } from "react-native";

const TopTabs = createMaterialTopTabNavigator();

export default function ExploreLayout() {
  return (
    <Stack>
      <Stack.Screen name="all" options={{ headerShown: false }} />
      <Stack.Screen name="buy" options={{ headerShown: false }} />
      <Stack.Screen name="rent" options={{ headerShown: false }} />
      <Stack.Screen name="agents" options={{ headerShown: false }} />
    </Stack>
  );
}
