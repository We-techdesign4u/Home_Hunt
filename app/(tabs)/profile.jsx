import { View, Text, ScrollView, Image, TextInput } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Formfield from "../../components/Formfield";
import CustomButton from "../../components/CustomButton";
import { useState } from "react";
import { icons } from "../../constants";
import { Link, router } from "expo-router";
import { TouchableOpacity } from "react-native";
import Setting from "../../components/setting";

const Profile = () => {
  return (
    <SafeAreaView className="h-full w-full bg-white">
      <View className="w-full h-full">
        <View className="justify-center my-5 items-center">
          <View className="w-[92px] h-[92px] m-3 bg-slate-200 rounded-full justify-center items-center">
            <View className="absolute w-[32px] h-[32px] rounded-full border-white border-2 bg-primary justify-center items-center bottom-0 -right-1">
              <Image source={icons.edit} />
            </View>
            <Image />
          </View>
          <Text className="text-center text-lg font-InSemiBold">
            Esther Howard
          </Text>
        </View>

        <View>
          <Setting title="Your Profile" icon={icons.sprofile}></Setting>
          <Setting title="Payment Methods" icon={icons.spayment}></Setting>
          <Setting title="Settings" icon={icons.ssetting}></Setting>
          <Setting title="Help Center" icon={icons.shelp}></Setting>
          <Setting title="Privacy Policy" icon={icons.sprivacy}></Setting>
          <Setting title="Log out" icon={icons.slogout}></Setting>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
