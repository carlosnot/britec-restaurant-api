import Database from "../config/Database";
import type { User } from "../types/user";

export class UserRepository {
  async findByUsername(username: string): Promise<User | null> {
    try {
      const [result] = await Database.query(
        `
        SELECT 
          CodCliente as id,
          Nome as username,
          Senha as password
        FROM supermercado.usuariopdv
          WHERE Nome = ?
        `,
        [username]
      );
      return (result as User) || null;
    } catch (error) {
      console.error("Database error:", error);
      throw new Error("Failed to find user by name.");
    }
  }
}
