import "@rneui/themed";

declare module "@rneui/themed" {
  export interface Colors {
    action: string;
  }
}

import "react-native-get-random-values";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider as StateProvider } from "jotai";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { Home } from "./src/screens/home/Home";
import { AddRoute } from "./src/screens/AddRoute";
import { Route } from "./src/screens/Route";
import { clearDatabase, db, populateDatabase } from "./src/db/db";
import { ThemeProvider } from "@rneui/themed";
import { theme } from "./src/theme/theme";

type RootStackParamList = {
  Home: undefined;
  AddRoute: undefined;
  Route: { id: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

// clearDatabase();

export default function App() {
  useEffect(() => {
    populateDatabase();
  }, []);

  return (
    <SafeAreaProvider>
      <StateProvider>
        <ThemeProvider theme={theme}>
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
