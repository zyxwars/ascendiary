import React from "react";
import { TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";
import * as colors from "../../constants/colors";

export const IconButton = () => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: colors.action,
        borderRadius: 15,
        padding: 10,
      }}
    >
      <Entypo name="plus" size={48} color="white" />
    </TouchableOpacity>
  );
};
