import { MiddlewareFn } from "type-graphql";
import { appContext } from "../../types/appContext";

export const logger: MiddlewareFn<appContext> = async ({ args }, next) => {

    console.log("args:", args);

    return next();
};
