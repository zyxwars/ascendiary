import { Table } from "../lib/sql";
import { db } from "./db";

export type routesModel = {
  name: string;
  thumbnail?: string;
};
export const routesTable = new Table<routesModel>(db, "routes", {
  name: "text not null",
  thumbnail: "text",
});
