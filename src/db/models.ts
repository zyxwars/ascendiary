import { Table } from "../lib/sql";
import { db } from "./db";

export type withId<Model> = Model & {
  id: number;
};

export type cragsModel = {
  name: string;
  thumbnail?: string;
};
export const cragsTable = new Table<cragsModel>(db, "crags", {
  name: "text unique not null",
  thumbnail: "text",
});

export type routesModel = {
  name: string;
  grade: number;
  thumbnail?: string;
  cragid: number;
};
export const routesTable = new Table<routesModel>(
  db,
  "routes",
  {
    name: "text not null",
    grade: "integer",
    thumbnail: "text",
    cragid: "integer",
  },
  "FOREIGN KEY (cragid) REFERENCES crags ( id )"
);
