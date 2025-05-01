import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { icons } from "../constants";

const Setting = ({ title, icon, handleClick }) => {
  return (
    <TouchableOpacity
      onPress={handleClick}
      className="h-[57px]  pl-3 pr-5 border-t-[0.2px] border-slate-200 w-full  flex-row items-center "
    >
      <View className="w-[20px] mr-3">
        <Image
          source={icon}
          resizeMode="contain"
          className="w-[17px] "
          tintColor={"#00B22D"}
        />
      </View>
      <View className="flex-1">
        <Text className="text-sm font-InMedium">{title}</Text>
      </View>
      <View>
        <Image
          source={icons.forward}
          resizeMode="contain"
          className=" h-[10px] "
          tintColor={"#8b8b8b"}
        />
      </View>
    </TouchableOpacity>
  );
};

export default Setting;
