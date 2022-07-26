import styled from "styled-components/native";

const tileHeight = 104;
const tileBorderRadius = 16;

export const RouteTilesContainer = styled.View`
flex: 1
  width: 100%;
  height: 160px;
  padding: 16px;
`;

export const RouteTile = styled.View`
  width: 100%;
  height: ${tileHeight}px;
  margin-bottom: 16px;
  flex-direction: row;

  border-radius: ${tileBorderRadius}px;
  background-color: white;
`;

export const TileImage = styled.Image`
  width: ${tileHeight}px;
  height: ${tileHeight}px;

  border-radius: ${tileBorderRadius}px;
`;

export const TileContentContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
