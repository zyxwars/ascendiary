import { useNavigation } from "@react-navigation/native";
import { Button, Input } from "@rneui/themed";
import React, { useState } from "react";
import { View } from "react-native";
import { routesTable } from "../../db/models";

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
          try {
            const res = await routesTable.create({ name });

            navigation.navigate("Route", { id: res.insertId });
          } catch (error) {
            console.log(error);
          }
        }}
      />
    </View>
  );
};
