import React, { useCallback, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { FAB } from "@rneui/themed";
import { cragsModel, cragsTable, withId } from "../../db/models";
import { TouchableOpacity } from "react-native";
import { ThumbnailTile } from "../../components/Tiles/ThumbnailTile";
import { cragImageFallback } from "../../constants";

export const Home = () => {
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
      {crags.map((crag) => (
        <TouchableOpacity
          key={crag.id}
          onPress={() => navigation.navigate("Crag", { id: crag.id })}
        >
          <ThumbnailTile
            name={crag.name}
            thumbnail={crag?.thumbnail}
            fallback={cragImageFallback}
          />
        </TouchableOpacity>
      ))}
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
