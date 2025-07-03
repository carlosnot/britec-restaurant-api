import mysql, { type PoolOptions, type Pool } from "mysql2/promise";

class Database {
  private static instance: Database;
  private pool: Pool;

  private constructor() {
    const access: PoolOptions = {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      waitForConnections: true,
      connectionLimit: 10,
    };

    this.pool = mysql.createPool(access);
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public async query(sql: string, params?: any[]): Promise<any> {
    const [rows] = await this.pool.query(sql, params);
    return rows;
  }

  public async close(): Promise<void> {
    await this.pool.end();
  }
}

export default Database.getInstance();
