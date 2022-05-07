import { createServer } from "http";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { WebSocketServer } from "ws";
import { SubscriptionServer } from "subscriptions-transport-ws";
import { execute, subscribe } from "graphql";

import typeDefs from "./graphql/type-defs";
import resolvers from "./graphql/resolvers/index";
import express from "express";
import pubSub from "./pubsub";
import db from "./data";

const PORT = 4000;
const schema = makeExecutableSchema({ typeDefs, resolvers });
const app = express();
const httpServer = createServer(app);

const wsServer = new WebSocketServer({
  server: httpServer,
  path: "/graphql",
});

const serverCleanup = SubscriptionServer.create(
  {
    schema,
    execute,
    subscribe,
    onConnect() {
      return {
        pubSub,
        db,
      };
    },
  },
  wsServer
);

const server = new ApolloServer({
  schema,
  context: async () => ({
    pubSub,
    db,
  }),

  plugins: [
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
    ApolloServerPluginLandingPageGraphQLPlayground(),
  ],
});

(async function () {
  await server.start();
  server.applyMiddleware({ app });
})();

try {
  httpServer.listen(PORT, () => {
    console.log(
      `🚀 Query endpoint ready at http://localhost:${PORT}${server.graphqlPath}`
    );

    console.log(
      `🚀 Subscription endpoint ready at ws://localhost:${PORT}${server.graphqlPath}`
    );
  });

  console.log(`server ==> HERŞEY YOLUNDA`);
} catch (error) {
  console.log("Apollo server error !!!!!! ");
  throw new Error(error);
}