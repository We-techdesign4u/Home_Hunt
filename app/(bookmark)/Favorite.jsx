import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  FlatList,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Formfield from "../../components/Formfield";
import CustomButton from "../../components/CustomButton";
import { useState } from "react";
import { icons } from "../../constants";
import { Link, router } from "expo-router";
import { TouchableOpacity } from "react-native";
import Hcard from "../../components/Hcard";

const Favorite = () => {
  const data = [
    { title: "home", id: 1, bed: 1, bath: 2, amount: 200, buyDesc: "sometext" },
  ];

  return (
    <View className="h-full bg-white">
      <FlatList
        data={data}
        renderItem={(item) => <View>{/* <Hcard /> */}</View>}
      />
    </View>
  );
};

export default Favorite;
