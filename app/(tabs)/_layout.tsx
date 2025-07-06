import Header from "@/components/header";
import { icons } from "@/constants/icons";
import { Stack, Tabs } from "expo-router";
import React, { FC } from "react";
import { Image, ImageSourcePropType, StyleSheet, View } from "react-native";

const TabIcon: FC<TabIconProps> = ({ focused, icon }) => (
  <View style={styles.iconContainer}>
    <Image
      source={icon}
      tintColor={focused ? "#00B4E4" : "#A8B5DB"}
      style={styles.icon}
    />
  </View>
);

interface TabIconProps {
  focused: boolean;
  icon?: ImageSourcePropType;
}

const _Layout: FC = () => (
  <Tabs
    screenOptions={{
      tabBarShowLabel: false,
      tabBarItemStyle: styles.tabBarItem,
      tabBarStyle: styles.tabBar,
    }}
  >
    <Tabs.Screen
      name="index"
      options={{
        title: "Home",
        header: () => <Header />,
        tabBarIcon: ({ focused }) => (
          <TabIcon focused={focused} icon={icons.home} />
        ),
      }}
    />
    <Tabs.Screen
      name="saved"
      options={{
        title: "Saved",
        header: () => <Header />,
        tabBarIcon: ({ focused }) => (
          <TabIcon focused={focused} icon={icons.save} />
        ),
      }}
    />
    <Stack.Screen
      name="movie/[id]"
      options={{
        header: () => <Header />,
      }}
    />
  </Tabs>
);

const styles = StyleSheet.create({
  iconContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
    borderRadius: 9999,
  },
  icon: {
    width: 20,
    height: 20,
  },
  tabBarItem: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  tabBar: {
    backgroundColor: "#0f0D23",
    borderRadius: 50,
    marginHorizontal: 10,
    marginBottom: 24,
    height: 52,
    position: "absolute",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#0f0D23",
  },
});

export default _Layout;
