import { View, Text } from "react-native";
import React from "react";
import CustomButton from "../../components/CustomButton";
import { router } from "expo-router";

import { endUser } from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppWrite";
import { useGlobalContext } from "../../context/GlobalContextProvider";
import { useState } from "react";

const Logout = () => {
  return (
    <View className="">
      <Backgound />
      {/* <RenderFooter /> */}
    </View>
  );
};

export default Logout;

const Backgound = () => {
  return <View className="bg-black opacity-10 h-full w-full flex-1"></View>;
};

const RenderFooter = () => {
  const { setCurrentUser, currentUser, setisLoggedIn } = useGlobalContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const logout = async () => {
    try {
      setIsSubmitting(true);
      await endUser();
      setisLoggedIn(false);
      setCurrentUser(null);
      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View className="absolute justify-center  items-center px-4 rounded-t-2xl h-[180px] bottom-0 w-full bg-white">
      <Text className="font-InMedium mb-4 text-lg">Logout</Text>
      <Text className="font-InRegular text-tsecondary text-sm">
        Are you sure you want to LOGOUT?
      </Text>
      <View className="flex-row w-full  items-center justify-evenly my-5">
        <CustomButton
          title="Yes, Logout"
          handlePress={logout}
          containerStyles="w-[150px]"
          textStyles="text-lg font-InRegular"
          isLoading={isSubmitting}
        />
        <CustomButton
          className=""
          title="Cancel"
          textStyles="text-primary font-InRegular text-lg"
          handlePress={() => router.push("/profile")}
          containerStyles="w-[150px] border-primary border-2 bg-white"
        />
      </View>
    </View>
  );
};
