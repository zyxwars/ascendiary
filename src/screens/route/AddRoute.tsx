import { useNavigation } from "@react-navigation/native";
import { Button, Input } from "@rneui/themed";
import React, { useState } from "react";
import { Alert, View } from "react-native";
import { AutoComplete } from "../../components/AutoComplete";
import { routesTable } from "../../db/models";

export const AddRoute = () => {
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [crag, setCrag] = useState("");

  return (
    <View
      style={{
        flex: 1,
        padding: 8,
      }}
    >
      <Input placeholder="Route name" onChangeText={setName} value={name} />

      <AutoComplete
        words={["hello", "hi", "123"]}
        value={crag}
        setValue={setCrag}
        inputProps={{ placeholder: "Crag name" }}
      />

      <Button
        title="Add Route"
        size="lg"
        onPress={async () => {
          try {
            const res = await routesTable.create({ name });

            if (!res.insertId)
              return Alert.alert(
                "Database error",
                "The record was not created"
              );

            navigation.navigate("Route", { id: res.insertId });
          } catch (error) {
            console.log(error);
          }
        }}
      />
    </View>
  );
};
