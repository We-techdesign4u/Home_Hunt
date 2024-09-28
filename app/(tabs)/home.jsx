import { View, Text, ScrollView, Image, TextInput } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Formfield from "../../components/Formfield";
import CustomButton from "../../components/CustomButton";
import { useState } from "react";
import { icons } from "../../constants";
import { Link, router } from "expo-router";
import { TouchableOpacity } from "react-native";
import Vcard from "../../components/Vcard";
import Hcard from "../../components/Hcard";

const Home = () => {
  return (
    <SafeAreaView className="h-full bg-white">
      <View style={{ flex: 1 }} className="h-full">
        <View className="flex-row px-4 h-[60px] mb-3 justify-between items-center bg-slate-200 m">
          <View>
            <Text className="text-base m-0 p-0 leading-none">Hi Ganiyu</Text>
            <Text className="font-InSemiBold m-0 p-0 leading-none text-xl">
              Welcome Back
            </Text>
          </View>
          <View className="h-[40px] w-[40px] rounded-full bg-slate-400">
            <Image />
          </View>
        </View>
        <View className="px-4">
          <Text className="text-tsecondary">Location</Text>
          <TouchableOpacity className=" flex-row mt-1 mb-3">
            <Image
              resizeMode="contain"
              className="h-5 w-4 mr-2 "
              tintColor={"#00B22D"}
              source={icons.location}
            />
            <Text className="font-InSemiBold text-base">New York, USA</Text>
          </TouchableOpacity>
        </View>
        <View className="px-4 pb-3">
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

        <ScrollView>
          <View className="py-5 w-full px-4 flex-row justify-between items-center ">
            <Text className="text-[18px]  font-InSemiBold mb-1">
              Recommended Property
            </Text>
            <Text className="text-primary font-InSemiBold">See All</Text>
          </View>
          <View className="mx-5">
            <Vcard />
          </View>

          <View className="pt-10 pb-3 w-full px-4 flex-row justify-between items-center ">
            <Text className="text-[18px]  font-InSemiBold mb-1">
              Nearby Property
            </Text>
            <Text className="text-primary font-InSemiBold">See All</Text>
          </View>
          <View className="mx-5">
            <Hcard />
          </View>
          <View className="m-5">
            <Hcard />
          </View>
          {/* </View> */}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Home;
