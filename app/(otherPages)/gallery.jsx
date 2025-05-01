import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  FlatList,
} from "react-native";
import React from "react";
import Formfield from "../../components/Formfield";
import CustomButton from "../../components/CustomButton";
import { router } from "expo-router";
import { useState } from "react";
import { icons } from "../../constants";
import OtherFormField from "../../components/OtherFormField";
import { useGlobalContext } from "../../context/GlobalContextProvider";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import { createProperty } from "../../lib/appwrite";
import { useLocalSearchParams } from "expo-router";

const RenderFooter = ({ propertyPhoto }) => {
  const params = useLocalSearchParams();
  const {
    adType,
    title,
    state,
    country,
    lga,
    street,
    beds,
    baths,
    size,
    description,
    houseRules,
    amount,
  } = params;

  const { cover, pictures } = propertyPhoto;
  const propertyInfo = {
    adType,
    title,
    state,
    country,
    lga,
    street,
    beds,
    baths,
    size,
    description,
    houseRules,
    amount,
    cover,
    pictures,
  };

  const { currentUser } = useGlobalContext();

  const [uploading, setUploading] = useState(false);

  const submit = async () => {
    if (
      propertyPhoto.cover.length === 0 ||
      propertyPhoto.pictures.length === 0
    ) {
      return Alert.alert("Please upload some pictures");
    }
    setUploading(true);

    try {
      await createProperty(
        {
          ...propertyInfo,
        },
        currentUser
      );

      Alert.alert("Success", "Property uploaded successfully");
      router.push("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <View className="absolute justify-center items-center px-4 rounded-t-2xl h-[90px] bottom-0 w-full bg-white">
      <CustomButton
        title="Submit"
        handlePress={() => submit()}
        containerStyles="w-5/6"
      />
    </View>
  );
};

const Fields = () => {
  const [propertyPhoto, setPropertyPhoto] = useState({
    cover: [],
    pictures: [],
  });

  const openPicker = async (selectType) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      aspect: [4, 3],
      quality: 1,
    });

    const checkifpictureExist = propertyPhoto.pictures.find(
      (item) => item.fileName === result.assets[0].fileName
    );

    if (!result.canceled) {
      if (selectType === "coverimage") {
        setPropertyPhoto({
          ...propertyPhoto,
          cover: [result.assets[0]],
        });
      }

      if (selectType === "image") {
        if (checkifpictureExist) {
        } else {
          // setForm({ ...form, pictures: result.assets[0] });
          setPropertyPhoto({
            ...propertyPhoto,
            pictures: [...propertyPhoto.pictures, result.assets[0]],
          });
        }
      }
    }
  };

  const removepicture = (clicked) => {
    const newpropertypictures = propertyPhoto.pictures.filter(
      (item) => item.fileName !== clicked.fileName
    );

    setPropertyPhoto({ ...propertyPhoto, pictures: [...newpropertypictures] });
  };

  // console.log(propertyInfo.cover);

  return (
    <View className="h-full pt-3 w-full px-0 pb-[110px]">
      <View className="absolute w-full bottom-0">
        <RenderFooter propertyPhoto={propertyPhoto} />
      </View>
      <FlatList
        className="px-4"
        data={propertyPhoto.pictures}
        keyExtractor={(item) => item.fileSize}
        ListHeaderComponent={
          <View>
            <Text className="text-lg font-InBold">Add Property Image</Text>
            <View className="flex-1 my-4 w-full px-4 py-4  rounded-2xl h-auto bg-white ">
              <View className="">
                <Text className={` font-InSemiBold text-[11px] text-black`}>
                  Upload Cover Photo
                </Text>
                <Text
                  className={` font-InSemiBold text-[9px] py-1 text-[#939498]`}
                >
                  Please upload property cover photo
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => openPicker("coverimage")}
                style={{
                  borderWidth: 1,
                  borderStyle: "dashed",
                  borderColor: "black",
                  borderTopColor: "white",
                  backgroundColor: "#DFFFE7",
                }}
                className="h-[200px] justify-center items-center w-full rounded-lg border-dashed border-[1px]"
              >
                {propertyPhoto.cover.length === 0 ? (
                  <View className="justify-center items-center">
                    <Image
                      source={icons.upload}
                      className="mr-1 w-10 h-10"
                      resizeMode="contain"
                      tintColor={"#7b7b8d"}
                    />
                    <Text className="text-center text-lg pb-3 font-InSemiBold text-tsecondary">
                      COVER PHOTO
                    </Text>
                    <Text className="text-primary">Choose a file</Text>
                    <Text> JPEG, PNG, SVG, or GIF max. 20mb </Text>
                  </View>
                ) : (
                  <Image
                    source={{ uri: propertyPhoto.cover[0].uri }}
                    className="w-full h-full"
                    resizeMode="cover"
                  />
                )}
              </TouchableOpacity>
            </View>
          </View>
        }
        ListFooterComponent={
          <View>
            <TouchableOpacity
              onPress={() => openPicker("image")}
              className="flex-row  mt-4 items-center"
            >
              <Image
                source={icons.addImage}
                className="mr-1"
                tintColor={"#00B22D"}
              />
              <Text className="font-InSemiBold text-primary">
                add more photo
              </Text>
            </TouchableOpacity>
          </View>
        }
        renderItem={({ item }) => (
          <View className="w-full h-[70px] px-4 my-1 justify-center bg-white rounded-2xl">
            <View className="flex-row justify-between">
              <View className="flex-row justify-center items-center">
                {propertyPhoto.pictures ? (
                  <Image
                    source={{ uri: item.uri }}
                    className=" mr-1 w-10 h-full"
                    resizeMode="cover"
                  />
                ) : (
                  <Image
                    source={icons.file}
                    className="mr-1 w-10 h-full"
                    resizeMode="contain"
                    tintColor={"#7b7b8d"}
                  />
                )}

                <View className="w-[200px]">
                  <Text ellipsizeMode="tail" numberOfLines={1}>
                    {item.fileName}
                  </Text>
                  <Text>{(item.fileSize / (1024 * 1024)).toFixed(2)}.mb</Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => removepicture(item)}
                className=" "
              >
                <Image
                  source={icons.plus}
                  className="mr-1 rotate-45 w-4 "
                  resizeMode="contain"
                  tintColor={"#FA7171"}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default Fields;
