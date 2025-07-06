import { icons } from "@/constants/icons";
import React from "react";
import { Image, StyleSheet, TextInput, View } from "react-native";

interface SearchBarProps {
  placeholder: string;
  value: string;
  onPress?: () => void;
  onChangeText?: (text: string) => void;
}

const SearchBar = ({
  placeholder,
  value,
  onPress,
  onChangeText,
}: SearchBarProps) => {
  return (
    <View style={styles.container}>
      <Image
        source={icons.search}
        style={styles.icon}
        resizeMode="contain"
        tintColor="#999999"
      />
      <TextInput
        style={styles.textInput}
        placeholder={placeholder}
        value={value}
        onPress={onPress}
        placeholderTextColor="#999999"
        onChangeText={onChangeText ? (text) => onChangeText(text) : undefined}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#E3E3E3",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  icon: {
    width: 20,
    height: 20,
  },
  textInput: {
    flex: 1,
    marginLeft: 8,
    color: "black",
  },
});

export default SearchBar;
