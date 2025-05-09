import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";
import { images } from "../constants";
import { router } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import { useGlobalContext } from "../context/GlobalContextProvider";
import { useEffect } from "react";
import { updateFav } from "../lib/appwrite";

const InVcard = (item) => {
  const { currentUser, removeFav, addFav } = useGlobalContext();
  //   const [updatedFavs, setUpdatedFavs] = useState(currentUser.favorites);

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
      className="h-[275px] bg-white w-[200px] relative p-3 rounded-xl border-[0px] mx-3 border-tsecondary"
    >
      <Image
        source={{ uri: data.coverpicture[0] }}
        className="w-full justify-center items-center object-cover rounded-lg  mb-2 h-[150px]"
        resizeMode="cover"
      />

      {currentUser ? (
        <View>
          {checkIfFav ? (
            <TouchableOpacity
              onPress={() => removeFav(data)}
              className="h-[30px] w-[30px] justify-center items-center absolute  right-8 top-6"
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
              className="h-[30px] w-[30px] justify-center items-center absolute  right-8 top-6"
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

      <View className="flex-row justify-between my-1">
        <Text className="text-primary">Property {data.adType}</Text>
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
        className="text-[16px] font-InSemiBold mt-1"
      >
        {data.title}
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
          {data.street}
        </Text>
      </View>
      <Text>
        <Text className="text-[18px] text-primary font-InSemiBold ">
          ${data.amount}
        </Text>{" "}
        /month
      </Text>
    </TouchableOpacity>
  );
};

export default InVcard;
