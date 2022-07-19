import styled from "styled-components/native";

const headerHeight = 200;
const borderHeight = 48;

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
