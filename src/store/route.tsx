import create from "zustand";
import { v4 as uuidv4 } from "uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RouteType } from "../types/RouteType";

interface StoreState {
  data: RouteType | null;
  loading: boolean;
  error: string;
}

export const useRouteStore = create<StoreState>()((set) => ({
  data: null,
  loading: true,
  error: "",
}));

export const getRoute = async (id: string) => {
  const route = await AsyncStorage.getItem(id);

  if (!route)
    return useRouteStore.setState({
      data: null,
      loading: false,
      error: "Route not found in database",
    });

  useRouteStore.setState({
    data: JSON.parse(route),
    loading: false,
    error: "",
  });
};

export const getRoutes = async () => {
  const keys = await AsyncStorage.getAllKeys();

  const routeKeys = keys.filter((key) => key.startsWith("route"));

  return await AsyncStorage.multiGet(routeKeys);
};

export const createRoute = async (
  name: string,
  crag: string,
  grade: string
) => {
  const id = "route" + uuidv4();
  const newRoute = { id, name, crag, grade };

  await AsyncStorage.setItem(id, JSON.stringify(newRoute));

  return newRoute;
};
