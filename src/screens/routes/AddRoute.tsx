import { Picker } from "@react-native-picker/picker";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Button, Icon, Image, Input, Text } from "@rneui/themed";
import React, { useCallback, useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Alert, TouchableOpacity, View } from "react-native";
import { FindOrCreate } from "../../components/FindOrCreate";
import { HCenter } from "../../components/globalStyles";
import { MediaPicker, saveUriToAlbum } from "../../components/MediaPicker";
import { cragImageFallback, gradeMap } from "../../constants";
import { cragsModel, cragsTable, routesTable, withId } from "../../db/models";
import { ThumbnailTileSmall } from "../../components/Tiles/ThumbnailTileSmall";

type FormData = {
  name: string;
  crag: string;
  grade: string;
  thumbnail: string;
};

export const AddRoute = () => {
  const navigation = useNavigation();

  const [existingCrags, setExistingCrags] = useState<withId<cragsModel>[]>([]);

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
      thumbnail: "",
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const cragId = existingCrags.filter((crag) => crag.name === data.crag)[0]
        .id;

      if (data.thumbnail !== "") await saveUriToAlbum(data.thumbnail);

      const res = await routesTable.create({
        name: data.name,
        grade: gradeMap.french.indexOf(data.grade),
        thumbnail: data.thumbnail,
        cragid: cragId,
      });

      if (!res.insertId)
        return Alert.alert("Database error", "The record was not created");

      navigation.navigate("Route", { id: res.insertId });
    } catch (error) {
      console.log(error);

      Alert.alert("Unexpected error", "The record was not created");
    }
  };

  useFocusEffect(
    useCallback(() => {
      getCrags();

      return () => {};
    }, [])
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

      <Controller
        control={control}
        rules={{
          required: "This is required.",
          validate: (value) =>
            existingCrags.filter((crag) => crag.name === value).length > 0 ||
            "Crag doesn't exist",
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <FindOrCreate
            searchExtractor={(item) => item.name}
            value={value}
            onChange={onChange}
            data={existingCrags}
            renderItem={({ item }) => (
              <ThumbnailTileSmall
                name={item.name}
                fallback={cragImageFallback}
                thumbnail={item?.thumbnail}
              />
            )}
            onPressAdd={() =>
              navigation.navigate("Crags", {
                screen: "Add Crag",
                params: {
                  goBackOnCreate: true,
                  defaultValues: { name: value },
                },
                // Load the initial route in the stack before the navigated page, to have a page to go back to
                initial: false,
              })
            }
            inputProps={{ placeholder: "Crag" }}
          />
        )}
        name="crag"
      />
      {errors.crag && <Text>{errors.crag.message}</Text>}

      <Controller
        control={control}
        rules={{
          required: "This is required.",
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
      {errors.grade && <Text>{errors.grade.message}</Text>}

      <Controller
        control={control}
        rules={{}}
        render={({ field: { onChange } }) => (
          <MediaPicker label="Pick a thumbnail" onChange={onChange} />
        )}
        name="thumbnail"
      />
      {errors.thumbnail && <Text>{errors.thumbnail.message}</Text>}

      <Button size="lg" title="Add Route" onPress={handleSubmit(onSubmit)} />
    </HCenter>
  );
};
