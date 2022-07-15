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
