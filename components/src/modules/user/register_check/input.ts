import { Length, IsEmail } from "class-validator";
import { Field, InputType } from "type-graphql";
import { email_exist } from "components/src/modules/user/register_check/email_exist";

@InputType()
export class input {

    @Field()
    @Length(1, 255) 
    userName: string;

    @Field()
    @IsEmail()
    @email_exist({message: "that email is already in use"})
    email: string;

    @Field()
    password: string;
}
