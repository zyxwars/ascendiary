import * as SQLite from "expo-sqlite";
import { formatSelect, formatInsert, formatDelete } from "./formatters";

export class Database {
  private db: SQLite.WebSQLDatabase;
  private readonly name: string;

  constructor(name: string = "db.db") {
    this.name = name;
    this.db = this._openDatabase();
  }

  private _openDatabase = () => {
    return SQLite.openDatabase(this.name);
  };

  clearDatabase = () => {
    this.db.closeAsync();
    this.db.deleteAsync();

    this.db = this._openDatabase();
  };

  execute = (sqlStatement: string, args?: (string | number)[] | undefined) => {
    return new Promise<SQLite.SQLResultSet>((resolve, reject) => {
      this.db.transaction((tx) => {
        tx.executeSql(sqlStatement, args, (_, res) => {
          resolve(res);
        });
      }, reject);
    });
  };
}

type ModelObj<Model> = { [key in keyof Model]: any };

type OptionalWhere<Model> = Partial<ModelObj<Model>> & {
  id?: number;
};

export class Table<Model extends { [key: string]: string }> {
  readonly name: string;
  readonly model: Model;
  readonly db: Database;

  constructor(db: Database, name: string, model: Model) {
    this.db = db;
    this.name = name;
    this.model = model;

    const fields = Object.keys(this.model);

    // db.execute("PRAGMA table_info(name)").then((res) =>
    //   console.log("table columns:", res)
    // );

    db.execute(
      `CREATE TABLE IF NOT EXISTS ${
        this.name
      } (id integer primary key not null, ${fields.map(
        (field) => `${field} ${this.model[field]}`
      )});`
    );
  }

  async find(where: OptionalWhere<Model>) {
    const fields = Object.keys(where);

    const conditions = fields.map((field) => `${field} = ${where[field]}`);

    return this.db.execute(formatSelect(this.name, conditions));
  }

  create(obj: ModelObj<Model>) {
    const fields = Object.keys(obj);
    const values = Object.values(obj);

    return this.db.execute(formatInsert(this.name, fields), values);
  }

  delete(where: OptionalWhere<Model>) {
    const fields = Object.keys(where);

    const conditions = fields.map((field) => `${field} = ${where[field]}`);

    console.log(formatDelete(this.name, conditions));
  }
}
