import sqlite3 from "better-sqlite3";

export const handler = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify(sqlite3, null, 2),
  };
};
