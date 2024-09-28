import { View, Text, ScrollView, Image, TextInput } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Formfield from "../../components/Formfield";
import CustomButton from "../../components/CustomButton";
import { useState } from "react";
import { icons } from "../../constants";
import { Link, router } from "expo-router";
import { TouchableOpacity } from "react-native";

const LocationAccess = () => {
  return (
    <SafeAreaView className="h-full bg-white">
      <View className="h-full px-4" style={{ flex: 1 }}>
        <View className="flex-row justify-center items-center">
          <Text className="text-2xl font-InMedium text-center">
            Enter Your Location
          </Text>
        </View>
        <View
          className={`w-full h-[40] bg-[#F4F6F9] rounded-lg focus:border-primary px-4 mt-8 items-center flex-row`}
        >
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
        <TouchableOpacity className=" my-6 flex-row">
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
        <View className="pt-5 border-t-[1px] border-gray-200 ">
          <Text className="tracking-widest text-[13px] font-InMedium text-tsecondary mb-1">
            SEARCH RESULT
          </Text>
        </View>

        <ScrollView className="">
          <TouchableOpacity
            onPress={() => router.push("/home")}
            className="mt-4 pb-3 border-b-[1px] border-gray-200"
          >
            <View className="flex-row items-center mb-1">
              <Image
                tintColor={"#00B22D"}
                className="w-[15] h-[15] mr-1"
                resizeMode="contain"
                source={icons.direction}
              />
              <Text className="text-[17px] font-InMedium text-tprimary">
                Golden Avenue
              </Text>
            </View>
            <Text className="text-[17px] text-tsecondary">
              8502 Preston Rd. Ingl...
            </Text>
          </TouchableOpacity>

          <TouchableOpacity className="mt-4 pb-3 border-b-[1px] border-gray-200">
            <View className="flex-row items-center mb-1">
              <Image
                tintColor={"#00B22D"}
                className="w-[15] h-[15] mr-1"
                resizeMode="contain"
                source={icons.direction}
              />
              <Text className="text-[17px] font-InMedium text-tprimary">
                Allen Avenue
              </Text>
            </View>
            <Text className="text-[17px] text-tsecondary">
              8502 Gegudu Rd. Ingl...
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className="mt-4 pb-3 border-b-[1px] border-gray-200">
            <View className="flex-row items-center mb-1">
              <Image
                tintColor={"#00B22D"}
                className="w-[15] h-[15] mr-1"
                resizeMode="contain"
                source={icons.direction}
              />
              <Text className="text-[17px] font-InMedium text-tprimary">
                Lagos Island
              </Text>
            </View>
            <Text className="text-[17px] text-tsecondary">
              8502 Mowe Rd. Ingl...
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default LocationAccess;
