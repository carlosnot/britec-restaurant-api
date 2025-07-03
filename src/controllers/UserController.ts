import { FastifyRequest, FastifyReply } from "fastify";
import { UserService } from "../services/UserService";

export class UserController {
  private readonly userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async getUserByUsername(request: FastifyRequest<{ Querystring: { username: string } }>, reply: FastifyReply) {
    try {
      const { username } = request.query;
      const user = await this.userService.getUserByUsername(username);

      if (!user) {
        return reply.status(404).send({ message: "User not found" });
      }

      return reply.send(user);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Internal server error";
      return reply.status(500).send({ message });
    }
  }

  async login(request: FastifyRequest<{ Body: { username: string; password: string } }>, reply: FastifyReply) {
    try {
      const { username, password } = request.body;
      const user = await this.userService.validateUserCredentials(username, password);
      return reply.send({
        message: "Login successful",
        user: {
          id: user.id,
          username: user.username,
        },
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Invalid credentials";
      return reply.status(401).send({ message });
    }
  }
}
