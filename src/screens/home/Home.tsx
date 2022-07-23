import React, { useEffect } from "react";
import { Text, TextInput, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button, FAB, useTheme } from "@rneui/themed";
import { db } from "../../db/db";
import { RouteList } from "./RouteList";

export const Home = () => {
  const navigation = useNavigation();

  return (
    <>
      <RouteList />
      <FAB
        size="large"
        placement="right"
        icon={{ name: "plus", color: "white", type: "entypo" }}
        onPress={() => {
          navigation.navigate("AddRoute");
        }}
      />
    </>
  );
};
