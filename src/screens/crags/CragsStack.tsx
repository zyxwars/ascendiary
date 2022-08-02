import { createStackNavigator } from "@react-navigation/stack";
import { AddCrag } from "./AddCrag";
import { Crag } from "./Crag";
import { AllCrags } from "./AllCrags";
import { cragsModel, withId } from "../../db/models";
import { EditCrag } from "./EditCrag";

export type CragsStackParamList = {
  "All Crags": undefined;
  "Add Crag": { goBackOnCreate?: boolean; defaultValues?: Partial<cragsModel> };
  Crag: { id: number };
  "Edit Crag": withId<cragsModel>;
};

const Stack = createStackNavigator<CragsStackParamList>();

export const CragsStackScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="All Crags" component={AllCrags} />
      <Stack.Screen
        name="Add Crag"
        component={AddCrag}
        initialParams={{ goBackOnCreate: false, defaultValues: {} }}
      />
      <Stack.Screen name="Crag" component={Crag} />
      <Stack.Screen name="Edit Crag" component={EditCrag} />
    </Stack.Navigator>
  );
};
