import { createTheme } from "@rneui/themed";

const actionColor = "red";

export const theme = createTheme({
  lightColors: {
    action: actionColor,
  },
  Button: {
    color: actionColor,
  },
  FAB: {
    color: actionColor,
    buttonStyle: { borderRadius: 16 },
    containerStyle: { borderRadius: 16 },
  },
});
