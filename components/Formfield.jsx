import { View, Text, Image, TextInput } from "react-native";
import React, { useState } from "react";

import { TouchableOpacity } from "react-native";
import { icons } from "../constants";

const Formfield = ({
  tittle,
  placeholder,
  fieldstyle,
  value,
  handleChangeText,
  tittlestyle,
  maxLength,

  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View className="h-[48px] border-[1px] border-white focus:border-primary my-[9px] py-1 px-4 bg-[#F4F5F9] rounded-[7px] focus:bg-transparent">
      <Text
        className={`${tittlestyle} font-InSemiBold text-[9px] text-[#939498]`}
      >
        {tittle}
      </Text>
      <View className={`w-full h-[25px] items-center flex-row ${fieldstyle}`}>
        <TextInput
          className="text-black p-0 m-0  font-InSemiBold text-[11px] w-full -mr-4 h-full"
          value={value}
          maxLength={maxLength}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8d"
          onChangeText={handleChangeText}
          secureTextEntry={tittle === "Password" && !showPassword}
        />
        {tittle === "Password" && (
          <TouchableOpacity
            className=""
            onPress={() => setShowPassword(!showPassword)}
          >
            <Image
              resizeMode="contain"
              className="w-6 h-6"
              source={!showPassword ? icons.eye : icons.eyeHide}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Formfield;
