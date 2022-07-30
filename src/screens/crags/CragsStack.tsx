import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AddCrag } from "./AddCrag";
import { Crag } from "./Crag";
import { Home } from "./Home";

export type CragsStackParamList = {
  Home: undefined;
  "Add Crag": { goBackOnCreate?: boolean };
  Crag: { id: number };
};

const Stack = createNativeStackNavigator<CragsStackParamList>();

export const CragsStackScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Add Crag" component={AddCrag} />
      <Stack.Screen name="Crag" component={Crag} />
    </Stack.Navigator>
  );
};
