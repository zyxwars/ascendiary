import "react-native-gesture-handler";
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
import { Icon, ThemeProvider } from "@rneui/themed";
import { theme } from "./src/theme/theme";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  RoutesStackParamList,
  RoutesStackScreen,
} from "./src/screens/routes/RoutesStack";
import {
  CragsStackParamList,
  CragsStackScreen,
} from "./src/screens/crags/CragsStack";

export type RootStackParamList = RoutesStackParamList & CragsStackParamList;

const Tab = createBottomTabNavigator();

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

// db.clearDatabase();

export default function App() {
  return (
    <JotaiProvider>
      <ThemeProvider theme={theme}>
        <SafeAreaProvider>
          <NavigationContainer>
            <Tab.Navigator
              sceneContainerStyle={{ paddingBottom: 78 }}
              screenOptions={({ route }) => ({
                tabBarStyle: {
                  position: "absolute",
                  left: 16,
                  right: 16,
                  height: 64,
                  bottom: 16,
                  backgroundColor: "white",
                  borderRadius: 32,
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  elevation: 3,
                },
                tabBarShowLabel: false,
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName = "circle";

                  if (route.name === "Routes") iconName = "alt-route";
                  else if (route.name === "Crags") iconName = "terrain";
                  else if (route.name === "Settings") iconName = "settings";

                  return (
                    <Icon
                      name={iconName}
                      color={color}
                      size={size}
                      type="material"
                    />
                  );
                },
                // TODO: Get these from theme provider
                tabBarActiveTintColor: "red",
                tabBarInactiveTintColor: "black",
              })}
            >
              <Tab.Screen name="Routes" component={RoutesStackScreen} />
              <Tab.Screen name="Crags" component={CragsStackScreen} />
              <Tab.Screen name="Settings" component={CragsStackScreen} />
            </Tab.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </ThemeProvider>
    </JotaiProvider>
  );
}
