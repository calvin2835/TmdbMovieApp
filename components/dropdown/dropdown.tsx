import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";
import RNPickerSelect, { Item } from "react-native-picker-select";

interface DropdownProps {
  options: Item[];
  value: string;
  onChange: (value: string) => void;
}

const Dropdown = ({ options, value, onChange }: DropdownProps) => {
  return (
    <View style={pickerSelectStyles.wrapper}>
      <RNPickerSelect
        onValueChange={(value) => onChange(value)}
        items={options}
        value={value}
        useNativeAndroidPickerStyle={false}
        fixAndroidTouchableBug
        style={{
          ...pickerSelectStyles,
          iconContainer: {
            top: 12,
            right: 10,
          },
        }}
        pickerProps={{ style: {} }}
        placeholder={{ label: "Select an option" }}
        Icon={() => (
          <MaterialIcons name="arrow-drop-down" size={24} color="gray" />
        )}
      />
    </View>
  );
};

const pickerSelectStyles = StyleSheet.create({
  wrapper: {
    borderWidth: 1,
    borderColor: "#E3E3E3",
    borderRadius: 4,
  },
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 4,
    color: "black",
    paddingRight: 30,
    minWidth: "100%",
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    color: "black",
    paddingRight: 30,
    minWidth: "100%",
  },
});

export default Dropdown;
