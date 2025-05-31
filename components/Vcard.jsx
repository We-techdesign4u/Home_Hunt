import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";

import React, { useEffect } from "react";
import { icons } from "../constants";
import { images } from "../constants";
import { router } from "expo-router";
import { useGlobalContext } from "../context/GlobalContextProvider";
import InVcard from "./InVcard";
import Animated, {
  LinearTransition,
  useAnimatedScrollHandler,
  ZoomIn,
} from "react-native-reanimated";

const Vcard = ({ data }) => {
  const handler = useAnimatedScrollHandler({
    onScroll: (event) => {
      const x = event.contentOffset.x;
      if (x < 10) {
      }
    },
  });

  // console.log(data);
  return (
    <Animated.FlatList
      data={data}
      keyExtractor={(item) => item.$id}
      showsHorizontalScrollIndicator={false}
      horizontal
      renderItem={({ item }) => <InVcard item={item} />}
      itemLayoutAnimation={ZoomIn.springify().stiffness(200).damping(80)}
    />
  );
};

export default Vcard;
