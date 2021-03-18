import { Resolver, Query, Ctx } from "type-graphql";
import { User } from "../../entity/User";
import { appContext } from "../../types/appContext";



@Resolver()
export class MeResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() ctx: appContext): Promise<User | undefined> {
    if (!ctx.req.session!.userId) {
      return undefined;
    }

    return User.findOne(ctx.req.session!.userId);
  }
}
