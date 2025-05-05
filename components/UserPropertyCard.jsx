import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import { icons } from "../constants";
import { images } from "../constants";
import { router } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import { getPropertyByID } from "../lib/appwrite";
import useAppwrite from "../lib/useAppWrite";

const UserPropertyCard = ({ item }) => {
  //   const { data: property } = useAppwrite(() => getPropertyByID(item));
  //   console.log("myprop", property.documents[0]);
  //   console.log(item);
  //   const data = property?.documents[0];
  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "/prod",
          params: { item: JSON.stringify(item) },
        })
      }
      className="h-[134px] w-full bg-white  bg-gray-10 items-center relative flex-row py-3 px-2 my-2 rounded-xl border-[0px] border-tsecondary"
    >
      <Image
        source={{ uri: item?.coverpicture[0] }}
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
          <Text className="text-primary">Property {item?.adType}</Text>
          <Text>4.5</Text>
        </View>
        <Text className="text-[17px] font-InMedium mt-1">{item?.title}</Text>

        <View className="flex-row w-full items-center mb-2">
          <Image
            resizeMode="contain"
            className="h-[15px] w-[10px] mr-1 "
            tintColor={"#8B8B8B"}
            source={icons.location}
          />
          <Text className="font-InMedium text-[13px] text-tsecondary">
            {item?.street}
          </Text>
        </View>

        <Text>
          <Text className="text-[18px] text-primary font-InSemiBold ">
            ${item?.amount}
          </Text>{" "}
          /month
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default UserPropertyCard;
