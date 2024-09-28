import { View, Text, ScrollView, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Formfield from "../../components/Formfield";
import CustomButton from "../../components/CustomButton";
import { useState } from "react";
import { icons } from "../../constants";
import { Link } from "expo-router";

const Location = ({ color }) => {
  const [form, setForm] = useState({ email: "", password: "" });
  return (
    <SafeAreaView className="h-full bg-white ">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="h-full justify-center items-center w-full ">
          <View className="h-[110] w-[110] rounded-full bg-gray-100 mb-10 justify-center items-center">
            <Image
              resizeMode="contain"
              tintColor={"#00B22D"}
              className="w-[50] h-[80]"
              source={icons.location}
            />
          </View>
          <Text className="font-InBold text-3xl text-center">
            What is Your Location?
          </Text>
          <Text className="text-center text-gray-700 text-base mt-3">
            We need to know your location in order to suggest {"\n"} nearby
            servies
          </Text>

          <CustomButton
            tittle="Allow Location Access"
            handlePress={() => {}}
            containerStyles="w-80 mt-8"
          />
          <Link href="/locationAccess" className="my-9 text-base text-gray-400">
            Enter Location Manually
          </Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Location;
