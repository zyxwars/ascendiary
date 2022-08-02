import React, { useCallback, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { FAB } from "@rneui/themed";
import { cragsModel, cragsTable, withId } from "../../db/models";
import { cragImageFallback, routeImageFallback } from "../../constants";
import { TileList } from "../../components/Tiles/TileList";
import { TouchableOpacity } from "react-native";
import { ThumbnailTile } from "../../components/Tiles/ThumbnailTile";

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
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("Crag", { id: item.id })}
          >
            <ThumbnailTile
              name={item.name}
              thumbnail={item?.thumbnail}
              fallback={cragImageFallback}
            />
          </TouchableOpacity>
        )}
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
