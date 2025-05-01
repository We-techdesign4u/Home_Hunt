import { View, Text, Image } from "react-native";
import React from "react";
import { images } from "../constants";
import CustomButton from "./CustomButton";
import { router } from "expo-router";

const EmptyState = ({ title, subtitle }) => {
  return (
    <View className="mx-4 justify-center h-[500px] items-center ">
      <Image
        className="w-[160px]  h-[160px] m-8"
        resizeMode="contain"
        source={images.empty}
      />
      <Text className="text-xl mb-1 text-center text-gray-800 font-InSemiBold">
        {title}
      </Text>
      <Text className="text-center text-sm font-InMedium text-tsecondary">
        {subtitle}
      </Text>
      <CustomButton
        title="Sell a property"
        handlePress={() => router.push("/addProperties")}
        containerStyles={"w-full my-4"}
      />
    </View>
  );
};

export default EmptyState;
