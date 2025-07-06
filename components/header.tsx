import { icons } from "@/constants/icons";
import React from "react";
import { Image, View } from "react-native";

const Header = () => {
  return (
    <View className="bg-white w-full">
      <Image
        className="my-5 mx-auto mt-14"
        resizeMode="contain"
        source={icons.logo}
      />
    </View>
  );
};

export default Header;
