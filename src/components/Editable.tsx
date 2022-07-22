import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";

export const Editable = ({
  readable,
  editable,
}: {
  readable: React.ReactNode;
  editable: React.ReactNode;
}) => {
  const [showReadable, setShowReadable] = useState(true);

  return (
    <View>
      {showReadable ? (
        <TouchableOpacity
          onPress={() => {
            setShowReadable(false);
          }}
        >
          {readable}
        </TouchableOpacity>
      ) : (
        <>{editable}</>
      )}
    </View>
  );
};
