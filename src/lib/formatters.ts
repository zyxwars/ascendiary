const formatForValues = (cols: string[]) => cols.map((col) => `${col} = (?)`);

export const formatSelect = (
  table: string,
  conditionCols: string[],
  columns: string = "*"
) =>
  `SELECT ${columns} FROM ${table} ` +
  (conditionCols.length > 0 ? `WHERE ${formatForValues(conditionCols)}` : "");

export const formatInsert = (table: string, fields: string[]) =>
  `INSERT INTO ${table} (${fields.join(", ")}) VALUES (${fields
    .map(() => "?")
    .join(", ")});`;

export const formatUpdate = (
  table: string,
  setCols: string[],
  conditionCols: string[]
) =>
  `UPDATE ${table} SET ${formatForValues(setCols)} WHERE ${formatForValues(
    conditionCols
  )};`;

export const formatDelete = (table: string, conditionCols: string[]) =>
  `DELETE FROM ${table} WHERE ${formatForValues(conditionCols)};`;
