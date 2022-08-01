import {
  Link,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { Text, FAB } from "@rneui/themed";
import { atom, useAtom } from "jotai";
import React, { useEffect } from "react";

import { routesModel, routesTable, withId } from "../../db/models";
import { routeImageFallback } from "../../constants";
import { MainContainer, TextArea } from "../../components/globalStyles";
import { RootStackParamList } from "../../../App";
import * as S from "../../components/routes/styles";

const routeAtom = atom<withId<routesModel> | null>(null);

export const Route = () => {
  const route = useRoute<RouteProp<RootStackParamList, "Route">>();
  const navigation = useNavigation();
  const { id } = route.params;

  const [routeData, setRouteData] = useAtom(routeAtom);

  const getRoute = async () => {
    try {
      const res = await routesTable.find({ id });

      if (res.rows.length < 1) return alert("Route not found in the database");

      const data = res.rows._array[0];
      setRouteData(data);
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
        <>
          <S.HeaderBackground
            source={
              routeData?.thumbnail
                ? { uri: routeData.thumbnail }
                : routeImageFallback
            }
          >
            <Text h2>{routeData.name}</Text>
          </S.HeaderBackground>

          <S.HeaderDivider></S.HeaderDivider>
          <MainContainer>
            <Text h4>Media</Text>
            <Text h4>Notes</Text>
            <TextArea
              multiline={true}
              numberOfLines={5}
              textAlignVertical="top"
              placeholder="Route notes"
            />
          </MainContainer>

          <FAB
            size="large"
            placement="right"
            icon={{ name: "cog", color: "white", type: "entypo" }}
            onPress={() => {
              navigation.navigate("Edit Route", routeData);
            }}
          />
        </>
      )}

      {/* <Button
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
      /> */}
    </>
  );
};
