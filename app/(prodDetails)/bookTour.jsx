import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { icons } from "../../constants";
import Formfield from "../../components/Formfield";
import CustomButton from "../../components/CustomButton";
import OtherFormField from "../../components/OtherFormField";

const renderFooter = () => {
  return (
    <View className="absolute justify-center items-center px-4 rounded-t-2xl h-[90px] bottom-0 w-full bg-white">
      <CustomButton title="Schedule Tour" containerStyles="w-5/6" />
    </View>
  );
};

const dtail = () => {
  return (
    <View className="px-4 pt-6 pb-[90px] w-full  bg-white">
      <View className="flex-row mb-4">
        <Image
          className="mr-2 w-4 h-4 object-contain"
          source={icons.star}
          tintColor={"#FCBB44"}
        />
        <Text> 4.5 &#40;365 reviews&#41;</Text>
      </View>
      <View className="py-4 border-gray-200 border-b-[0.2px]">
        <Text className="text-2xl font-InSemiBold">Woodland Apartments</Text>
        <Text className="text-tsecondary">
          1012 Ocean avenue, New York, USA
        </Text>
      </View>
      <View>
        <View className=" py-4">
          <Text className="text-tsecondary">BOOK TOUR</Text>
        </View>
        <View className="pb-4">
          <OtherFormField
            titleStyle={"font-InSemiBold text-xl"}
            tittle="Day"
            placeholder={"dd/mm/yyyy"}
            fieldstyle={"h-[35px]"}
            maxLength={10}
            numberOfLines={1}
            multiline={false}
          />
        </View>
        <View className="pb-4">
          <OtherFormField
            titleStyle={"font-InSemiBold text-xl"}
            tittle="Time"
            placeholder={"hh:mm AM/PM"}
            fieldstyle={"h-[40px]"}
            maxLength={10}
            numberOfLines={1}
            multiline={false}
          />
        </View>
        <View className="bg-gray-100 h-8 mt-6 rounded-l flex-row p-2">
          <View className="w-[3px] bg-primary h-full mr-2"></View>
          <TouchableOpacity>
            <Text>
              Want a custom schedule?
              <Text className="text-primary font-InMedium">
                {"         "} Reqeust Schedule
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const BookTour = () => {
  return (
    <View className="flex-1 ">
      {dtail()}
      {renderFooter()}
    </View>
  );
};
export default BookTour;
