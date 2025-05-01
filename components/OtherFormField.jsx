import { View, Text, Image, TextInput } from "react-native";
import React, { useState } from "react";

import { TouchableOpacity } from "react-native";
import { icons } from "../constants";

const OtherFormField = ({
  tittle,
  titleStyle,
  placeholder,
  fieldstyle,
  value,
  handleChangeText,
  multiline,
  maxLength,
  numberOfLines,
  textAlignVertical,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View className="h-[120px] border-[1px] border-white focus:border-primary my-[9px] py-1 px-4 bg-[#F4F5F9] rounded-[7px] focus:bg-transparent">
      <Text
        className={`${titleStyle} font-InSemiBold text-[9px] text-[#939498]`}
      >
        {tittle}
      </Text>
      <View
        className={`justify-start w-full h-full items-center flex-row ${fieldstyle}`}
      >
        <TextInput
          className={`min-h-[40px] flex-1 text-black p-0 m-0  font-InSemiBold text-[11px] w-full h-full`}
          multiline={multiline}
          maxLength={maxLength}
          textAlignVertical={textAlignVertical}
          value={value}
          numberOfLines={numberOfLines}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8d"
          onChangeText={handleChangeText}
        />
      </View>
    </View>
  );
};

export default OtherFormField;
