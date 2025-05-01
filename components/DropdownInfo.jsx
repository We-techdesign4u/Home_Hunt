import { View, Text, Image } from "react-native";
import React from "react";
import { icons } from "../constants";
import { TouchableOpacity } from "react-native";
import { useState } from "react";

const DropdownInfo = ({ title, description, icon, iconboxStyle }) => {
  const [open, setOpen] = useState(false);

  return (
    <TouchableOpacity
      onPress={() => setOpen(!open)}
      className="p-4 bg-white flex-1 border-[0px] mx-4 my-2 rounded-lg"
    >
      <View className="flex-row h-[30px]  justify-center items-center">
        <View className={`${iconboxStyle} justify-center items-center`}>
          <Image
            className="h-5"
            resizeMode="contain"
            tintColor={"#00B22D"}
            source={icon}
          />
        </View>
        <View className="flex-1">
          <Text className="text-base font-InMedium">{title}</Text>
        </View>
        <View>
          {open ? (
            <Image
              className="rotate-90 w-[13px] h-[13px]"
              tintColor={"#8b8b8b"}
              resizeMode="contain"
              source={icons.arrorHead}
            />
          ) : (
            <Image
              className="-rotate-90 w-[13px] h-[13px]"
              resizeMode="contain"
              tintColor={"#8b8b8b"}
              source={icons.arrorHead}
            />
          )}
        </View>
      </View>
      <View>
        {open ? (
          <View>
            <View className="bg-slate-400 h-[0.2px] my-2"></View>
            <View>
              <Text>{description}</Text>
            </View>
          </View>
        ) : (
          <View></View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default DropdownInfo;
