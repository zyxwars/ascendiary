import { db } from "./db";

export const findMany = async (table: string) => {
  let res: any = [];

  const testing = new Promise<any[]>((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql("SELECT * FROM " + table, [], (_, { rows: { _array } }) =>
        resolve(_array)
      );
    }, reject);
  });

  testing.then((value) => console.log("test", value));

  return res;
};

export const create = (table: string, fields: string, values: any[]) => {
  db.transaction((tx) => {
    tx.executeSql(
      `INSERT INTO ${table} (${fields}) values (${values.map(() => "?, ")})`,
      values
    );
  });
};
