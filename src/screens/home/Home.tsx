import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button, FAB, useTheme } from "@rneui/themed";
import { db } from "../../db/db";
import { RouteList } from "./RouteList";

export const Home = () => {
  const navigation = useNavigation();

  db.transaction((tx) => {
    tx.executeSql("insert into items (done, value) values (0, ?)", ["yeah"]);
    tx.executeSql("select * from items", [], (_, { rows }) =>
      console.log(JSON.stringify(rows))
    );
  });

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
