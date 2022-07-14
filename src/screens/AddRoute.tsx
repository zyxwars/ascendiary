import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Button, Input } from "@rneui/themed";
import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { create } from "../db/transactions";
import { createRoute } from "../store/route";

export const AddRoute = () => {
  const navigation = useNavigation();

  const [name, setName] = useState("");

  return (
    <View
      style={{
        flex: 1,
        padding: 8,
      }}
    >
      <Input placeholder="Route name" onChangeText={setName} value={name} />

      <Button
        title="Add Route"
        size="lg"
        onPress={async () => {
          create("routes", "name", [name]);

          // navigation.navigate("Route", { id: newRoute.id });
        }}
      />
    </View>
  );
};
