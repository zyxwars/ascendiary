import styled from "styled-components/native";

const tileHeight = 104;
const tileBorderRadius = 16;

const headerHeight = 200;
const borderHeight = 48;

export const RouteTilesContainer = styled.View`
  flex: 1;
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

export const HeaderBackground = styled.ImageBackground`
  width: 100%;
  height: ${headerHeight}px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const HeaderDivider = styled.View`
  width: 100%;
  height: ${borderHeight}px;
  position: absolute;
  top: ${headerHeight - borderHeight / 2}px;

  border-radius: 100000px;
  background-color: rgb(242, 242, 242);
`;
