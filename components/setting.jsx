import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { icons } from "../constants";

const Setting = ({ title, icon }) => {
  return (
    <TouchableOpacity className="h-[60px]  pl-3 pr-5 border-t-[0.2px] border-slate-200 w-full  flex-row items-center ">
      <View className="w-[20px] mr-3">
        <Image
          source={icon}
          resizeMode="contain"
          className="w-[20px] "
          tintColor={"#00B22D"}
        />
      </View>
      <View className="flex-1">
        <Text className="text-lg font-InMedium">{title}</Text>
      </View>
      <View>
        <Image
          source={icons.forward}
          resizeMode="contain"
          className=" h-[15px] "
          tintColor={"#00B22D"}
        />
      </View>
    </TouchableOpacity>
  );
};

export default Setting;
