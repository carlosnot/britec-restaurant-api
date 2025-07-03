import { FastifyInstance } from "fastify";
import { UserController } from "../controllers/UserController";

export async function userRoutes(fastify: FastifyInstance) {
  const userController = new UserController();

  fastify.get("/users", userController.getUserByUsername.bind(userController));
  fastify.post("/users/login", userController.login.bind(userController));
}
