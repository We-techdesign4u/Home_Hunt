import { View, Text, Image, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Chat from "../../components/Chat";
import { icons } from "../../constants";

const Message = () => {
  return (
    <SafeAreaView className="bg-white w-full h-full items-center justify-center flex-1">
      <View className="w-full">
        <View className=" h-12 items-center justify-between flex-row mx-3">
          <Text className="font-InBold text-lg">Inbox</Text>
          <Image tintColor={"00000"} source={icons.filter} />
        </View>
        <ScrollView
          contentContainerStyle={{ height: "100%" }}
          className="w-full"
        >
          <Chat></Chat>
          <Chat></Chat>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Message;
