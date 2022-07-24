import React, { useEffect, useState } from "react";
import { Text, TextInput, View } from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Button, FAB, useTheme } from "@rneui/themed";
import { db } from "../../db/db";
import { RouteList } from "./RouteList";
import { Picker } from "@react-native-picker/picker";

export const Home = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  return (
    <>
      {isFocused && (
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
      )}
    </>
  );
};
