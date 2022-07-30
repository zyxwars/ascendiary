import React from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Button, FAB, Icon, useTheme } from "@rneui/themed";
import { RouteList } from "./components/RouteList";

export const Home = () => {
  const navigation = useNavigation();

  return (
    <>
      <>
        <RouteList />
        <FAB
          size="large"
          placement="right"
          icon={{ name: "plus", color: "white", type: "entypo" }}
          onPress={() => {
            navigation.navigate("Add Route");
          }}
        />
      </>
    </>
  );
};
