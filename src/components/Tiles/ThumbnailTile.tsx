import { Text } from "@rneui/themed";
import React from "react";
import styled from "styled-components/native";

export const ThumbnailTile = ({
  name,
  description,
  thumbnail,
  fallback,
}: {
  name: string;
  description?: string;
  thumbnail?: string;
  fallback?: any;
}) => {
  return (
    <Container>
      <Thumbnail source={thumbnail ? { uri: thumbnail } : fallback} />
      <Content>
        <Name>{name}</Name>
        {description && <Text>{description}</Text>}
      </Content>
    </Container>
  );
};

const tileHeight = 104;
const tileBorderRadius = 16;

export const Container = styled.View`
  width: 100%;
  height: ${tileHeight}px;
  flex-direction: row;

  border-radius: ${tileBorderRadius}px;
  background-color: white;
`;

export const Thumbnail = styled.Image`
  width: ${tileHeight}px;
  height: ${tileHeight}px;

  border-radius: ${tileBorderRadius}px;
`;

export const Content = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Name = styled.Text`
  font-size: 20px;
  font-weight: 500;
`;
