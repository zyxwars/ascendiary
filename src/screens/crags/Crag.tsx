import {
  useRoute,
  RouteProp,
  useNavigation,
  useFocusEffect,
} from "@react-navigation/native";
import { FAB, Text } from "@rneui/themed";
import { atom, useAtom } from "jotai";
import React, { useCallback } from "react";
import { View } from "react-native";
import { RootStackParamList } from "../../../App";
import { cragsModel, cragsTable, withId } from "../../db/models";

const cragAtom = atom<withId<cragsModel> | null>(null);

export const Crag = () => {
  const route = useRoute<RouteProp<RootStackParamList, "Crag">>();
  const navigation = useNavigation();
  const { id } = route.params;

  const [cragData, setCragData] = useAtom(cragAtom);

  const getRoute = async () => {
    try {
      const res = await cragsTable.find({ id });

      if (res.rows.length < 1) return alert("Crag not found in the database");

      const data = res.rows._array[0];
      setCragData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getRoute();

      return () => {};
    }, [])
  );

  return (
    <>
      {cragData && (
        <>
          <View>
            <Text>{cragData.id}</Text>
            <Text>{cragData.name}</Text>
          </View>
          <FAB
            size="large"
            placement="right"
            icon={{ name: "cog", color: "white", type: "entypo" }}
            onPress={() => {
              navigation.navigate("Edit Crag", cragData);
            }}
          />
        </>
      )}
    </>
  );
};
