import React from "react";
import { Text, View } from "react-native";

export const Route = ({ route }) => {
  const { id } = route.params;

  return (
    <View>
      <Text>{id}</Text>
    </View>
  );
};
