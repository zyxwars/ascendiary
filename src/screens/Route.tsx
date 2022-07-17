import { Link, useRoute } from "@react-navigation/native";
import { Button, LinearProgress } from "@rneui/themed";
import { atom, useAtom, useSetAtom } from "jotai";
import React, { useEffect } from "react";
import { Alert, Text, View } from "react-native";
import { routesModel, routesTable } from "../db/models";
import * as ImagePicker from "expo-image-picker";
import * as Linking from "expo-linking";
import { dialogAtom } from "../components/GlobalDialog";

const routeAtom = atom<routesModel | null>(null);

export const Route = () => {
  const route = useRoute();
  const { id } = route.params;
  const setDialogData = useSetAtom(dialogAtom);

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
      <Button
        title="Upload thumbnail"
        onPress={async () => {
          const permission = await ImagePicker.getCameraPermissionsAsync();
          console.log(permission);

          if (!permission.granted && permission.canAskAgain)
            await ImagePicker.requestCameraPermissionsAsync();

          // TODO: test this outside of expo
          if (!permission.granted)
            return setDialogData({
              isVisible: true,
              title: "No permission",
              message: "Camera permission needed",
              cbTitle: "Go to settings",
              callback: Linking.openSettings,
            });

          const res = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
          });

          // TODO: Store the image in library

          console.log(res);
        }}
      />
    </View>
  );
};
