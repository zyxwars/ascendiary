import React, { useCallback, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { FAB } from "@rneui/themed";
import { cragsModel, cragsTable, withId } from "../../db/models";
import { cragImageFallback } from "../../constants";
import { TileList } from "../../components/Tiles/TileList";

export const AllCrags = () => {
  const navigation = useNavigation();
  const [crags, setCrags] = useState<withId<cragsModel>[]>([]);

  const getCrags = async () => {
    try {
      const res = await cragsTable.find({});

      setCrags(res.rows._array);
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getCrags();

      return () => {};
    }, [])
  );

  return (
    <>
      <TileList
        data={crags}
        imageFallback={cragImageFallback}
        onPress={(id) => navigation.navigate("Crag", { id })}
      />
      <FAB
        size="large"
        placement="right"
        icon={{ name: "plus", color: "white", type: "entypo" }}
        onPress={() => {
          navigation.navigate("Add Crag", {});
        }}
      />
    </>
  );
};
