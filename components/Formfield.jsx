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
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View>
      <Text className="pb-2">{tittle}</Text>
      <View
        className={`w-full h-[40] bg-[#F4F6F9] rounded-lg focus:border-primary px-4 ${fieldstyle} items-center flex-row`}
      >
        <TextInput
          className="flex-1 text-gray-700 font-InMedium text-base w-full"
          value={value}
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
