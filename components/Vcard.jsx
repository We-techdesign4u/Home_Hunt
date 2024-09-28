import { View, Text, Image } from "react-native";
import React from "react";
import { icons } from "../constants";
import { images } from "../constants";

const Vcard = () => {
  return (
    <View className="h-[275px] bg-gray-10 w-[200px] relative p-3 rounded-xl border-[0.3px] border-tsecondary">
      <Image
        source={images.house1}
        className="w-full justify-center items-center object-cover rounded-lg  mb-2 h-[150px]"
        resizeMode="cover"
      />

      <View className="h-[30px] w-[30px] justify-center items-center bg-white absolute rounded-full right-5 top-5">
        <Image
          tintColor={"#00B22D"}
          className="h-5  w-5"
          resizeMode="contain"
          source={icons.add}
        />
      </View>
      <View className="flex-row justify-between my-1">
        <Text className="text-primary">Apartment</Text>
        <Text>4.5</Text>
      </View>
      <Text className="text-[16px] font-InSemiBold my-1">
        Woodland Apartments
      </Text>
      <View>
        <Image />
        <Text className="font-InMedium font-[12px] my-1 text-tsecondary">
          New York, USA
        </Text>
      </View>
      <Text>$1500 / month</Text>
    </View>
  );
};

export default Vcard;
