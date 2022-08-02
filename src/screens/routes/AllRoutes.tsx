import React, { useCallback, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { FAB } from "@rneui/themed";
import { TileList } from "../../components/Tiles/TileList";
import { gradeMap, routeImageFallback } from "../../constants";
import {
  withId,
  routesModel,
  routesTable,
  cragsModel,
  cragsTable,
} from "../../db/models";
import { ThumbnailTile } from "../../components/Tiles/ThumbnailTile";
import { TouchableOpacity } from "react-native";

export const AllRoutes = () => {
  const navigation = useNavigation();
  const [routes, setRoutes] = useState<withId<routesModel>[]>([]);
  const [crags, setCrags] = useState<withId<cragsModel>[]>([]);

  const getRoutes = async () => {
    try {
      const res = await routesTable.find({});

      setRoutes(res.rows._array);
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

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
      getRoutes();
      getCrags();

      return () => {};
    }, [])
  );

  return (
    <>
      <TileList
        data={routes}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("Route", { id: item.id })}
          >
            <ThumbnailTile
              name={item.name + " - " + gradeMap.french[item.grade]}
              description={
                crags.filter((crag) => crag.id === item.cragid)?.[0]?.name
              }
              thumbnail={item?.thumbnail}
              fallback={routeImageFallback}
            />
          </TouchableOpacity>
        )}
      />
      <FAB
        size="large"
        placement="right"
        icon={{ name: "plus", color: "white", type: "entypo" }}
        onPress={() => {
          navigation.navigate("Add Route");
        }}
      />
    </>
  );
};
