import { UserRepository } from "../repositories/UserRepository";
import { User } from "../types/user";

export class UserService {
  private readonly userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async getUserByUsername(username: string): Promise<User | null> {
    return this.userRepository.findByUsername(username);
  }

  async validateUserCredentials(username: string, password: string): Promise<User> {
    const user = await this.getUserByUsername(username);
    if (!user || user.password !== password) {
      throw new Error("Invalid credentials");
    }
    return user;
  }
}
