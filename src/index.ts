import Fastify from "fastify";
import mercurius from "mercurius";
import fastifyCors from "@fastify/cors";

const main = async () => {
  const gateway = Fastify();

  gateway.register(fastifyCors, {
    // ! add cors
    origin: ["http://localhost:3099"],
    methods: ["GET", "PUT", "POST", "DELETE", "HEAD", "OPTIONS", "PATCH"],
    credentials: true,
  });

  gateway.register(mercurius, {
    graphiql: "graphiql",
    subscription: true,
    gateway: {
      pollingInterval: 1000,

      services: [
        {
          name: "user",
          url: "http://localhost:3032/graphql",
        },
        {
          name: "expense",
          url: "http://localhost:3033/graphql",
          wsUrl: "ws://localhost:3033/graphql",
        },
      ],
    },
  });

  await gateway.listen(4000);
};

main().catch((error) => {
  console.error(error);
});
