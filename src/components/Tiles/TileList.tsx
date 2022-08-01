import { useNavigation } from "@react-navigation/native";
import React from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { ThumbnailTile } from "./ThumbnailTile";
import styled from "styled-components/native";

export const TileList = ({
  data,
  onPress,
  imageFallback,
}: {
  data: any;
  onPress: (itemId: number) => void;
  imageFallback: any;
}) => {
  return (
    <Container>
      <FlatList
        data={data}
        ListHeaderComponent={Separator}
        ListFooterComponent={Separator}
        ItemSeparatorComponent={Separator}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onPress(item.id)}>
            <ThumbnailTile
              name={item.name}
              thumbnail={item?.thumbnail}
              fallback={imageFallback}
            />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => String(item.id)}
      />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  padding-left: 10px;
  padding-right: 10px;
`;

const Separator = styled.View`
  height: 10px;
`;
