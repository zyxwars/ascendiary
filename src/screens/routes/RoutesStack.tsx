import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { withId, routesModel } from "../../db/models";
import { Home } from "./Home";
import { AddRoute } from "./AddRoute";
import { EditRoute } from "./EditRoute";
import { Route } from "./Route";

export type RoutesStackParamList = {
  Home: undefined;
  "Add Route": undefined;
  Route: { id: number };
  "Edit Route": withId<routesModel>;
};

const Stack = createNativeStackNavigator<RoutesStackParamList>();

export const RoutesStackScreen = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Add Route" component={AddRoute} />
      <Stack.Screen name="Route" component={Route} />
      <Stack.Screen name="Edit Route" component={EditRoute} />
    </Stack.Navigator>
  );
};
