import { View, Text, Image } from "react-native";
import React from "react";
import { icons, images } from "../constants";

const MyMessages = () => {
  return (
    <View>
      <View className="flex-row py-3">
        <View className="w-1/6">
          <Image
            className="w-8 mr-3 mt-4 h-8 rounded-full"
            source={images.profileImage}
          />
        </View>
        <View className="w-5/6">
          <View className="flex-row  items-center justify-between">
            <View className=" pb-2 pt-4 items-center flex-row">
              <Text className="font-InSemiBold mr-3"> Dele Momodu</Text>
              <Text>3:30 pm</Text>
            </View>
          </View>
          <Text>
            Loren ipsum dolor sit amet, consectetur adjuscenter elit, sed do
            elsumod tempor incididunt ut labore et doore magna alique sit amet,
            consectetur
          </Text>
        </View>
      </View>
    </View>
  );
};

export default MyMessages;
