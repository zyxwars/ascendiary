import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { Button, Input, Text } from "@rneui/themed";
import React from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Alert } from "react-native";
import { RootStackParamList } from "../../../App";
import { HCenter } from "../../components/globalStyles";
import { MediaPicker } from "../../components/MediaPicker";
import { db } from "../../db/db";
import { cragsTable, routesTable } from "../../db/models";

type FormData = {
  name: string;
  thumbnail: string;
};

export const EditCrag = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, "Edit Crag">>();
  const { params } = route;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: params.name || "",
      thumbnail: params?.thumbnail || "",
    },
  });
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const res = await cragsTable.update({ id: params.id }, data);

      navigation.navigate("Crag", { id: params.id });
    } catch (e: any) {
      Alert.alert("Unexpected error", e.message);
      console.log(e);
    }
  };

  // Add thumbnail changing

  return (
    <HCenter>
      <Button
        title="Delete crag"
        onPress={() => {
          Alert.alert(
            "Confirm delete",
            "Are you sure you want to delete this crag? This will also delete related routes!",
            [
              { text: "Cancel", style: "cancel" },
              {
                text: "Delete",
                onPress: async () => {
                  try {
                    const res = await cragsTable.delete({ id: params.id });
                    await routesTable.delete({ cragid: params.id });

                    navigation.navigate("All Crags");
                  } catch (error) {
                    Alert.alert("Unexpected error", "Delete failed");
                    console.log(error);
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

      <Controller
        control={control}
        rules={{}}
        render={({ field: { onChange } }) => (
          <MediaPicker label="Pick a thumbnail" onChange={onChange} />
        )}
        name="thumbnail"
      />
      {errors.thumbnail && <Text>{errors.thumbnail.message}</Text>}

      <Button title="Save changes" onPress={handleSubmit(onSubmit)} />
    </HCenter>
  );
};
