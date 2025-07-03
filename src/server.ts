import Fastify from "fastify";
import cors from "@fastify/cors";
import { userRoutes } from "./routes/userRoutes";
import { productRoutes } from "./routes/productRoutes";
import { sectionRoutes } from "./routes/sectionRoutes";
import { tableRoutes } from "./routes/tableRoutes";
import { orderRoutes } from "./routes/orderRoutes";
import { orderProductRoutes } from "./routes/orderProductRoutes";

const fastify = Fastify({
  logger: true,
});

fastify.register(cors, {
  origin: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
});
fastify.register(userRoutes, { prefix: "/api" });
fastify.register(productRoutes, { prefix: "/api" });
fastify.register(sectionRoutes, { prefix: "/api" });
fastify.register(tableRoutes, { prefix: "/api" });
fastify.register(orderRoutes, { prefix: "/api" });
fastify.register(orderProductRoutes, { prefix: "/api" });

const start = async () => {
  try {
    const PORT = Number(process.env.PORT) || 8080;

    await fastify.listen({
      port: Number(PORT),
      host: "0.0.0.0",
    });
    console.log(`Server running on http://localhost:${PORT}`);
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

start();
