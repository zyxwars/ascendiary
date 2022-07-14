import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { BaseTextInput } from "../../components/styled";
import * as colors from "../../constants/colors";

export const AddRoute = () => {
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [crag, setCrag] = useState("");
  const [grade, setGrade] = useState("");

  return (
    <View
      style={{
        flex: 1,
        padding: 8,
      }}
    >
      <BaseTextInput
        style={{ backgroundColor: "white" }}
        placeholder="Route name"
        onChangeText={setName}
        value={name}
      />
      <BaseTextInput
        style={{ backgroundColor: "white" }}
        placeholder="Crag name"
        onChangeText={setCrag}
        value={crag}
      />
      <BaseTextInput
        style={{ backgroundColor: "white" }}
        placeholder="Route grade"
        onChangeText={setGrade}
        value={grade}
      />
      <Button
        title="AddRoute"
        color={colors.action}
        onPress={() => {
          navigation.navigate("Route", { id: 0 });
        }}
      />
    </View>
  );
};
