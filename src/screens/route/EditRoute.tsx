import React from "react";
import { Text, View, TextInput, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { Button, ButtonGroup, Input } from "@rneui/themed";
import { routesModel, routesTable } from "../../db/models";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../../App";
import { HCenter } from "../../components/globalStyled";

export const EditRoute = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, "EditRoute">>();
  const { params } = route;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: params.name || "",
    },
  });
  const onSubmit = (data) => {
    console.log(data);

    // TODO: Save to db
    // Save only changed fields >  do diff on default and current
  };

  // Add thumbnail changing

  return (
    <HCenter>
      <Button
        title="Delete route"
        onPress={() => {
          Alert.alert(
            "Confirm delete",
            "Are you sure you want to delete this route?",
            [
              { text: "Cancel", style: "cancel" },
              {
                text: "Delete",
                onPress: async () => {
                  try {
                    const res = await routesTable.delete({ id: params.id });

                    navigation.navigate("Home");
                  } catch (error) {
                    console.log(error);
                    Alert.alert("Unexpected error", "Delete failed");
                  }
                },
                style: "destructive",
              },
            ]
          );
        }}
      />

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input onBlur={onBlur} onChangeText={onChange} value={value} />
        )}
        name="name"
      />
      {errors.name && <Text>This is required.</Text>}

      <Button title="Save changes" onPress={handleSubmit(onSubmit)} />
    </HCenter>
  );
};
