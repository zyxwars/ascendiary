import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { withId, routesModel } from "../../db/models";
import { Home } from "./Home";
import { AddRoute } from "./AddRoute";
import { EditRoute } from "./EditRoute";
import { Route } from "./Route";

export type RoutesStackParamList = {
  Home: undefined;
  AddRoute: undefined;
  Route: { id: number };
  EditRoute: withId<routesModel>;
};

const Stack = createNativeStackNavigator<RoutesStackParamList>();

export const RoutesStackScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="AddRoute" component={AddRoute} />
      <Stack.Screen name="Route" component={Route} />
      <Stack.Screen name="EditRoute" component={EditRoute} />
    </Stack.Navigator>
  );
};
