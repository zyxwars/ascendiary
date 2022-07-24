import React from "react";
import { Text, View, TextInput, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { Button, Input } from "@rneui/themed";
import { routesModel } from "../../db/models";
import { useRoute } from "@react-navigation/native";

export const EditRoute = () => {
  const route = useRoute();
  const { params } = route;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: params?.name || "",
    },
  });
  const onSubmit = (data) => {
    console.log(data);

    // TODO: Save to db
    // Save only changed fields >  do diff on default and current
  };

  // Add thumbnail changing

  return (
    <>
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
    </>
  );
};
