import { useNavigation } from "@react-navigation/native";
import { Text } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { routesTable } from "../../db/models";

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
    <View>
      {routes.map((route) => (
        <TouchableOpacity
          key={route.id}
          onPress={() => navigation.navigate("Route", { id: route.id })}
        >
          <Text>{route.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
