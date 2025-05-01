import { View, Text, ScrollView } from "react-native";
import React from "react";
import Formfield from "../../components/Formfield";
import CustomButton from "../../components/CustomButton";
import { router } from "expo-router";

const CustomerInfo = () => {
  return (
    <View className="flex-1">
      {Fields()}
      {renderFooter()}
    </View>
  );
};

const renderFooter = () => {
  return (
    <View className="absolute justify-center items-center px-4 rounded-t-2xl h-[90px] bottom-0 w-full bg-white">
      <CustomButton
        title="Continue"
        handlePress={() => router.push("/bookingSuccess")}
        containerStyles="w-5/6"
      />
    </View>
  );
};

const Fields = () => {
  return (
    <ScrollView className="">
      <View className=" pt-3 px-4">
        <Text className="text-lg font-InBold">Your Information Details</Text>
        <View className="mt-5 h-[400px] justify-between mb-[120px]">
          <Formfield
            tittle={"Name"}
            tittlestyle={"font-InSemiBold"}
            placeholder={"Name"}
          />
          <Formfield
            tittle={"Email"}
            tittlestyle={"font-InSemiBold"}
            placeholder={"example@gmail.com"}
          />
          <Formfield
            tittle={"Gender"}
            tittlestyle={"font-InSemiBold"}
            placeholder={"Male"}
          />
          <Formfield
            tittle={"Phone Number"}
            tittlestyle={"font-InSemiBold"}
            placeholder={"+234 080 0000 0000"}
          />
          <Formfield
            tittle={"Country"}
            tittlestyle={"font-InSemiBold"}
            placeholder={"Nigeria"}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default CustomerInfo;
