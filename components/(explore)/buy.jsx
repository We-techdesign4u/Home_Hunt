import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import Searchbar from "../../../components/searchbar";
import { icons, images } from "../../../constants";

const Buy = () => {
  return (
    <View className="bg-white">
      <View className="flex-row justify-center items-center">
        <Text className="text-lg font-InMedium text-center">
          Enter Your Location
        </Text>
      </View>
      <Searchbar placeholder={"Address Here"}></Searchbar>
      <TouchableOpacity className=" my-6 px-4 flex-row">
        <Image
          tintColor={"#00B22D"}
          className="w-[25] h-[25] mr-3"
          resizeMode="contain"
          source={icons.direction}
        />
        <Text className="text-left text-lg font-InSemiBold">
          Use my current location
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Buy;
