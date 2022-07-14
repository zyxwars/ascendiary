import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "./src/screens/home/Home";
import { AddRoute } from "./src/screens/add/AddRoute";
import { Route } from "./src/screens/route/Route";

type RootStackParamList = {
  Home: undefined;
  AddRoute: undefined;
  Route: { id: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="AddRoute" component={AddRoute} />
        <Stack.Screen name="Route" component={Route} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
