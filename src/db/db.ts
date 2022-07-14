import * as SQLite from "expo-sqlite";
import { RouteModel } from "./models";

const _openDatabase = () => {
  const db = SQLite.openDatabase("db.db");
  return db;
};

export let db = _openDatabase();

export const clearDatabase = () => {
  db.closeAsync();
  db.deleteAsync();
  db = _openDatabase();
};

const _createTable = (name: string, model: any) =>
  `CREATE TABLE IF NOT EXISTS ${name} (${model})`;

export const populateDatabase = () => {
  _createTable("routes", RouteModel);
};
