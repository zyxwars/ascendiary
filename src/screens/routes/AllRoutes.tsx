import React, { useCallback, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { FAB } from "@rneui/themed";
import { TileList } from "../../components/Tiles/TileList";
import { routeImageFallback } from "../../constants";
import { withId, routesModel, routesTable } from "../../db/models";

export const AllRoutes = () => {
  const navigation = useNavigation();
  const [routes, setRoutes] = useState<withId<routesModel>[]>([]);

  const getRoutes = async () => {
    try {
      const res = await routesTable.find({});

      setRoutes(res.rows._array);
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getRoutes();

      return () => {};
    }, [])
  );

  return (
    <>
      <TileList
        data={routes}
        imageFallback={routeImageFallback}
        onPress={(id) => navigation.navigate("Route", { id })}
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
