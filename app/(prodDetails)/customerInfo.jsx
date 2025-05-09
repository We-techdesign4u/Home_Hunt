import { View, Text, ScrollView } from "react-native";
import React from "react";
import Formfield from "../../components/Formfield";
import CustomButton from "../../components/CustomButton";
import { router } from "expo-router";

import { useLocalSearchParams } from "expo-router";
import { useGlobalContext } from "../../context/GlobalContextProvider";
import { useState } from "react";

const CustomerInfo = () => {
  const { currentUser } = useGlobalContext();
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
    gender: "",
  });

  const params = useLocalSearchParams();

  const allData = JSON.parse(params.data);

  const RenderFooter = (allData) => {
    return (
      <View className="absolute justify-center items-center px-4 rounded-t-2xl h-[90px] bottom-0 w-full bg-white">
        <CustomButton
          title="Continue"
          // handlePress={() => router.push("/bookingSuccess")}
          handlePress={() =>
            router.push({
              pathname: "/bookingSuccess",
              params: { data: JSON.stringify(allData.allData) },
            })
          }
          containerStyles="w-5/6"
        />
      </View>
    );
  };

  const Fields = () => {
    return (
      <ScrollView className="">
        <View className=" pt-3 px-4">
          <Text className="text-lg font-InBold">Your Personal Details</Text>
          <View className="px-4 py-4 my-[9px] rounded-2xl w-full h-auto bg-white ">
            <Formfield
              // tittle={"Name"}
              // tittlestyle={"font-InSemiBold"}
              // placeholder={"Name"}

              tittle="Full Name"
              value={userInfo.username}
              placeholder="John Doe"
              fieldstyle="w-full mb-5"
              handleChangeText={(e) => {
                setUserInfo({ ...userInfo, username: e });
              }}
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
            <Formfield
              tittle="Gender"
              placeholder="Male"
              value={userInfo.gender}
              fieldstyle="w-full mb-5"
              handleChangeText={(e) => {
                setUserInfo({ ...userInfo, gender: e });
              }}
            />
            <Formfield
              tittle="Phone Number"
              keyboardType="phone-pad"
              value={userInfo.phoneNumber}
              placeholder="+234 5679 9000"
              fieldstyle="w-full mb-5"
              handleChangeText={(e) => {
                setUserInfo({ ...userInfo, phoneNumber: e });
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
          </View>
        </View>
      </ScrollView>
    );
  };

  return (
    <View className="flex-1">
      {Fields()}
      <RenderFooter allData={allData} />
    </View>
  );
};

export default CustomerInfo;
