import { View, Text, ScrollView, Image, Alert } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Formfield from "../../components/Formfield";
import CustomButton from "../../components/CustomButton";
import { useState, useEffect } from "react";
import { icons } from "../../constants";
import { Link } from "expo-router";
import { getCurrentUser, signIn } from "../../lib/appwrite";
import { router } from "expo-router";
import { useGlobalContext } from "../../context/GlobalContextProvider";

const SignIn = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [shouldNavigate, setShouldNavigate] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    setisLoggedIn,
    isLoggedIn,
    setCurrentUser,
    currentUser,
    setUserAddress,
    userAddress,
  } = useGlobalContext();

  const submit = async () => {
    if (!form.email || !form.password) {
      Alert.alert("Error", "Please fill in all the fields");
    }

    setIsSubmitting(true);

    try {
      await signIn(form.email, form.password);
      // set it to global state...
      const result = await getCurrentUser();
      setCurrentUser(result);
      setisLoggedIn(true);
      setUserAddress(
        result?.city + ", " + result?.state + ", " + result?.country
      );

      setShouldNavigate(true);
      // router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
      if (error.message.includes("session is active")) {
        setisLoggedIn(true);
        setShouldNavigate(true);
        // router.replace("/home");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // console.log("address", userAddress);

  useEffect(() => {
    if (shouldNavigate && isLoggedIn) {
      // Navigate only if logged in
      router.replace("/home");
      setShouldNavigate(false); // Reset the flag
    }
  }, [shouldNavigate, isLoggedIn, router]);

  return (
    <SafeAreaView className="h-full px-4 ">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="h-full justify-center items-center w-full ">
          <Text className="font-InMedium text-3xl text-center">Sign In</Text>
          <Text className="text-center text-gray-700 text-base mt-3 mb-14">
            Hi! Welcome back, you've been missed
          </Text>
          <View className="px-4 py-4 my-[9px] rounded-2xl w-full h-auto bg-white">
            <Formfield
              tittle="Email"
              value={form.email}
              placeholder="example@gmail.com"
              fieldstyle="w-full mb-5"
              handleChangeText={(e) => {
                setForm({ ...form, email: e });
              }}
              keyboardType="email-address"
            />
            <Formfield
              value={form.password}
              tittle="Password"
              placeholder="password"
              fieldstyle="w-full mb-5"
              passwordfield=""
              handleChangeText={(e) => {
                setForm({ ...form, password: e });
              }}
            />
            <Link
              href={"./"}
              className="text-right font-InSemiBold text-primary underline"
            >
              Forgot Password?
            </Link>
          </View>
          <CustomButton
            title="Sign In"
            handlePress={submit}
            containerStyles="w-80 mt-5"
            isLoading={isSubmitting}
          />
          <Text className="my-9 text-base text-gray-400">Or sign in with</Text>
          <View className="flex-row">
            <View className="w-[60] h-[60] border-[0.5px] border-gray-400 rounded-full mx-2 items-center justify-center">
              <Image
                className="h-[30]"
                resizeMode="contain"
                source={icons.apple}
              />
            </View>
            <View className="w-[60] h-[60]  border-[0.5px] border-gray-400 rounded-full mx-2 relative items-center justify-center">
              <Image
                className="h-[30]"
                resizeMode="contain"
                source={icons.google}
              />
            </View>
            <View className="w-[60] h-[60]  border-[0.5px] border-gray-400 rounded-full mx-2 items-center justify-center">
              <Image
                className="h-[30]"
                resizeMode="contain"
                source={icons.facebook}
                tintColor={"#00B22D"}
              />
            </View>
          </View>
          <View className="flex-row items-center">
            <Text className="mt-10 font-InSemiBold text-lg">
              Don't have an account?{" "}
            </Text>
            <Link
              href="/sign-up"
              className="underline mt-10 text-lg font-InSemiBold text-primary "
            >
              Sign Up
            </Link>
          </View>
          <Link className="my-4" href="/location">
            <Text>or continue without an account</Text>
          </Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
