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

type ColumnConstraints<Model> = { [key in keyof Model]: string };

type ModelWhere<Model> = Partial<ColumnConstraints<Model>> & {
  id?: number;
};

export class Table<Model extends { [key: string]: any }> {
  readonly name: string;
  readonly column_constraints: ColumnConstraints<Model>;
  readonly db: Database;

  constructor(
    db: Database,
    name: string,
    column_constraints: ColumnConstraints<Model>
  ) {
    this.db = db;
    this.name = name;
    this.column_constraints = column_constraints;

    const columns = Object.keys(this.column_constraints);

    // db.execute("PRAGMA table_info(name)").then((res) =>
    //   console.log("table columns:", res)
    // );

    db.execute(
      `CREATE TABLE IF NOT EXISTS ${
        this.name
      } (id integer primary key not null, ${columns.map(
        (column) => `${column} ${this.column_constraints[column]}`
      )});`
    );
  }

  async find(where: ModelWhere<Model>) {
    const columns = Object.keys(where);

    const conditions = columns.map((column) => `${column} = ${where[column]}`);

    return this.db.execute(formatSelect(this.name, conditions));
  }

  create(obj: Model) {
    const columns = Object.keys(obj);
    const values = Object.values(obj);

    return this.db.execute(formatInsert(this.name, columns), values);
  }

  delete(where: ModelWhere<Model>) {
    const columns = Object.keys(where);

    const conditions = columns.map((column) => `${column} = ${where[column]}`);

    console.log(formatDelete(this.name, conditions));
  }
}
