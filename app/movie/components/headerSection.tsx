import { icons } from "@/constants/icons";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface HeaderSectionProps {
  title?: string;
  releaseDate?: string;
  onBackPress: () => void;
}

const HeaderSection: React.FC<HeaderSectionProps> = ({
  title,
  releaseDate,
  onBackPress,
}) => (
  <View style={styles.headerContainer}>
    <TouchableOpacity style={styles.backButton} onPress={onBackPress}>
      <Image source={icons.leftArrow} style={styles.icon} />
    </TouchableOpacity>
    <View style={styles.titleContainer}>
      <Text style={styles.titleText}>
        {title} ({releaseDate && new Date(releaseDate).getFullYear()})
      </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backButton: {
    position: "absolute",
    width: 100,
    height: "auto",
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
  },
  titleText: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: "white",
  },
});

export default HeaderSection;
