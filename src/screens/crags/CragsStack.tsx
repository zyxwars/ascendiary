import { createStackNavigator } from "@react-navigation/stack";
import { AddCrag } from "./AddCrag";
import { Crag } from "./Crag";
import { AllCrags } from "./AllCrags";

export type CragsStackParamList = {
  "All Crags": undefined;
  "Add Crag": { goBackOnCreate?: boolean };
  Crag: { id: number };
};

const Stack = createStackNavigator<CragsStackParamList>();

export const CragsStackScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="All Crags" component={AllCrags} />
      <Stack.Screen name="Add Crag" component={AddCrag} />
      <Stack.Screen name="Crag" component={Crag} />
    </Stack.Navigator>
  );
};
