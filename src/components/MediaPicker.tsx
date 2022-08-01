import { Icon, Image, Text } from "@rneui/themed";
import React, { useState } from "react";
import styled from "styled-components/native";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import { Alert, Linking } from "react-native";

const getCameraPermissions = async () => {
  let cameraPermission = await ImagePicker.getCameraPermissionsAsync();

  if (!cameraPermission.granted && cameraPermission.canAskAgain)
    await ImagePicker.requestCameraPermissionsAsync();
  cameraPermission = await ImagePicker.getCameraPermissionsAsync();

  if (!cameraPermission.granted)
    return Alert.alert("No permission", "Camera permission not granted", [
      { text: "Cancel", style: "cancel" },
      { text: "Settings", onPress: Linking.openSettings, style: "default" },
    ]);
};

const getMediaPermissions = async () => {
  let mediaPermission = await ImagePicker.getMediaLibraryPermissionsAsync();

  if (!mediaPermission.granted && mediaPermission.canAskAgain)
    await ImagePicker.getMediaLibraryPermissionsAsync();
  mediaPermission = await ImagePicker.getMediaLibraryPermissionsAsync();

  if (!mediaPermission.granted)
    return Alert.alert("No permission", "Media permission not granted", [
      { text: "Cancel", style: "cancel" },
      { text: "Settings", onPress: Linking.openSettings, style: "default" },
    ]);
};

const moveAssetToAlbum = async (asset: MediaLibrary.Asset) => {
  let album = await MediaLibrary.getAlbumAsync("Ascendiary");

  if (!album)
    // Use copyAsset true here to avoid triggering the modify pop up and then deal with deleting in a later cancel handled function
    album = await MediaLibrary.createAlbumAsync("Ascendiary", asset, true);
  else await MediaLibrary.addAssetsToAlbumAsync(asset, album, true);

  const assets = await MediaLibrary.getAssetsAsync({
    album,
    first: 1,
    sortBy: MediaLibrary.SortBy.creationTime,
  });

  return assets.assets[0];
};

export const saveUriToAlbum = async (uri: string) => {
  const asset = await MediaLibrary.createAssetAsync(uri);
  const movedAsset = moveAssetToAlbum(asset);

  // This triggers allow to modify image
  // https://github.com/expo/expo/issues/16694
  await MediaLibrary.deleteAssetsAsync(asset).catch((e) =>
    Alert.alert("Delete cancelled", "The temporary photo is still in storage", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete photo",
        onPress: () => MediaLibrary.deleteAssetsAsync(asset).catch(),
        style: "default",
      },
    ])
  );

  return movedAsset;
};

export const MediaPicker = ({
  label,
  onChange,
  mediaTypes = ImagePicker.MediaTypeOptions.Images,
  useCamera = true,
  useGallery = true,
}: {
  label: string;
  onChange: (imageUri: string) => void;
  mediaTypes?: ImagePicker.MediaTypeOptions;
  useCamera?: boolean;
  useGallery?: boolean;
}) => {
  const [currentImage, setCurrentImage] =
    useState<ImagePicker.ImageInfo | null>(null);

  const handleOpenCamera = async () => {
    await getCameraPermissions();

    await getMediaPermissions();

    const res = await ImagePicker.launchCameraAsync({
      mediaTypes,
      allowsEditing: false,
    });

    if (res.cancelled) return;

    setCurrentImage(res);

    onChange(res.uri);
  };

  const handleOpenGallery = async () => {
    getMediaPermissions();

    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes,
    });

    if (res.cancelled) return;

    setCurrentImage(res);

    onChange(res.uri);
  };

  return (
    <MainContainer>
      <PickerLabel>{label}</PickerLabel>

      {currentImage && (
        <Image
          source={{ uri: currentImage.uri }}
          style={{ width: 100, height: 100 }}
        />
      )}

      <ButtonContainer>
        {useCamera && (
          <OpenButton onPress={handleOpenCamera}>
            <Text>Open camera</Text>
            <Icon name="camera" type="antdesign" />
          </OpenButton>
        )}

        {useGallery && (
          <OpenButton onPress={handleOpenGallery}>
            <Text>Open gallery</Text>
            <Icon name="picture" type="antdesign" />
          </OpenButton>
        )}
      </ButtonContainer>
    </MainContainer>
  );
};

const MainContainer = styled.View`
  justify-content: center;
  align-items: center;
`;

const PickerLabel = styled(Text)`
  font-size: 16px;
  color: grey;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
`;

const OpenButton = styled.TouchableOpacity`
  padding: 8px;
`;
