import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import Express from "express";
import { buildSchema, formatArgumentValidationError } from "type-graphql";
import { createConnection } from "typeorm";
import session from "express-session";
import connectRedis from "connect-redis";
import cors from "cors";

import { RegisterResolver } from "./modules/user/register";
import { redis } from "./redis";
import { LoginResolver } from "./modules/user/Login";
import { MeResolver } from "./modules/user/Me";
import { ConfirmUserResolver } from "./modules/user/ConfirmUser";

const main = async () => {
     await createConnection();

    const schema = await buildSchema({

        resolvers: [
            MeResolver,
            RegistrationResolver,
            LoginResolver,
            ConfirmUserResolver
         ],
         authChecker: ({ context: { req } }) => {
             return !!req.session.userId;

         }
    });

const apolloServer = new ApolloServer({
    schema,
    formatError: formatArgumentValidationError,
    context: ({ req }: any) => ({ req })
});

const app = Express();

const RedisStore = connectRedis(session);

app.use(
    session({
        store: new RedisStore({
            client: redis as any
        }),
        name: "tester",
        secret: "1a2b3c4d",
        resave: false,
        saveUnintalized: false,
        cookie: {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60*60*24*365 //1 year
        }
    })
);

    apolloServer.applyMiddleware({ app });

    app.listen(3000, () => {
        console.log("Server has been connected");
    });
};

main();
