import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";
import { images } from "../constants";
import { router } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import { useGlobalContext } from "../context/GlobalContextProvider";
import { useEffect } from "react";
import { updateFav } from "../lib/appwrite";

const LCard = (item) => {
  const { currentUser, removeFav, addFav } = useGlobalContext();

  const data = item.item;
  const checkIfFav = currentUser?.favorites?.includes(data.$id) || false;

  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "/prod",
          params: { item: JSON.stringify(data) },
        })
      }
      className="h-[300px] bg-white mx-4 relative p-4 my-2 rounded-2xl "
    >
      <Image
        source={{ uri: data?.coverpicture[0] }}
        className="w-full rounded-2xl mb-2 h-[155px]"
        resizeMode="cover"
      />
      <View className=" flex-1 justify-center items-center absolute  left-8 top-6">
        <View className="h-[30px] w-[70px] justify-center items-center rounded-xl bg-black opacity-40"></View>
        <Text className="absolute text-white font-InSemiBold text-[15px]">
          {data?.adType}
        </Text>
      </View>

      {currentUser ? (
        <View className=" absolute top-6 right-0">
          {checkIfFav ? (
            <TouchableOpacity
              onPress={() => removeFav(data)}
              className="h-[30px] w-[30px] justify-center items-center absolute right-8 top-6"
            >
              <View className="h-[30px] w-[30px] justify-center items-center rounded-full bg-black opacity-40"></View>

              <Image
                tintColor={"#ffffff"}
                className="h-4 absolute opacity-100 w-5"
                resizeMode="contain"
                source={icons.fav}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => addFav(data)}
              className="h-[30px] w-[30px] justify-center items-center absolute right-8 top-0"
            >
              <View className="h-[30px] w-[30px] justify-center items-center rounded-full bg-black opacity-40"></View>

              <Image
                tintColor={"#ffffff"}
                className="h-4 absolute opacity-100 w-5"
                resizeMode="contain"
                source={icons.unfav}
              />
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <View></View>
      )}

      <View className="flex-1">
        <View className="flex-row justify-between mb-1">
          <View className="flex-row items-center">
            <Image
              resizeMode="contain"
              className="h-[15px] w-[15px] -ml-1 mr-1 "
              tintColor={"#8B8B8B"}
              source={icons.explore}
            />
            <Text
              ellipsizeMode="tail"
              numberOfLines={1}
              className="font-InSemiBold text-[13px] text-[#939498]"
            >
              {data?.street}
            </Text>
          </View>

          <View className="flex-row items-center">
            <Text>4.5</Text>
            <Image
              resizeMode="contain"
              className="h-[15px] w-[12px] ml-1 "
              tintColor={"#FCBB44"}
              source={icons.star}
            />
          </View>
        </View>
        <Text
          ellipsizeMode="tail"
          numberOfLines={1}
          className="text-[17px] font-InSemiBold mt-1"
        >
          {data?.title}
        </Text>

        <Text>
          <Text className="text-[18px] text-primary font-InSemiBold ">
            ${data?.amount}
          </Text>{" "}
          /Month
        </Text>
        <View className="h-[1px] w-full bg-slate-100 mt-2"></View>
        <View className="flex-row h-[30px]">
          <View className="flex-row justify-center mr-7  items-center">
            <Image
              className="w-4 h-4 mr-2"
              resizeMode="contain"
              tintColor={"#D3D7D8"}
              source={icons.bed}
            />
            <Text className="font-InSemiBold mt-1 text-[#D3D7D8] text-[14px]">
              {data?.beds} Beds
            </Text>
          </View>
          <View className="flex-row justify-center mr-7  items-center">
            <Image
              className="w-4 h-4 mr-2"
              resizeMode="contain"
              tintColor={"#D3D7D8"}
              source={icons.bath}
            />
            <Text className="font-InSemiBold text-[#D3D7D8] mt-1 text-[14px]">
              {data?.bath} Bath
            </Text>
          </View>
          <View className="flex-row justify-center  items-center">
            <Image
              className="w-4 h-3 mr-2"
              resizeMode="contain"
              tintColor={"#D3D7D8"}
              source={icons.size}
            />
            <Text className="font-InSemiBold text-[#D3D7D8] mt-1 text-[14px]">
              {data?.sqrt} sqrt
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default LCard;
