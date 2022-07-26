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
    buttonStyle: { borderRadius: 1000 },
    containerStyle: { borderRadius: 1000 },
  },
});
