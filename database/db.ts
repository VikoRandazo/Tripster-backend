import mysql, { Pool, PoolOptions } from "mysql2";

const config: PoolOptions = {
  host: "localhost",
  user: "root",
  password: "Vikoran12",
  database: "vacations_db",
};

export const db: Pool = mysql.createPool(config);

export const execute = (query: string, values: any[]) => {
  return new Promise<any>((resolve, reject) => {
    db.query(query, values, (err, result) => {
      if (err) {
        console.error("There was an error", err);
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};
