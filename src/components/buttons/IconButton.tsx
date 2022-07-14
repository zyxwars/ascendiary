import React from "react";
import { TouchableOpacity } from "react-native";
import * as colors from "../../constants/colors";

interface Props {
  // TODO: type as style
  style: any;
  onPress: () => void;
}

export const IconButton: React.FC<Props> = ({ children, style, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: colors.action,
        borderRadius: 16,
        padding: 8,
        ...style,
      }}
      onPress={onPress}
    >
      {children}
    </TouchableOpacity>
  );
};
