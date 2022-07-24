import { Table } from "../lib/sql";
import { db } from "./db";

export type withId<Model> = Model & {
  id: number;
};

export type cragsModel = {
  name: string;
};
export const cragsTable = new Table<cragsModel>(db, "crags", {
  name: "text not null",
});

export type routesModel = {
  name: string;
  thumbnail?: string;
  cragid: number;
};
export const routesTable = new Table<routesModel>(
  db,
  "routes",
  {
    name: "text not null",
    thumbnail: "text",
    cragid: "integer",
  },
  "FOREIGN KEY (cragid) REFERENCES crags ( id )"
);
