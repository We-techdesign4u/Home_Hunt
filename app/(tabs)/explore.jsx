import { View, Text, ScrollView, Image, TextInput } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Formfield from "../../components/Formfield";
import CustomButton from "../../components/CustomButton";
import { useState } from "react";
import { icons } from "../../constants";
import { Link, router } from "expo-router";
import { TouchableOpacity } from "react-native";
import Hcard from "../../components/Hcard";

const explore = () => {
  return (
    <SafeAreaView className="h-full bg-white">
      <View className="h-full" style={{ flex: 1 }}>
        <View className="px-4">
          <View className="w-full h-[40] bg-[#F4F6F9] rounded-lg  px-4  mt-2 items-center flex-row">
            <TextInput
              placeholder="Your Address Here"
              className="flex-1 text-gray-700 font-InMedium text-base w-full"
            />
            <TouchableOpacity>
              <Image
                tintColor={"#00B22D"}
                className="w-5 h-5"
                resizeMode="contain"
                source={icons.search}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View className="py-5 w-full flex-row ">
          <TouchableOpacity className=" border-b-2 h-9 w-1/3 border-b-primary justify-center items-center">
            <Text className="text-primary text-base font-InSemiBold">BUY</Text>
          </TouchableOpacity>
          <TouchableOpacity className="border-b-[0.3px] h-9 w-1/3 border-b-tsecondary justify-center items-center">
            <Text className="text-tsecondary text-base font-InSemiBold">
              RENT
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className="border-b-[0.3px] h-9 w-1/3 border-b-tsecondary justify-center items-center">
            <Text className="text-tsecondary text-base font-InSemiBold">
              AGENTS
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView className="px-5">
          <Hcard></Hcard>
          <Hcard></Hcard>
          <Hcard></Hcard>
          <Hcard></Hcard>
          <Hcard></Hcard>
          <Hcard></Hcard>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default explore;
