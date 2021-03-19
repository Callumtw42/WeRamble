import { MiddlewareFn } from "type-graphql";
import { appContext } from "../../types/appContext";

export const auth: MiddlewareFn<appContext> = async ({ context }, next) => {

    if(!context.req.session!.userId) {

        throw new Error("you havent confirmed your email yet");
    }

    return next();
};
