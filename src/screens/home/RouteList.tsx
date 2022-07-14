import React, { useEffect } from "react";
import { View } from "react-native";
import { findMany } from "../../db/transactions";
import { getRoutes } from "../../store/route";

export const RouteList = () => {
  useEffect(() => {
    const routes = findMany("items");
    console.log(routes);
  }, []);

  return <View></View>;
};
