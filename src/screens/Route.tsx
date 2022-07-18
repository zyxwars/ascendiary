import { Link, useRoute } from "@react-navigation/native";
import { Button, LinearProgress, Image } from "@rneui/themed";
import { atom, useAtom, useSetAtom } from "jotai";
import React, { useEffect } from "react";
import { Alert, Text, View } from "react-native";
import { routesModel, routesTable } from "../db/models";
import * as ImagePicker from "expo-image-picker";
import * as Linking from "expo-linking";
import { dialogAtom } from "../components/GlobalDialog";
import * as MediaLibrary from "expo-media-library";

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
    <>
      {routeData && (
        <View>
          <Text>{routeData.name}</Text>

          {routeData?.thumbnail ? (
            //TODO: Fix image
            <Image
              style={{ width: 100, height: 100 }}
              source={{
                uri: routeData.thumbnail,
              }}
            />
          ) : (
            <Text>No thumbnail</Text>
          )}
        </View>
      )}
      <Button
        title="Upload thumbnail"
        onPress={async () => {
          const cameraPermission =
            await ImagePicker.getCameraPermissionsAsync();
          const storagePermission = await MediaLibrary.getPermissionsAsync();

          if (!cameraPermission.granted && cameraPermission.canAskAgain)
            await ImagePicker.requestCameraPermissionsAsync();

          if (!storagePermission.granted && storagePermission.canAskAgain)
            await MediaLibrary.requestPermissionsAsync();

          // TODO: test this outside of expo for all permissions
          if (!cameraPermission.granted)
            return setDialogData({
              isVisible: true,
              title: "No permission",
              message: "Camera and media permissions needed",
              cbTitle: "Go to settings",
              callback: Linking.openSettings,
            });

          const res = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
          });

          if (res.cancelled) return;

          const asset = await MediaLibrary.createAssetAsync(res.uri);

          let album = await MediaLibrary.getAlbumAsync("Ascendiary");

          if (!album)
            album = await MediaLibrary.createAlbumAsync("Ascendiary", asset);
          else await MediaLibrary.addAssetsToAlbumAsync(asset, album);

          const assets = await MediaLibrary.getAssetsAsync({
            album,
            first: 1,
            sortBy: MediaLibrary.SortBy.creationTime,
          });

          const movedImage = assets.assets[0];

          routesTable.update({ id }, { thumbnail: movedImage.uri });

          // This triggers allow to modify image
          // https://github.com/expo/expo/issues/16694
          await MediaLibrary.deleteAssetsAsync(asset);

          // try {
          //   // TODO: error handle this
          //   if (!album)
          //     await MediaLibrary.createAlbumAsync("Ascendiary", asset);
          //   else await MediaLibrary.addAssetsToAlbumAsync(asset, album);

          //   routesTable
          //     .update({ id }, { thumbnail: asset.uri })
          //     .catch((err) => console.log(err));
          // } catch (error) {
          //   setDialogData({
          //     isVisible: true,
          //     title: "Creation error",
          //     message:
          //       "Creation was cancelled, but the photo is still in storage",
          //     cbTitle: "Delete photo",
          //     callback: () => MediaLibrary.deleteAssetsAsync(asset),
          //   });
          // }
        }}
      />
    </>
  );
};
