import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";

import React from "react";
import { icons } from "../constants";
import { images } from "../constants";
import { router } from "expo-router";
import { useGlobalContext } from "../context/GlobalContextProvider";
import InVcard from "./InVcard";

const Vcard = ({ data }) => {
  // console.log(data);
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.$id}
      showsHorizontalScrollIndicator={false}
      horizontal
      renderItem={({ item }) => <InVcard item={item} />}
    />
  );
};

export default Vcard;
