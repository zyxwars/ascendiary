import * as SQLite from "expo-sqlite";
import {
  formatSelect,
  formatInsert,
  formatDelete,
  formatUpdate,
} from "./formatters";

const filterUndefinedValues = (obj: Record<any, any>) => {
  const copy = { ...obj };

  Object.keys(copy).forEach((key) => {
    if (copy[key] === undefined) {
      delete copy[key];
    }
  });

  return copy;
};

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

type ModelPartialWithId<Model> = Partial<Model> & {
  id?: number;
};

export class Table<Model extends { [key: string]: string | number }> {
  readonly name: string;
  readonly column_constraints: ColumnConstraints<Model>;
  readonly extra_constraints: string;
  readonly db: Database;

  constructor(
    db: Database,
    name: string,
    column_constraints: ColumnConstraints<Model>,
    extra_constraints: string = ""
  ) {
    this.db = db;
    this.name = name;
    this.column_constraints = column_constraints;
    this.extra_constraints = extra_constraints;

    const columns = Object.keys(this.column_constraints);

    // db.execute(`PRAGMA table_info(${this.name})`).then((res) =>
    //   console.log("table columns:", res)
    // );

    db.execute(
      `CREATE TABLE IF NOT EXISTS ${
        this.name
      } (id integer primary key not null, ${columns.map(
        (column) => `${column} ${this.column_constraints[column]}`
      )}${extra_constraints ? `, ${extra_constraints}` : ""});`
    );
  }

  find(where: ModelPartialWithId<Model>) {
    const cleanedWhere = filterUndefinedValues(where);

    const conditionCols = Object.keys(cleanedWhere);
    const conditions = Object.values(cleanedWhere);

    return this.db.execute(formatSelect(this.name, conditionCols), conditions);
  }

  create(obj: Model) {
    const cleanedObj = filterUndefinedValues(obj);

    const columns = Object.keys(cleanedObj);
    const values = Object.values(cleanedObj);

    return this.db.execute(formatInsert(this.name, columns), values);
  }

  update(where: ModelPartialWithId<Model>, obj: ModelPartialWithId<Model>) {
    const cleanedWhere = filterUndefinedValues(where);
    const cleanedObj = filterUndefinedValues(obj);

    const conditionCols = Object.keys(where);
    const setCols = Object.keys(obj);

    const values = [
      ...Object.values(cleanedObj),
      ...Object.values(cleanedWhere),
    ];

    return this.db.execute(
      formatUpdate(this.name, setCols, conditionCols),
      values
    );
  }

  delete(where: ModelPartialWithId<Model>) {
    const cleanedWhere = filterUndefinedValues(where);

    const conditionCols = Object.keys(cleanedWhere);
    const conditions = Object.values(cleanedWhere);

    return this.db.execute(formatDelete(this.name, conditionCols), conditions);
  }
}
