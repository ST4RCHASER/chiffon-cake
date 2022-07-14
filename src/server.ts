require('dotenv').config();
import "reflect-metadata";
import { MediaResolver } from "./resolvers/media.resolver";
import { buildSchema } from "type-graphql";
import ApolloService from "./services/apollo.service";

const main = async () => {
    const schema = await buildSchema({
        resolvers: [MediaResolver],
        validate: false,
    })

    const apollo = new ApolloService(schema);
    apollo.start();
}
main().catch(console.error);