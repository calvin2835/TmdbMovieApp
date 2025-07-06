import React from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Progress from "react-native-progress";

const ProgressBar = ({
  voteAverage = 0,
  size = 100,
  thickness = 3,
  color = "green",
}) => {
  return (
    <View style={styles.progressContainer}>
      <Progress.Circle
        size={size}
        color={color}
        indeterminateAnimationDuration={100}
        animated
        progress={Number(voteAverage / 10)}
        fill="#042541"
        thickness={thickness}
        borderColor="#45FF8F"
        borderWidth={6}
      />
      <View style={styles.textContainer}>
        <Text style={styles.text}>{Math.round(voteAverage)}%</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  progressContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default ProgressBar;
