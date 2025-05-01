import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { icons } from "../../constants";
import Formfield from "../../components/Formfield";
import CustomButton from "../../components/CustomButton";
import OtherFormField from "../../components/OtherFormField";

const renderFooter = () => {
  return (
    <View className="absolute justify-center items-center px-4 rounded-t-2xl h-[90px] bottom-0 w-full bg-white">
      <CustomButton title="Submit" containerStyles="w-5/6" />
    </View>
  );
};

const dtail = () => {
  return (
    <View className="px-4 pt-0 pb-[90px] w-full  ">
      <View className="bg-white pt-6 -mx-4 px-4 pb-6">
        <View className="flex-row mb-4">
          <Image
            className="mr-2 w-4 h-4 object-contain"
            source={icons.star}
            tintColor={"#FCBB44"}
          />
          <Text> 4.5 &#40;365 reviews&#41;</Text>
        </View>
        <Text className="text-2xl font-InSemiBold">Woodland Apartments</Text>
        <Text className="text-tsecondary">
          1012 Ocean avenue, New York, USA
        </Text>
      </View>
      <View className=" border-t-[0.2px] border-gray-200">
        <View className="justify-center h-[130px] items-center">
          <Text className="text-tsecondary">
            Your overall rating of this product
          </Text>
          <View className="flex-row gap-x-5 mt-4">
            <Image
              className=" w-7 h-7 object-contain"
              source={icons.star}
              tintColor={"#FCBB44"}
            />
            <Image
              className=" w-7 h-7 object-contain"
              source={icons.star}
              tintColor={"#FCBB44"}
            />
            <Image
              className=" w-7 h-7 object-contain"
              source={icons.star}
              tintColor={"#FCBB44"}
            />
            <Image
              className=" w-7 h-7 object-contain"
              source={icons.star}
              tintColor={"#FCBB44"}
            />
            <Image
              className=" w-7 h-7 object-contain"
              source={icons.star}
              tintColor={"#FCBB44"}
            />
          </View>
        </View>
        <View>
          <OtherFormField
            titleStyle={"font-InRegular text-tsecondary text-sm"}
            tittle="Add detailed review"
            placeholder={"Your text here"}
            fieldstyle={"h-[100px]"}
            maxLength={40}
            numberOfLines={4}
            multiline={true}
            textAlignVertical={"top"}
          />

          <TouchableOpacity className="flex-row  mt-4 items-center">
            <Image
              source={icons.addImage}
              className="mr-1"
              tintColor={"#00B22D"}
            />
            <Text className="font-InSemiBold text-primary">add photo</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const AddReview = () => {
  return (
    <View className="flex-1 ">
      {dtail()}
      {renderFooter()}
    </View>
  );
};
export default AddReview;
