import {
  View,
  Text,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import React from "react";
import Formfield from "../../components/Formfield";
import CustomButton from "../../components/CustomButton";
import { router } from "expo-router";
import { useState } from "react";
import { icons } from "../../constants";
import OtherFormField from "../../components/OtherFormField";
import { useGlobalContext } from "../../context/GlobalContextProvider";

const AddProperties = () => {
  const [propertyInfo, setPropertyInfo] = useState({
    adType: "",
    title: "",
    state: "",
    country: "",
    lga: "",
    street: "",
    beds: "",
    baths: "",
    size: "",
    description: "",
    houseRules: "",
    amount: "",
  });
  return (
    <View className="flex-1">
      <Fields propertyInfo={propertyInfo} setPropertyInfo={setPropertyInfo} />

      <RenderFooter
        propertyInfo={propertyInfo}
        setPropertyInfo={setPropertyInfo}
      />
    </View>
  );
};

const RenderFooter = ({ propertyInfo }) => {
  const continueToNext = () => {
    // if (
    //   !propertyInfo.baths ||
    //   !propertyInfo.beds ||
    //   !propertyInfo.description ||
    //   !propertyInfo.title ||
    //   !propertyInfo.street ||
    //   !propertyInfo.state ||
    //   !propertyInfo.amount ||
    //   !propertyInfo.country
    // )
    // {
    //   return Alert.alert("Please fill all the fields");
    // }
    router.push({ pathname: "/gallery", params: propertyInfo });
  };
  return (
    <View className="absolute justify-center items-center px-4 rounded-t-2xl h-[90px] bottom-0 w-full bg-white">
      <CustomButton
        title="Continue"
        handlePress={() => continueToNext(propertyInfo)}
        containerStyles="w-5/6"
      />
    </View>
  );
};

const Fields = ({ propertyInfo, setPropertyInfo }) => {
  var option = [
    { type: "Property for sale", id: "For-sale" },
    { type: "Property to let", id: "To-let" },
  ];
  return (
    <ScrollView className="">
      <View className=" pt-3 mb-[250px] px-4">
        <Text className="text-lg font-InBold">Property Information*</Text>
        <View className="mt-5 h-[1000px] justify-between mb-[40px]">
          <View className="border-[0.2px] rounded-2xl mb-[10px] bg-white border-gray-300 px-4">
            {option.map((options, key) => {
              return (
                <View key={options.id}>
                  {propertyInfo.adType == options.id ? (
                    <TouchableOpacity className="flex-row border-b-[0.2px] border-gray-300 justify-between items-center">
                      <View className="h-10  justify-center">
                        <Text className="text-base font-InSemiBold text-tsecondary">
                          {options.type}
                        </Text>
                      </View>

                      <View className="h-[20px] w-[20px] border-[1px] justify-center border-primary items-center rounded-full">
                        <View className="h-[10px] rounded-full bg-primary w-[10px]"></View>
                      </View>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() => {
                        setPropertyInfo({
                          ...propertyInfo,
                          adType: options.id,
                        });
                      }}
                      className="flex-row justify-between border-b-[0.2px] border-gray-300 items-center"
                    >
                      <View className="h-10  justify-center">
                        <Text className="text-[11px] font-InMedium text-tsecondary">
                          {options.type}
                        </Text>
                      </View>

                      <View className="h-[20px] w-[20px] border-[1px] justify-center border-primary items-center rounded-full"></View>
                    </TouchableOpacity>
                  )}
                </View>
              );
            })}
          </View>

          <View className="px-4 py-4 my-[9px] rounded-2xl w-full h-auto bg-white ">
            <Formfield
              tittle={"Property Name*"}
              value={propertyInfo.title}
              maxLength={40}
              tittlestyle={"font-InSemiBold"}
              placeholder={"Property Name"}
              handleChangeText={(e) => {
                setPropertyInfo({ ...propertyInfo, title: e });
              }}
            />

            <View className="flex-row">
              <ShortFormfield
                tittle="Beds*"
                placeholder="# of beds"
                imageSource={icons.bed}
                value={propertyInfo.beds}
                handleChangeText={(e) => {
                  setPropertyInfo({ ...propertyInfo, beds: e });
                }}
              />
              <ShortFormfield
                tittle="Baths*"
                placeholder="# of baths"
                imageSource={icons.bath}
                value={propertyInfo.baths}
                handleChangeText={(e) => {
                  setPropertyInfo({ ...propertyInfo, baths: e });
                }}
              />

              <ShortFormfield
                tittle="Size"
                placeholder="123sq"
                imageSource={icons.size}
                value={propertyInfo.size}
                handleChangeText={(e) => {
                  setPropertyInfo({ ...propertyInfo, size: e });
                }}
              />
            </View>

            <Formfield
              tittle={"Amount*"}
              value={propertyInfo.amount}
              tittlestyle={"font-InSemiBold"}
              placeholder={"Amount"}
              handleChangeText={(e) => {
                setPropertyInfo({ ...propertyInfo, amount: e });
              }}
            />
          </View>

          <View className="px-4 py-4 my-[9px] rounded-2xl w-full h-auto bg-white ">
            <Formfield
              tittle={"Property Address*"}
              value={propertyInfo.sreet}
              tittlestyle={"font-InSemiBold"}
              placeholder={"Street Address"}
              handleChangeText={(e) => {
                setPropertyInfo({ ...propertyInfo, street: e });
              }}
            />

            <Formfield
              tittle={"State*"}
              value={propertyInfo.State}
              tittlestyle={"font-InSemiBold"}
              placeholder={"State"}
              handleChangeText={(e) => {
                setPropertyInfo({ ...propertyInfo, state: e });
              }}
            />

            <Formfield
              tittle={"Country*"}
              value={propertyInfo.country}
              tittlestyle={"font-InSemiBold"}
              placeholder={"Country"}
              handleChangeText={(e) => {
                setPropertyInfo({ ...propertyInfo, country: e });
              }}
            />

            <Formfield
              tittle={"Local Goverment*"}
              value={propertyInfo.lga}
              tittlestyle={"font-InSemiBold"}
              placeholder={"Local Goverment"}
              handleChangeText={(e) => {
                setPropertyInfo({ ...propertyInfo, lga: e });
              }}
            />
          </View>

          <View className="px-4 py-4 my-[9px] rounded-2xl w-full h-auto bg-white ">
            <OtherFormField
              titleStyle={"font-InSemiBold text-sm"}
              tittle="Description*"
              placeholder={"Describe the qualities of the house"}
              fieldstyle={"h-[150px]"}
              maxLength={2000}
              numberOfLines={8}
              multiline={true}
              textAlignVertical={"top"}
              value={propertyInfo.description}
              handleChangeText={(e) => {
                setPropertyInfo({ ...propertyInfo, description: e });
              }}
            />
          </View>

          <View className="px-4 py-4 my-[9px] rounded-2xl w-full h-auto bg-white ">
            <OtherFormField
              titleStyle={"font-InSemiBold text-sm"}
              tittle="House Rules"
              placeholder={"Rules to follow while living in"}
              fieldstyle={"h-[150px]"}
              maxLength={2000}
              numberOfLines={8}
              multiline={true}
              textAlignVertical={"top"}
              value={propertyInfo.houseRules}
              handleChangeText={(e) => {
                setPropertyInfo({ ...propertyInfo, houseRules: e });
              }}
            />
          </View>

          {/* {AddImages()} */}
        </View>
      </View>
    </ScrollView>
  );
};

export default AddProperties;

const ShortFormfield = ({
  tittle,
  placeholder,
  fieldstyle,
  value,
  handleChangeText,
  tittlestyle,
  imageSource,

  ...props
}) => {
  return (
    <View className="w-1/3 h-[48px] border-[1px] border-white focus:border-primary my-[9px] py-1 px-4 bg-[#F4F5F9] rounded-[7px] focus:bg-transparent">
      <Text className={"font-InSemiBold text-[9px] text-[#939498]"}>
        {tittle}
      </Text>

      <View className={`w-full h-[25px] items-center flex-row ${fieldstyle}`}>
        <TextInput
          className="text-black p-0 m-0  font-InSemiBold text-[11px] w-full h-full"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8d"
          onChangeText={handleChangeText}
        />
      </View>
    </View>
  );
};
