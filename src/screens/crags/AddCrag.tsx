import { Picker } from "@react-native-picker/picker";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Button, Input, Text } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Alert, View } from "react-native";
import { RootStackParamList } from "../../../App";
import { AutoComplete } from "../../components/AutoComplete";
import { HCenter } from "../../components/globalStyled";
import { gradeMap } from "../../constants";
import { cragsModel, cragsTable, routesTable, withId } from "../../db/models";

export const AddCrag = () => {
  const navigation = useNavigation();

  const [existingCrags, setExistingCrags] = useState<withId<cragsModel>[]>([]);
  const existingCragNames = existingCrags.map((crag) => crag.name);

  const getCrags = async () => {
    const res = await cragsTable.find({});
    const data = res.rows._array;
    setExistingCrags(data);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<cragsModel>({
    defaultValues: {
      name: "",
    },
  });

  // TODO: Add type from the form hook?
  const onSubmit: SubmitHandler<cragsModel> = async (data) => {
    try {
      const res = await cragsTable.create({ name: data.name });

      if (!res?.insertId)
        return Alert.alert("Database error", "The record was not created");

      navigation.navigate("Crag", { id: res.insertId });
    } catch (error) {
      console.log(error);

      Alert.alert("Unexpected error", "The record was not created");
    }
  };

  useEffect(() => {
    getCrags();
  }, []);

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

      <Button size="lg" title="Add Route" onPress={handleSubmit(onSubmit)} />
    </HCenter>
  );
};
