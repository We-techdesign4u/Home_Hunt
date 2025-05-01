import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { icons, images } from "../../constants";
import CustomButton from "../../components/CustomButton";

const Page = () => {
  return (
    <View className="flex-1 px-4">
      <View className="items-center h-1/2 pb-6 justify-end">
        <View className="h-[120px] justify-center items-center w-[120px] mb-5 bg-primary rounded-full">
          <Image source={icons.check} />
        </View>
        <Text className="font-InBold text-2xl leading-10">
          Request Received!
        </Text>
        <Text className="leading-10">
          We're Checking if the home can be seeon on
        </Text>
        <Text className="font-InBold">Fri, October 4, 6:00PM</Text>
      </View>
      <View className="pt-6 border-t-[0.2px] border-gray-300">
        <Text className="text-tsecondary text-base">
          Agent Will take you on the tour!
        </Text>

        <View className="flex-row justify-between my-3">
          <TouchableOpacity className="flex-row">
            <Image
              className="w-8 mr-3 h-8 rounded-full"
              source={images.profileImage}
            />
            <View>
              <Text className="font-InSemiBold text-base">John Doe</Text>
              <Text className="text-sm text-tsecondary">New York, USA</Text>
            </View>
          </TouchableOpacity>
          <View className="flex-row">
            <TouchableOpacity className="w-8 h-8 justify-center items-center rounded-full mr-3 bg-white">
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

const renderFooter = () => {
  return (
    <View className="absolute justify-center items-center px-4 rounded-t-2xl h-[90px] bottom-0 w-full bg-white">
      <CustomButton title="Done" containerStyles="w-5/6" />
    </View>
  );
};

const BookingSuccess = () => {
  return (
    <View className="flex-1">
      {Page()}
      {renderFooter()}
    </View>
  );
};

export default BookingSuccess;
