import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { View, Text, ScrollView } from "react-native";
import React from "react";
import DropdownInfo from "../../components/DropdownInfo";
import { icons } from "../../constants";

const TopTabs = createMaterialTopTabNavigator();

export default function BookmarkLayout() {
  return (
    <TopTabs.Navigator>
      <TopTabs.Screen name="FAQ" component={FAQ} options={{}} />
      <TopTabs.Screen name="Contact Us" component={ContactUs} options={{}} />
    </TopTabs.Navigator>
  );
}

const FAQ = () => {
  return (
    <ScrollView className="py-4 ">
      <DropdownInfo
        title={"How do I schedule a Tour?"}
        description={
          "Loren ipsum dolor sit amet, consectetur adjuscenter elit, sed do elsumod tempor incididunt ut labore et doore magna alique sit amet, consectetur sit amet, consectetur adjuscenter elit, sed do elsumod tempor incididunt ut."
        }
      />

      <DropdownInfo
        title={"Can I cancel Booking?"}
        description={
          "Loren ipsum dolor sit amet, consectetur adjuscenter elit, sed do elsumod tempor incididunt ut."
        }
      />

      <DropdownInfo
        title={"How to check Bookings"}
        description={
          "Loren ipsum dolor sit amet, consectetur adjuscenter elit, sed do elsumod tempor incididunt ut.sit amet, consectetur adjuscenter elit, sed do elsumod tempor incididunt ut labore et"
        }
      />
      <DropdownInfo
        title={"Ho do I pay an Agent?"}
        description={
          "Loren ipsum dolor sit amet, consectetur adjuscenter elit, sed do elsumod tempor incididunt ut.sit amet, consectetur adjuscenter elit, sed do elsumod tempor incididunt ut labore et"
        }
      />
    </ScrollView>
  );
};

const ContactUs = () => {
  return (
    <ScrollView className="py-4 ">
      <DropdownInfo
        icon={icons.customerService}
        iconboxStyle={"w-[30px] h-[30px] mr-2"}
        title={"Customer Service"}
        description={"+234 80 990 00234"}
      />

      <DropdownInfo
        title={"WhatsApp"}
        icon={icons.whatsapp}
        iconboxStyle={"w-[30px] h-[30px] mr-2"}
        description={"+234 80 990 00234"}
      />

      <DropdownInfo
        title={"Website"}
        icon={icons.website}
        iconboxStyle={"w-[30px] h-[30px] mr-2"}
        description={"www.homehunt.com"}
      />
      <DropdownInfo
        title={"Facebook"}
        icon={icons.facebook}
        iconboxStyle={"w-[30px] h-[30px] mr-2"}
        description={"Home Hunt"}
      />
      <DropdownInfo
        title={"X"}
        icon={icons.customerService}
        iconboxStyle={"w-[30px] h-[30px] mr-2"}
        description={"@homehunt"}
      />
      <DropdownInfo
        title={"Instagram"}
        icon={icons.instagram}
        iconboxStyle={"w-[30px] h-[30px] mr-2"}
        description={"Home_Hunt"}
      />
    </ScrollView>
  );
};
