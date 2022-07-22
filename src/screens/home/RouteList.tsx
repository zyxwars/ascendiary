import { useNavigation } from "@react-navigation/native";
import { Image, Text } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { routesTable } from "../../db/models";
import { RouteTile } from "./RouteTile";
import * as S from "./styled";

export const RouteList = () => {
  const navigation = useNavigation();
  const [routes, setRoutes] = useState<any[]>([]);

  const getRoutes = async () => {
    try {
      const res = await routesTable.find({});

      setRoutes(res.rows._array);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRoutes();
  }, []);

  return (
    <S.RouteTilesContainer>
      {routes.map((route) => (
        <TouchableOpacity
          key={route.id}
          onPress={() => navigation.navigate("Route", { id: route.id })}
        >
          <RouteTile route={route} />
        </TouchableOpacity>
      ))}
    </S.RouteTilesContainer>
  );
};
