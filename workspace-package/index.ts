import pg from "pg";

export const handler = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify(pg, null, 2),
  };
};
