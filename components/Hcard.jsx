import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import { icons } from "../constants";
import { images } from "../constants";
import { router } from "expo-router";

const Hcard = ({
  data: { title, amount, id, adType, street, coverpicture, pictures },
}) => {
  // console.log(item);
  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "/prod",
          params: { item: JSON.stringify(item) },
        })
      }
      className="h-[134px] bg-white mx-4 bg-gray-10 items-center relative flex-row py-3 px-2 my-2 rounded-xl border-[0px] border-tsecondary"
    >
      <Image
        source={{ uri: coverpicture[0] }}
        className="w-[117] rounded-lg bg-slate-600 mr-3 h-[115px]"
        resizeMode="cover"
      />
      <TouchableOpacity className="h-[30px] w-[30px]  justify-center items-center bg-white absolute rounded-full left-5 top-4">
        <Image
          tintColor={"#00B22D"}
          className="h-5  w-5"
          resizeMode="contain"
          source={icons.unfav}
        />
      </TouchableOpacity>
      <View className="flex-1">
        <View className="flex-row justify-between mb-2">
          <Text className="text-primary">Property {adType}</Text>
          <Text>4.5</Text>
        </View>
        <Text className="text-[17px] font-InMedium mt-1">{title}</Text>

        <View className="flex-row w-full items-center mb-2">
          <Image
            resizeMode="contain"
            className="h-[15px] w-[10px] mr-1 "
            tintColor={"#8B8B8B"}
            source={icons.location}
          />
          <Text className="font-InMedium text-[13px] text-tsecondary">
            {street}
          </Text>
        </View>

        <Text>
          <Text className="text-[18px] text-primary font-InSemiBold ">
            ${amount}
          </Text>{" "}
          /month
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Hcard;
