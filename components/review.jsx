import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import { icons, images } from "../constants";

const Review = ({ data }) => {
  // console.log(data);
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.$id}
      ListHeaderComponent={<View className="mt-6"></View>}
      renderItem={({ item }) => (
        <View className="w-full ">
          <View className="flex-row justify-between">
            <TouchableOpacity>
              <View className="w-12">
                <Image
                  className="w-8 h-8 rounded-full"
                  source={{ uri: item.creator.avatar }}
                />
              </View>
            </TouchableOpacity>

            <View className=" flex-1">
              <View className="flex-row  items-center justify-between">
                <View className=" flex-row items-center">
                  <Text className="font-InSemiBold pr-3">
                    {item.creator.username}
                  </Text>
                  <Text>11 months ago</Text>
                </View>
                <View className="flex-row ">
                  <Image
                    className="mr-2 w-4 h-4 object-contain"
                    source={icons.star}
                    tintColor={"#FCBB44"}
                  />
                  <Text className="font-InSemiBold">{item.rating}</Text>
                </View>
              </View>
              <Text className="pr-8">{item.review}</Text>
            </View>
          </View>
          <View className="w-full h-[1px] my-6 bg-slate-200"></View>
        </View>
      )}
    />
  );
};

export default Review;
