import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import { Button, Icon, Input, Text } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Alert, TouchableOpacity, View } from "react-native";
import { AutoComplete } from "../../components/AutoComplete";
import { HCenter } from "../../components/globalStyled";
import { gradeMap } from "../../constants";
import { cragsModel, cragsTable, routesTable, withId } from "../../db/models";

type FormData = {
  name: string;
  crag: string;
  grade: string;
};

export const AddRoute = () => {
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
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      crag: "",
      grade: "",
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      let cragId: number;

      if (!existingCragNames.includes(data.crag)) {
        const res = await cragsTable.create({ name: data.crag });

        cragId = res.insertId as number;
      } else
        cragId = existingCrags.filter((crag) => crag.name === data.crag)[0].id;

      const res = await routesTable.create({
        name: data.name,
        cragid: cragId,
      });

      if (!res.insertId)
        return Alert.alert("Database error", "The record was not created");

      navigation.navigate("Route", { id: res.insertId });
    } catch (error) {
      console.log(error);

      Alert.alert("Unexpected error", "The record was not created");
    }

    // TODO: Save to db
    // Save only changed fields >  do diff on default and current
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
          required: true,
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
      {errors.name && <Text>This is required.</Text>}

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <AutoComplete
            words={existingCragNames}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            inputProps={{ placeholder: "Crag" }}
            footerComponent={
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Crags", {
                    screen: "Add Crag",
                    params: {
                      goBackOnCreate: true,
                    },
                    initial: false,
                  });
                }}
              >
                <Icon name="plus" type="entypo" />
              </TouchableOpacity>
            }
          />
        )}
        name="crag"
      />
      {errors.crag && <Text>This is required.</Text>}

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <Text>Grade</Text>
            <Picker
              onBlur={onBlur}
              selectedValue={value}
              onValueChange={(itemValue, itemIndex) => onChange(itemValue)}
              style={{ width: "100%" }}
            >
              {gradeMap.french.map((grade) => (
                <Picker.Item key={grade} label={grade} value={grade} />
              ))}
            </Picker>
          </>
        )}
        name="grade"
      />
      {errors.grade && <Text>This is required.</Text>}

      <Button size="lg" title="Add Route" onPress={handleSubmit(onSubmit)} />
    </HCenter>
  );
};
