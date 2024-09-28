import { View, Text, Image } from "react-native";
import React from "react";
import { icons } from "../constants";
import { images } from "../constants";

const Hcard = () => {
  return (
    <View className="h-[134px] bg-gray-10 w-full items-center relative flex-row p-3 my-2 rounded-xl border-[0.3px] border-tsecondary">
      <Image
        source={images.house2}
        className="w-[117] rounded-lg bg-slate-600 mr-3 h-[115px]"
        resizeMode="cover"
      />
      <View className="h-[30px] w-[30px] justify-center items-center bg-white absolute rounded-full left-5 top-4">
        <Image
          tintColor={"#00B22D"}
          className="h-5  w-5"
          resizeMode="contain"
          source={icons.add}
        />
      </View>
      <View className="">
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
    </View>
  );
};

export default Hcard;
