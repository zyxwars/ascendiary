import { Text } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { routesTable } from "../../db/models";

export const RouteList = () => {
  const [routes, setRoutes] = useState<any[]>([]);

  const getRoutes = async () => {
    try {
      const routes = await routesTable.find({});

      setRoutes(routes);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRoutes();
  }, []);

  return (
    <View>
      {routes.map((route) => (
        <Text key={route.id}>{route.name}</Text>
      ))}
    </View>
  );
};
