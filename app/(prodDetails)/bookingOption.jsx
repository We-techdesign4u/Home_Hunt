import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { icons, images } from "../../constants";
import CustomButton from "../../components/CustomButton";
import { router } from "expo-router";

const BookingOption = () => {
  return (
    <View className="bg-gray-50 flex-1 pt-3">
      {Radio()}
      {renderFooter()}
    </View>
  );
};

const renderFooter = () => {
  return (
    <View className="absolute justify-center items-center px-4 rounded-t-2xl h-[90px] bottom-0 w-full bg-white">
      <CustomButton
        title="Continue"
        handlePress={() => router.push("/customerInfo")}
        containerStyles="w-5/6"
      />
    </View>
  );
};

export default BookingOption;

const Radio = () => {
  const [checked, setChecked] = useState(0);

  var gender = ["Tour the Property", "Buy the Property", "Rent the Property"];

  return (
    <View className="px-4">
      <Text className="font-InSemiBold my-4 text-xl">Booking Options</Text>
      <View className="border-[0.2px] rounded-lg mb-[30px] bg-white border-gray-300 px-2">
        {gender.map((gender, key) => {
          return (
            <View key={gender}>
              {checked == key ? (
                <TouchableOpacity className="flex-row border-b-[0.2px] border-gray-300 justify-between items-center">
                  <View className="h-10  justify-center">
                    <Text className="text-base font-InMedium text-tsecondary">
                      {gender}
                    </Text>
                  </View>

                  <View className="h-[20px] w-[20px] border-[1px] justify-center border-primary items-center rounded-full">
                    <View className="h-[10px] rounded-full bg-primary w-[10px]"></View>
                  </View>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    setChecked(key);
                  }}
                  className="flex-row justify-between border-b-[0.2px] border-gray-300 items-center"
                >
                  <View className="h-10  justify-center">
                    <Text className="text-base font-InMedium text-tsecondary">
                      {gender}
                    </Text>
                  </View>

                  <View className="h-[20px] w-[20px] border-[1px] justify-center border-primary items-center rounded-full"></View>
                </TouchableOpacity>
              )}
            </View>
          );
        })}
      </View>
      <Text className="text-base font-InBold">
        You Choose to<Text className="text-primary"> {gender[checked]}</Text>
      </Text>
    </View>
  );
};
