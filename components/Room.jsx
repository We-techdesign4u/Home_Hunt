import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { icons } from "../constants";
import { router } from "expo-router";
import { useGlobalContext } from "../context/GlobalContextProvider";

import { databases, config } from "../lib/appwrite";
import { ID, Query, Permission, Role } from "react-native-appwrite";
import { useLocalSearchParams } from "expo-router";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { useCallback } from "react";
import { format, isToday, isThisWeek, parseISO } from "date-fns";

const Room = ({
  data: {
    receiverIdd,
    lastMessage,
    senderIdd,
    $updatedAt,
    isSeenS,
    isSeenR,
    $id,
  },
}) => {
  const { currentUser } = useGlobalContext();
  const [creator, setCreator] = useState([]);
  const [isSeen, setIsSeen] = useState(false);
  const [roomBg, setRoomBg] = useState("");

  // console.log(isSeenS);

  useEffect(() => {
    info();
  }, [isSeenS, isSeenR]);

  useEffect(() => {
    isSeenn();
  }, [isSeen]);

  // useFocusEffect(
  //   useCallback(() => {
  //     info();
  //     isSeenn();
  //   }, [isSeenS, isSeenR])
  // );

  const info = () => {
    console.log("--- info() called ---");
    console.log("currentUser.$id:", currentUser?.$id);
    console.log("receiverIdd.$id:", receiverIdd?.$id);
    console.log("senderIdd.$id:", senderIdd?.$id);
    console.log("isSeenR:", isSeenR);
    console.log("isSeenS:", isSeenS);

    if (receiverIdd.$id == currentUser.$id) {
      console.log(
        "Current user is the receiver. Setting isSeen to isSeenR:",
        isSeenR
      );
      setCreator(senderIdd);
      setIsSeen(isSeenR);
    } else {
      console.log(
        "Current user is NOT the receiver. Setting isSeen to isSeenS:",
        isSeenS
      );
      setCreator(receiverIdd);
      setIsSeen(isSeenS);
    }
    console.log("isSeen state after update:", isSeen);
  };

  const isSeenn = () => {
    console.log("--- isSeenn() called ---");
    console.log("Current isSeen state:", isSeen);
    if (!isSeen) {
      setRoomBg("bg-slate-200");
    } else {
      setRoomBg("");
    }
  };

  const dateTime = $updatedAt;
  const date = parseISO(dateTime);

  const MyDates = () => {
    if (isToday(date)) {
      return format(date, "h:mma");
    } else if (isThisWeek(date)) {
      let dDay = format(date, "EEEE");
      return format(date, "EEEE");
    } else {
      return format(date, "yyyy-MM-dd");
    }
  };

  const handleClick = async () => {
    router.push({
      pathname: "/messages",
      params: { creator: JSON.stringify(creator) },
    });
    try {
      if (receiverIdd?.$id === currentUser?.$id && !isSeenR) {
        await databases.updateDocument(
          config.databaseId,
          config.roomCollectionId,
          $id,
          { isSeenR: true }
        );
      } else if (senderIdd?.$id === currentUser?.$id && !isSeenS) {
        await databases.updateDocument(
          config.databaseId,
          config.roomCollectionId,
          $id,
          { isSeenS: true }
        );
      }
    } catch (error) {
      console.error("Error updating room seen status:", error);
    }
  };

  return (
    <TouchableOpacity
      onPress={() => handleClick()}
      className={`h-[85px] ${roomBg} w-full flex-row items-center border-gray-300 border-solid  border-b-[0.2px]`}
    >
      <View className="h-[55px] w-[55px] bg-slate-200 justify-center items-center rounded-full mx-3">
        <Image
          resizeMode="contain"
          className="w-12 h-12 rounded-full"
          source={{ uri: creator.avatar }}
        />
      </View>
      <View className="border-gray-400 flex-1 mr-3 h-full w-4/5 justify-center">
        <View className="flex-row  justify-between mb-2">
          <Text className="font-InSemiBold text-[14px]">
            {creator.username}
          </Text>

          <Text className="text-[12px] font-InSemiBold">{<MyDates />}</Text>
        </View>
        <View className="w-5/6 ">
          <Text
            ellipsizeMode="tail"
            numberOfLines={2}
            className="text-tsecondary text-[12px] font-InMedium"
          >
            {lastMessage}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Room;
