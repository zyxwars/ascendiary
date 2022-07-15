export const formatSelect = (
  table: string,
  conditions: string[],
  columns: string = "*"
) =>
  `SELECT ${columns} FROM ${table}` +
  (conditions.length > 0 ? `WHERE ${conditions.join(", ")};` : "");

export const formatInsert = (table: string, fields: string[]) =>
  `INSERT INTO ${table} (${fields.join(", ")}) VALUES (${fields
    .map(() => "?")
    .join(", ")});`;

export const formatDelete = (table: string, conditions: string[]) =>
  `DELETE FROM ${table} WHERE ${conditions.join(", ")};`;
