import { Text } from "@rneui/themed";
import React from "react";
import { Image, View } from "react-native";
import { thumbnailPlaceholder } from "../../constants";
import { routesModel } from "../../db/models";
import * as S from "./styled";

export const RouteTile = ({ route }: { route: routesModel }) => {
  return (
    <S.RouteTile>
      <S.TileImage
        source={
          route?.thumbnail ? { uri: route.thumbnail } : thumbnailPlaceholder
        }
      />
      <S.TileContentContainer>
        <Text>{route.name}</Text>
      </S.TileContentContainer>
    </S.RouteTile>
  );
};
