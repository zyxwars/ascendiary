import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute } from "@react-navigation/native";
import { LinearProgress } from "@rneui/themed";
import { useAtom } from "jotai";
import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { getRoute, useRouteStore } from "../store/route";

export const Route = () => {
  const route = useRoute();
  const { id } = route.params;
  const { data, loading, error } = useRouteStore();

  useEffect(() => {
    getRoute(String(id));
  }, []);

  if (loading)
    return (
      <>
        <LinearProgress />
      </>
    );

  // TODO: If data is missing and there is no error, add better handling for this theoretical edge case
  if (error || !data)
    return (
      <>
        <Text>{error}</Text>
      </>
    );

  return <View>{data.name}</View>;
};
