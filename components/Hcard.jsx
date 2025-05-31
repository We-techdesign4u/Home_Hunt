import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import { icons } from "../constants";
import { images } from "../constants";
import { router } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import { useGlobalContext } from "../context/GlobalContextProvider";

const Hcard = ({ data }) => {
  const { currentUser, removeFav, addFav } = useGlobalContext();
  // console.log(data);
  const checkIfFav = currentUser?.favorites?.includes(data.$id) || false;
  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "/prod",
          params: { item: JSON.stringify(data) },
        })
      }
      className="h-[134px] w-full bg-white  bg-gray-10 items-center relative flex-row py-3 px-2 my-2 rounded-xl border-[0px] border-tsecondary"
    >
      <View className="relative">
        <Image
          source={{ uri: data.coverpicture[0] }}
          className="w-[117] rounded-lg bg-slate-600 mr-3 h-[115px]"
          resizeMode="cover"
        />
        <View className="absolute">
          {currentUser ? (
            <View>
              {checkIfFav ? (
                <TouchableOpacity
                  onPress={() => removeFav(data)}
                  className="h-[30px] w-[30px] justify-center items-center absolute  left-5 top-4"
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
                  className="h-[30px] w-[30px] justify-center items-center absolute  left-5 top-4"
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
        </View>
      </View>

      <View className="flex-1">
        <View className="flex-row justify-between mb-2">
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
        <Text className="text-[17px] font-InMedium mt-1">{data.title}</Text>

        <View className="flex-row w-full items-center mb-2">
          <Image
            resizeMode="contain"
            className="h-[15px] w-[10px] mr-1 "
            tintColor={"#8B8B8B"}
            source={icons.location}
          />
          <Text className="font-InMedium text-[13px] text-tsecondary">
            {data.street}
          </Text>
        </View>

        <Text>
          <Text className="text-[18px] text-primary font-InSemiBold ">
            ${data.amount}
          </Text>{" "}
          /month
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Hcard;
