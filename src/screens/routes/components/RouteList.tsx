import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { ThumbnailTile } from "../../../components/Tiles/ThumbnailTile";
import { routeImageFallback } from "../../../constants";
import { routesTable } from "../../../db/models";
import * as S from "./styles";

export const RouteList = () => {
  const navigation = useNavigation();
  const [routes, setRoutes] = useState<any[]>([]);

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
    <S.RouteTilesContainer>
      {routes.map((route) => (
        <TouchableOpacity
          key={route.id}
          onPress={() => navigation.navigate("Route", { id: route.id })}
        >
          <ThumbnailTile
            name={route.name}
            thumbnail={route?.thumbnail}
            fallback={routeImageFallback}
          />
        </TouchableOpacity>
      ))}
    </S.RouteTilesContainer>
  );
};
