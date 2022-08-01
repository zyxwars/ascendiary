import React from "react";
import { Text, Alert } from "react-native";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Button, Input } from "@rneui/themed";
import { routesTable } from "../../db/models";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../../App";
import { HCenter } from "../../components/globalStyles";
import { MediaPicker } from "../../components/MediaPicker";

type FormData = {
  name: string;
  thumbnail: string;
};

export const EditRoute = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, "Edit Route">>();
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
      const res = await routesTable.update({ id: params.id }, data);

      navigation.navigate("Route", { id: params.id });
    } catch (e: any) {
      Alert.alert("Unexpected error", e.message);
      console.log(e);
    }
  };

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

                    navigation.navigate("All Routes");
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
