import { useRoute } from "@react-navigation/native";
import { LinearProgress } from "@rneui/themed";
import { useAtom } from "jotai";
import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { routesTable } from "../db/models";

export const Route = () => {
  const route = useRoute();
  const { id } = route.params;

  const getRoute = async () => {
    console.log(await routesTable.find({ id }));
  };

  useEffect(() => {
    getRoute();
  }, []);

  // if (loading)
  //   return (
  //     <>
  //       <LinearProgress />
  //     </>
  //   );

  // // TODO: If data is missing and there is no error, add better handling for this theoretical edge case
  // if (error || !data)
  //   return (
  //     <>
  //       <Text>{error}</Text>
  //     </>
  //   );

  return (
    <View>
      <Text>{id}</Text>
    </View>
  );
};
