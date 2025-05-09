import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Formfield from "../../components/Formfield";
import CustomButton from "../../components/CustomButton";
import { useState } from "react";
import { icons } from "../../constants";
import { Link } from "expo-router";
import { updateUserInfo } from "../../lib/appwrite";
import { router } from "expo-router";
import { useGlobalContext } from "../../context/GlobalContextProvider";
import OtherFormField from "../../components/OtherFormField";
import * as ImagePicker from "expo-image-picker";

const ProfileUpdate = () => {
  const { setisLoggedIn, currentUser } = useGlobalContext();
  const [userInfo, setUserInfo] = useState({
    username: currentUser?.username,
    phoneNumber: currentUser?.phoneNumber,
    email: currentUser?.email,
    street: currentUser?.street,
    state: currentUser?.state,
    country: currentUser?.country,
    lga: currentUser?.lga,
    aboutMe: currentUser?.aboutMe,
    city: currentUser?.city,
  });

  const {
    username,
    phoneNumber,
    email,
    street,
    state,
    country,
    lga,
    aboutMe,
    city,
  } = userInfo;

  const [userPhoto, setUserPhoto] = useState({
    cover: [],
    picture: [],
  });

  const { cover, picture } = userPhoto;

  const userUpdatedInformation = {
    username,
    phoneNumber,
    email,
    street,
    state,
    country,
    lga,
    aboutMe,
    city,
    cover,
    picture,
  };

  const [form, setForm] = useState({ email: "", password: "" });

  const [isLoading, setIsLoading] = useState(false);

  const RenderFooter = ({ userInfo }) => {
    const submit = async () => {
      setIsLoading(true);

      try {
        await updateUserInfo(
          {
            ...userUpdatedInformation,
          },
          currentUser
        );

        Alert.alert("Success", "User information uploaded successfully");
        router.push("/home");
      } catch (error) {
        Alert.alert("Error", error.message);
      } finally {
        setIsLoading(false);
        // setisLoggedIn(true);
      }
      // setisLoggedIn(true);
      // createUser();
    };

    return (
      <View className="absolute justify-center items-center px-4 rounded-t-2xl h-[90px] bottom-0 w-full bg-white">
        <CustomButton
          title="Update Profile"
          handlePress={() => submit()}
          containerStyles="w-5/6"
          isLoading={isLoading}
        />
      </View>
    );
  };

  const Fields = () => {
    const openPicker = async (selectType) => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        if (selectType === "coverimage") {
          setUserPhoto({
            ...userPhoto,
            cover: [result.assets[0]],
          });
        } else if (selectType === "image") {
          setUserPhoto({
            ...userPhoto,
            picture: [result.assets[0]],
          });
        }
      }
    };

    return (
      <ScrollView className="">
        <View className="mb-[250px]">
          <TouchableOpacity
            onPress={() => openPicker("coverimage")}
            className="justify-center items-center h-[160px] mb-[70px] bg-slate-400  "
          >
            {userPhoto.cover.length === 0 ? (
              <Image
                source={{ uri: currentUser?.coverPicture }}
                className="w-full absolute h-full"
                resizeMode="cover"
              />
            ) : (
              <Image
                source={{ uri: userPhoto?.cover[0].uri }}
                className="w-full absolute h-full"
                resizeMode="cover"
              />
            )}

            <View className="w-[92px] h-[92px] mt-20 -mb-[100px] bg-slate-200 border-2 border-solid border-black rounded-full justify-center items-center">
              {userPhoto.picture.length === 0 ? (
                <View>
                  {currentUser.profilePicture !== null ? (
                    <Image
                      source={{ uri: currentUser?.profilePicture }}
                      className="w-[92px] h-[92px] rounded-full justify-center items-center"
                      resizeMode="cover"
                    />
                  ) : (
                    <Image
                      source={{ uri: currentUser?.avatar }}
                      className="w-[92px] h-[92px] rounded-full justify-center items-center "
                      resizeMode="cover"
                    />
                  )}
                </View>
              ) : (
                <View>
                  <Image
                    source={{ uri: userPhoto.picture[0].uri }}
                    className="w-[92px] h-[92px] rounded-full justify-center items-centerl"
                    resizeMode="cover"
                  />
                </View>
              )}
              <TouchableOpacity
                onPress={() => openPicker("image")}
                className="absolute w-[32px] h-[32px] rounded-full border-white border-2 bg-primary justify-center items-center bottom-0 -right-1"
              >
                <Image source={icons.edit} />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
          <View className="pt-3 px-4 ">
            <View className="px-4 py-4 my-[9px] rounded-2xl w-full h-auto bg-white">
              <Formfield
                tittle="Full Name"
                value={userInfo.username}
                placeholder="John Doe"
                fieldstyle="w-full mb-5"
                handleChangeText={(e) => {
                  setUserInfo({ ...userInfo, username: e });
                }}
              />
              <Formfield
                tittle="Phone Number"
                value={userInfo.phoneNumber}
                placeholder="+234 5679 9000"
                fieldstyle="w-full mb-5"
                handleChangeText={(e) => {
                  setUserInfo({ ...userInfo, phoneNumber: e });
                }}
                keyboardType="Number-pad"
              />
              <Formfield
                tittle="Email"
                value={userInfo.email}
                placeholder="example@gmail.com"
                fieldstyle="w-full mb-5"
                handleChangeText={(e) => {
                  setUserInfo({ ...userInfo, email: e });
                }}
                keyboardType="email-address"
              />
            </View>
            <View className="px-4 py-4 my-[9px] rounded-2xl w-full h-auto bg-white ">
              <Formfield
                tittle={"Street*"}
                value={userInfo.street}
                tittlestyle={"font-InSemiBold"}
                placeholder={"Street Address"}
                handleChangeText={(e) => {
                  setUserInfo({ ...userInfo, street: e });
                }}
              />
              <Formfield
                tittle={"city*"}
                value={userInfo.city}
                tittlestyle={"font-InSemiBold"}
                placeholder={"City"}
                handleChangeText={(e) => {
                  setUserInfo({ ...userInfo, city: e });
                }}
              />

              <Formfield
                tittle={"State*"}
                value={userInfo.state}
                tittlestyle={"font-InSemiBold"}
                placeholder={"State"}
                handleChangeText={(e) => {
                  setUserInfo({ ...userInfo, state: e });
                }}
              />

              <Formfield
                tittle={"Country*"}
                value={userInfo.country}
                tittlestyle={"font-InSemiBold"}
                placeholder={"Country"}
                handleChangeText={(e) => {
                  setUserInfo({ ...userInfo, country: e });
                }}
              />

              <Formfield
                tittle={"Local Goverment*"}
                value={userInfo.lga}
                tittlestyle={"font-InSemiBold"}
                placeholder={"Local Goverment"}
                handleChangeText={(e) => {
                  setUserInfo({ ...userInfo, lga: e });
                }}
              />
            </View>

            <View className="px-4 py-4 my-[9px] rounded-2xl w-full h-auto bg-white ">
              <OtherFormField
                titleStyle={"font-InSemiBold text-sm"}
                tittle="About Me*"
                placeholder={"Describe the qualities of the house"}
                fieldstyle={"h-[150px]"}
                maxLength={2000}
                numberOfLines={8}
                multiline={true}
                textAlignVertical={"top"}
                value={userInfo.aboutMe}
                handleChangeText={(e) => {
                  setUserInfo({ ...userInfo, aboutMe: e });
                }}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    );
  };

  return (
    <View className="flex-1">
      <Fields />
      <RenderFooter />
    </View>
  );
};

export default ProfileUpdate;
