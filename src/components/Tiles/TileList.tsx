import { useNavigation } from "@react-navigation/native";
import React from "react";
import { FlatList, ListRenderItem, TouchableOpacity } from "react-native";
import { ThumbnailTile } from "./ThumbnailTile";
import styled from "styled-components/native";

export const TileList = ({
  data,
  renderItem,
}: {
  data: any;
  renderItem: ListRenderItem<any>;
}) => {
  return (
    <Container>
      <FlatList
        data={data}
        ListHeaderComponent={Separator}
        ListFooterComponent={Separator}
        ItemSeparatorComponent={Separator}
        renderItem={renderItem}
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
