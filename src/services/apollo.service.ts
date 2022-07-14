import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import express from 'express';
import http from 'http';

class ApolloService {
    constructor(private resolvers) {

    }
    async start() {
        const app = express();
        const httpServer = http.createServer(app);
        const server = new ApolloServer({
            schema: this.resolvers,
            csrfPrevention: true,
            introspection: true,
            cache: 'bounded',
            plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
            context: ({ req, res }) => ({ req, res })
        });
        await server.start();
        server.applyMiddleware({ app });
        await new Promise<void>(resolve => httpServer.listen({ port: 4000 }, resolve));
        console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
    }
}

export default ApolloService;