import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { Link, Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { images } from "../constants";
import CustomButton from "../components/CustomButton";
import { useGlobalContext } from "../context/GlobalContextProvider";

const index = () => {
  const { isLoading, isLoggedIn } = useGlobalContext();
  if (!isLoading && isLoggedIn) return <Redirect href="/home" />;
  return (
    <SafeAreaView className=" bg-slate-800 h-full w-full items-center justify-center flex-1">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="min-h-full min-w-full justify-center items-center bg-[#F8F8F8]">
          <Image
            className=" w-11/12 h-[588] object-contain"
            resizeMode="contain"
            source={images.phone}
          />

          <View className="w-full h-2/5 absolute rounded-t-[34] items-center bottom-0 bg-white px-5 pt-6">
            <Text className="text-center font-InSemiBold text-[30px] text-primary">
              Discover <Text className="text-black">and Find Your Perfect</Text>{" "}
              Dream House
            </Text>
            <Text className="text-xl text-center mt-5">
              App to search and discover the most suitable place for you to stay
            </Text>
            <CustomButton
              tittle="Let's Get Started"
              handlePress={() => router.push("/location")}
              containerStyles="w-80 mt-7"
            />
            <View className="flex-row">
              <Text className="text-lg mt-5 font-InMedium">
                Already have an account?{" "}
              </Text>
              <Link
                href="/sign-in"
                className="text-primary text-lg mt-5 font-InMedium underline"
              >
                Sign In
              </Link>
            </View>
          </View>
        </View>
      </ScrollView>
      <StatusBar style="light" backgroundColor="#ffff" />
    </SafeAreaView>
  );
};

export default index;
