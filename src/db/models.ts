import { Table } from "../lib/sql";
import { db } from "./db";

export type routesModel = {
  name: string;
};
export const routesTable = new Table<routesModel>(db, "routes", {
  name: "string not null",
});
