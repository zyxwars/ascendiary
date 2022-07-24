import { useNavigation } from "@react-navigation/native";
import { Button, Input } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import { Alert, View } from "react-native";
import { AutoComplete } from "../../components/AutoComplete";
import { cragsModel, cragsTable, routesTable, withId } from "../../db/models";

export const AddRoute = () => {
  const navigation = useNavigation();

  const [routeName, setName] = useState("");
  const [cragName, setCrag] = useState("");
  const [existingCrags, setExistingCrags] = useState<withId<cragsModel>[]>([]);
  const existingCragNames = existingCrags.map((crag) => crag.name);

  const getCrags = async () => {
    const res = await cragsTable.find({});
    const data = res.rows._array;
    setExistingCrags(data);
  };

  useEffect(() => {
    getCrags();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        padding: 8,
      }}
    >
      <Input
        placeholder="Route name"
        onChangeText={setName}
        value={routeName}
      />

      <AutoComplete
        words={existingCragNames}
        value={cragName}
        setValue={setCrag}
        inputProps={{ placeholder: "Crag name" }}
      />

      <Button
        title="Add Route"
        size="lg"
        onPress={async () => {
          try {
            let cragId: number;

            if (!existingCragNames.includes(cragName)) {
              const res = await cragsTable.create({ name: cragName });

              cragId = res.insertId as number;
            } else
              cragId = existingCrags.filter((crag) => crag.name === cragName)[0]
                .id;

            const res = await routesTable.create({
              name: routeName,
              cragid: cragId,
            });

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
