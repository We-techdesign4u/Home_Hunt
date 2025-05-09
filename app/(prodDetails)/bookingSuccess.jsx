import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { icons, images } from "../../constants";
import CustomButton from "../../components/CustomButton";
import { router } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import Animated, {
  useSharedValue,
  withSpring,
  withTiming,
  Easing,
  withDelay,
} from "react-native-reanimated";
import ConfettiCannon from "react-native-confetti-cannon";
import { format, isToday, isThisWeek, parseISO } from "date-fns";

const Page = () => {
  const height = useSharedValue(0);
  const width = useSharedValue(0);

  useEffect(() => {
    height.value = withTiming(height.value + 25, {
      duration: 500,
      easing: Easing.linear,
    });

    width.value = withDelay(500, withSpring(width.value + 60));
  }, []);

  const params = useLocalSearchParams();
  const allData = JSON.parse(params.data);
  const {
    adType,
    title,
    state,
    country,
    lga,
    street,
    beds,
    bath,
    owner,
    amount,
    houseRules,
    desc,
    coverpicture,
    pictures,
    sqrt,
    creator,
    reviews,
  } = allData.allData;

  const dateTime = new Date();
  const isoStringWithMilliseconds = dateTime.toISOString();
  const date = parseISO(isoStringWithMilliseconds);
  const MyDates = () => {
    return format(date, "EE, MMM dd, yyyy, h:mma");
  };
  //
  return (
    <View className="flex-1 px-4">
      <ConfettiCannon count={30} origin={{ x: 10, y: 10 }} />
      <View className="items-center h-1/2 pb-6 justify-end">
        <View className="h-[120px] justify-center items-center w-[120px] mb-5 bg-primary rounded-full">
          <View className=" h-[30px] w-[60px] mb-6 ml-0 -rotate-45 relative">
            <Animated.View
              style={{ height }}
              className="w-[7px] h-[0px] rounded-tl-md rounded-tr-md bg-white"
            />
            <Animated.View
              style={{ width }}
              className="w-[0px] h-[7px]  rounded-bl-md rounded-br-md rounded-tr-md bg-white"
            />
          </View>
        </View>
        <Text className="font-InBold text-2xl leading-10">
          Request Received!
        </Text>
        <Text className="leading-10">Agent will contact you soon!</Text>

        <Text className="font-InBold">{<MyDates />}</Text>
      </View>
      <View className="pt-6 border-t-[0.2px] border-gray-300">
        <Text className="text-tsecondary text-base">Can't wait?</Text>

        <View className=" my-3">
          <TouchableOpacity
            className="flex-row"
            onPress={() =>
              router.push({
                pathname: "/MyProfile",
                params: { creator: JSON.stringify(creator) },
              })
            }
          >
            <Image
              className="w-8 mr-3 h-8 rounded-full"
              source={{ uri: creator?.avatar }}
            />
            <View>
              <Text className="font-InSemiBold text-base">
                {creator?.username}
              </Text>
              <Text className="text-sm text-tsecondary">
                {creator?.city}, {creator?.country}
              </Text>
            </View>
          </TouchableOpacity>

          <View className="flex-row absolute right-0">
            <TouchableOpacity
              className="w-8 h-8 justify-center items-center rounded-full mr-3 bg-white"
              onPress={() =>
                router.push({
                  pathname: "/messages",
                  params: { creator: JSON.stringify(creator) },
                })
              }
            >
              <Image
                source={icons.text}
                tintColor={"#00B22D"}
                className="w-5 h-5 "
              />
            </TouchableOpacity>
            <TouchableOpacity className="w-8 h-8 justify-center items-center rounded-full mr-3 bg-white">
              <Image
                source={icons.phone}
                tintColor={"#00B22D"}
                className="w-4 h-5 "
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const RenderFooter = () => {
  return (
    <View className="absolute justify-center items-center px-4 rounded-t-2xl h-[90px] bottom-0 w-full bg-white">
      <CustomButton
        handlePress={() => router.push("/home")}
        title="Done"
        containerStyles="w-5/6"
      />
    </View>
  );
};

const BookingSuccess = () => {
  return (
    <View className="flex-1">
      {Page()}
      <RenderFooter />
    </View>
  );
};

export default BookingSuccess;
