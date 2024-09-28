import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { icons } from "../constants";

const Chat = () => {
  return (
    <TouchableOpacity className="h-[85px]  w-full  flex-row items-center ">
      <View className="h-[55px] w-[55px] bg-slate-200 justify-center items-center rounded-full mx-3">
        <Image
          resizeMode="contain"
          className="w-16 h-12"
          source={icons.DPimage}
        />
      </View>
      <View className="border-gray-400 border-t-[0.2px] flex-1 mr-3 h-full w-4/5 justify-center">
        <View className="flex-row  justify-between mb-2">
          <Text className="font-InSemiBold">Avia Blum</Text>
          <Text>Thursday</Text>
        </View>
        <View className=" ">
          <Text className="text-tsecondary font-InMedium">
            Good morning, can you please create a new postcard with these both
            images and don't you try to make
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Chat;
