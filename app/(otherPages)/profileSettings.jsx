import { View, Text, Image } from "react-native";
import React from "react";
import Setting from "../../components/setting";
import { icons, images } from "../../constants";
import SettingWI from "../../components/SettingsWI";
import { Link, router, Redirect } from "expo-router";

const ProfileSettings = () => {
  return (
    <View className="bg-white">
      <SettingWI
        title="Notifications"
        handleClick={() => router.push("/NotificationsPage")}
      />

      <SettingWI title="Security" />
      <SettingWI title="Appearance" />
      <SettingWI title="Password" />
      <SettingWI title="Account" />
    </View>
  );
};

export default ProfileSettings;
