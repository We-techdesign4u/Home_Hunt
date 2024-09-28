import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { icons } from "../../constants";

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View style={styles.tabMenuCont}>
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        style={styles.tabicons}
      />
    </View>
  );
};

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#00B22D",
          tabBarInactiveTintColor: "#000000",
          tabBarStyle: {
            backgroundColor: "white",
            borderTopWidth: 0.2,
            borderTopColor: "#D2D2D2",
            height: 54,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon={icons.home} color={color} focused={focused} />
            ),
          }}
        />

        <Tabs.Screen
          name="explore"
          options={{
            title: "exlpore",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon={icons.explore} color={color} focused={focused} />
            ),
          }}
        />

        <Tabs.Screen
          name="message"
          options={{
            title: "Message",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon={icons.message} color={color} focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="favorite"
          options={{
            title: "favorite",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon={icons.favorite} color={color} focused={focused} />
            ),
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon={icons.profile} color={color} focused={focused} />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;

const styles = StyleSheet.create({
  tabicons: {
    width: 27,
    height: 25,
  },

  tabtext: {
    color: "#ffff",
  },

  tabtextonFoc: {
    color: "#ffff",
  },

  tabMenuCont: {
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
  },
});
