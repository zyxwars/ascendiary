import { Table } from "../lib/sql";
import { db } from "./db";

export const routesTable = new Table(db, "routes", {
  name: "string not null",
});
