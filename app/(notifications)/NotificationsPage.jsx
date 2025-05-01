import { View, Text, Image } from "react-native";
import React from "react";
import Setting from "../../components/setting";
import { icons, images } from "../../constants";
import SettingWI from "../../components/SettingsWI";
import { Link, router, Redirect } from "expo-router";

const NotificationsPage = () => {
  return (
    <View className="bg-white">
      <SettingWI title="Push Notifications" />
      <SettingWI title="Email Notifications" />
      <SettingWI title="Notifications Sound" />
    </View>
  );
};

export default NotificationsPage;
