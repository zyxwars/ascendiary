import { Picker } from "@react-native-picker/picker";
import {
  CommonActions,
  RouteProp,
  StackActions,
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { Button, Input, Text } from "@rneui/themed";
import React, { useCallback, useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Alert, View } from "react-native";
import { RootStackParamList } from "../../../App";
import { FindOrCreate } from "../../components/FindOrCreate";
import { HCenter } from "../../components/globalStyles";
import { MediaPicker } from "../../components/MediaPicker";
import { gradeMap } from "../../constants";
import { cragsModel, cragsTable, routesTable, withId } from "../../db/models";

type FormData = {
  name: string;
  thumbnail: string;
};

export const AddCrag = ({
  route,
}: {
  route: RouteProp<RootStackParamList, "Add Crag">;
}) => {
  const navigation = useNavigation();

  const [existingCrags, setExistingCrags] = useState<withId<cragsModel>[]>([]);
  const existingCragNames = existingCrags.map((crag) => crag.name);

  const getCrags = async () => {
    try {
      const res = await cragsTable.find({});

      setExistingCrags(res.rows._array);
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      thumbnail: "",
      ...route.params?.defaultValues,
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const res = await cragsTable.create({ name: data.name });

      if (!res?.insertId)
        return Alert.alert("Database error", "The record was not created");

      if (route?.params?.goBackOnCreate)
        return navigation.getParent()?.goBack();

      navigation.navigate("Crag", { id: res.insertId });
    } catch (error) {
      console.log(error);

      Alert.alert("Unexpected error", "The record was not created");
    }
  };

  useFocusEffect(
    useCallback(() => {
      getCrags();

      return () => {
        // Reset the goBackOnCreateValue so that when the route is navigated to by changing the parent stack later it isn't stuck with the value on true
        route.params = { goBackOnCreate: false, defaultValues: {} };
      };
    }, [])
  );

  useEffect(
    () =>
      navigation.addListener("beforeRemove", (e) => {
        if (!route?.params?.goBackOnCreate) {
          return;
        }

        // Prevent default behavior of leaving the screen
        e.preventDefault();

        navigation.getParent()?.goBack();
      }),
    [navigation]
  );

  return (
    <HCenter
      style={{
        flex: 1,
        padding: 8,
      }}
    >
      <Controller
        control={control}
        rules={{
          required: "This is required.",
          validate: (value) =>
            !existingCragNames.includes(value) ||
            "Crag with this name already exists",
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Name"
          />
        )}
        name="name"
      />
      {errors.name && <Text>{errors.name.message}</Text>}

      {/* TODO: Add multi choice for grading systems to show for this crag */}

      <Controller
        control={control}
        rules={{}}
        render={({ field: { onChange } }) => (
          <MediaPicker label="Pick a thumbnail" onChange={onChange} />
        )}
        name="thumbnail"
      />
      {errors.thumbnail && <Text>{errors.thumbnail.message}</Text>}

      <Button size="lg" title="Add Crag" onPress={handleSubmit(onSubmit)} />
    </HCenter>
  );
};
