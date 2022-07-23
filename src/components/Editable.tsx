import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";

export interface EditableProps {
  readable: React.ReactNode;
  editable: React.ReactNode;
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
}

export const Editable = ({
  readable,
  editable,
  isEditing,
  setIsEditing,
}: EditableProps) => {
  return (
    <>
      {isEditing ? (
        <>{editable}</>
      ) : (
        <TouchableOpacity
          onPress={() => {
            setIsEditing(true);
          }}
        >
          {readable}
        </TouchableOpacity>
      )}
    </>
  );
};
