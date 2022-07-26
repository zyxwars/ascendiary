import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "./Home";

export type CragsStackParamList = {
  Home: undefined;
};

const Stack = createNativeStackNavigator<CragsStackParamList>();

export const CragsStackScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};
