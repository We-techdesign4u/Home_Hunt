import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";

import React from "react";
import { icons } from "../constants";
import { images } from "../constants";
import { router } from "expo-router";

const Vcard = ({ data }) => {
  // console.log(data);
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.$id}
      showsHorizontalScrollIndicator={false}
      horizontal
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "/prod",
              params: { item: JSON.stringify(item) },
            })
          }
          className="h-[275px] bg-white w-[200px] relative p-3 rounded-xl border-[0px] mx-3 border-tsecondary"
        >
          <Image
            source={{ uri: item.coverpicture[0] }}
            className="w-full justify-center items-center object-cover rounded-lg  mb-2 h-[150px]"
            resizeMode="cover"
          />

          <TouchableOpacity className="h-[30px] w-[30px] justify-center items-center bg-white absolute rounded-full right-5 top-5">
            <Image
              tintColor={"#00B22D"}
              className="h-5  w-5"
              resizeMode="contain"
              source={icons.unfav}
            />
          </TouchableOpacity>
          <View className="flex-row justify-between my-1">
            <Text className="text-primary">Property {item.adType}</Text>
            <Text>4.5</Text>
          </View>
          <Text
            ellipsizeMode="tail"
            numberOfLines={1}
            className="text-[16px] font-InSemiBold mt-1"
          >
            {item.title}
          </Text>

          <View className="flex-row w-full items-center mb-1">
            <Image
              resizeMode="contain"
              className="h-[15px] w-[15px] -ml-1 mr-1 "
              tintColor={"#8B8B8B"}
              source={icons.explore}
            />
            <Text
              ellipsizeMode="tail"
              numberOfLines={1}
              className="font-InSemiBold font-[12px] text-tsecondary"
            >
              {item.street}
            </Text>
          </View>
          <Text>
            <Text className="text-[18px] text-primary font-InSemiBold ">
              ${item.amount}
            </Text>{" "}
            /month
          </Text>
        </TouchableOpacity>
      )}
    />
  );
};

export default Vcard;
