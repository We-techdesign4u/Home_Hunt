import { Stack } from "expo-router";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { withLayoutContext } from "expo-router";
import { SearchBar } from "react-native-screens";
import Cancelled from "./Cancelled";
import Completed from "./Completed";
import Ongoing from "./Ongoing";
import Favorite from "./Favorite";
import MyProperties from "./MyProperties";

const TopTabs = createMaterialTopTabNavigator();

export default function BookmarkLayout() {
  return (
    <TopTabs.Navigator>
      <TopTabs.Screen
        name="My Properties"
        component={MyProperties}
        options={{}}
      />
      <TopTabs.Screen name="Favorite" component={Favorite} options={{}} />
      <TopTabs.Screen name="Ongoing" component={Ongoing} options={{}} />
      <TopTabs.Screen name="Completed" component={Completed} options={{}} />
      <TopTabs.Screen name="Cancelled" component={Cancelled} options={{}} />
    </TopTabs.Navigator>
  );
}
