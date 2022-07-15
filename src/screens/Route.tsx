import { useRoute } from "@react-navigation/native";
import { LinearProgress } from "@rneui/themed";
import { atom, useAtom } from "jotai";
import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { routesModel, routesTable } from "../db/models";

const routeAtom = atom<routesModel | null>(null);

export const Route = () => {
  const route = useRoute();
  const { id } = route.params;

  const [routeData, setRouteData] = useAtom(routeAtom);

  const getRoute = async () => {
    try {
      const res = await routesTable.find({ id });

      if (res.rows.length < 1) return alert("Route not found in the database");

      setRouteData(res.rows._array[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRoute();
  }, []);

  return (
    <View>
      {routeData && <Text>{routeData.name}</Text>}
      <Text>{id}</Text>
    </View>
  );
};
