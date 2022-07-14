import React from "react";
import { Text, View } from "react-native";
import { IconButton } from "../../components/buttons/IconButton";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export const Home = () => {
  const navigation = useNavigation();
  return (
    <>
      <IconButton
        style={{ position: "absolute", right: 10, bottom: 10 }}
        onPress={() => {
          navigation.navigate("AddRoute");
        }}
      >
        <Entypo name="plus" size={48} color="white" />
      </IconButton>
    </>
  );
};
