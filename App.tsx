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
import { atom, Provider as JotaiProvider, useAtom } from "jotai";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "./src/screens/home/Home";
import { AddRoute } from "./src/screens/route/AddRoute";
import { Route } from "./src/screens/route/Route";
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
    <JotaiProvider>
      <ThemeProvider theme={theme}>
        <SafeAreaProvider>
          <GlobalDialog />
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="AddRoute" component={AddRoute} />
              <Stack.Screen name="Route" component={Route} />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </ThemeProvider>
    </JotaiProvider>
  );
}
