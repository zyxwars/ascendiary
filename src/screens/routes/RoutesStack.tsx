import { withId, routesModel } from "../../db/models";
import { AllRoutes } from "./AllRoutes";
import { AddRoute } from "./AddRoute";
import { EditRoute } from "./EditRoute";
import { Route } from "./Route";
import { createStackNavigator } from "@react-navigation/stack";

export type RoutesStackParamList = {
  "All Routes": undefined;
  "Add Route": undefined;
  Route: { id: number };
  "Edit Route": withId<routesModel>;
};

const Stack = createStackNavigator<RoutesStackParamList>();

export const RoutesStackScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="All Routes" component={AllRoutes} />
      <Stack.Screen name="Add Route" component={AddRoute} />
      <Stack.Screen
        name="Route"
        component={Route}
        // options={{ headerShown: false }}
      />
      <Stack.Screen name="Edit Route" component={EditRoute} />
    </Stack.Navigator>
  );
};
