import { Dialog, Text } from "@rneui/themed";
import { atom, useAtom } from "jotai";
import React from "react";

export const dialogAtom = atom({
  isVisible: false,
  title: "",
  message: "",
  cbTitle: "",
  callback: () => {},
});

export const GlobalDialog = () => {
  const [dialogData, setDialogData] = useAtom(dialogAtom);

  const handleClose = () => {
    setDialogData((prev) => ({ ...prev, isVisible: false }));
  };
  return (
    <Dialog isVisible={dialogData.isVisible} onBackdropPress={handleClose}>
      <Dialog.Title title={dialogData.title} />
      <Text>{dialogData.message}</Text>
      <Dialog.Actions>
        <Dialog.Button
          title={dialogData.cbTitle}
          onPress={() => {
            dialogData.callback;
            setDialogData((prev) => ({ ...prev, isVisible: false }));
          }}
        />
        <Dialog.Button title="Close" onPress={handleClose} />
      </Dialog.Actions>
    </Dialog>
  );
};
