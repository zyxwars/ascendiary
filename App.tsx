import "react-native-get-random-values";
import "@rneui/themed";

declare module "@rneui/themed" {
  export interface Colors {
    action: string;
  }
}

// Initialize database
import { db } from "./src/db/db";
import "./src/db/models";

import { SafeAreaProvider } from "react-native-safe-area-context";
import { atom, Provider as StateProvider, useAtom } from "jotai";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { Home } from "./src/screens/home/Home";
import { AddRoute } from "./src/screens/AddRoute";
import { Route } from "./src/screens/Route";
import { ThemeProvider } from "@rneui/themed";
import { theme } from "./src/theme/theme";
import { GlobalDialog } from "./src/components/GlobalDialog";

type RootStackParamList = {
  Home: undefined;
  AddRoute: undefined;
  Route: { id: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

// db.clearDatabase();

export default function App() {
  return (
    <SafeAreaProvider>
      <StateProvider>
        <ThemeProvider theme={theme}>
          <GlobalDialog />
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="AddRoute" component={AddRoute} />
              <Stack.Screen name="Route" component={Route} />
            </Stack.Navigator>
          </NavigationContainer>
        </ThemeProvider>
      </StateProvider>
    </SafeAreaProvider>
  );
}
