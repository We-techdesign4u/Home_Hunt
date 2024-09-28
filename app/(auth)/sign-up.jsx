import { View, Text, ScrollView, Image, Alert } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Formfield from "../../components/Formfield";
import CustomButton from "../../components/CustomButton";
import { useState } from "react";
import { icons } from "../../constants";
import { Link } from "expo-router";
import { createUser } from "../../lib/appwrite";
import { router } from "expo-router";

const SignUp = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    if (!form.username || !form.email || !form.password) {
      Alert.alert("Error", "Please fill in all the fields");
    }

    setIsSubmitting(true);

    try {
      const result = await createUser(form.email, form.password, form.username);
      // set it to global state...
      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false);
    }
    // createUser();
  };

  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="h-full justify-center items-center w-full ">
          <Text className="font-InMedium text-3xl text-center">
            Create Account
          </Text>
          <Text className="text-center text-gray-700 text-base mt-3 mb-14">
            Fill your information below or register {"\n"}with your social
            account.
          </Text>
          <View className="w-full px-8">
            <Formfield
              tittle="Name"
              value={form.username}
              placeholder="Jane Due"
              fieldstyle="w-full mb-5"
              handleChangeText={(e) => {
                setForm({ ...form, username: e });
              }}
            />
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
              handleChangeText={(e) => {
                setForm({ ...form, password: e });
              }}
            />
            <View>
              <View className="flex-row">
                <Text>Agree with </Text>
                <Link
                  href="/"
                  className="text-left font-InSemiBold text-primary underline"
                >
                  Terms & Condition
                </Link>
              </View>
            </View>
          </View>
          <CustomButton
            tittle="Sign Up"
            handlePress={submit}
            containerStyles="w-80 mt-5"
            isLoading={isSubmitting}
          />
          <Text className="my-9 text-base text-gray-400">Or sign up with</Text>
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
              />
            </View>
          </View>
          <View className="flex-row items-center">
            <Text className="mt-10 text-base">Already have an account? </Text>
            <Link
              href="/sign-in"
              className="underline mt-10 text-base text-primary "
            >
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
