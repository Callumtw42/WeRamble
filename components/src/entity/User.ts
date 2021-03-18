import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { ObjectType, Field, ID, Root } from "type-graphql";

@ObjectType()
@Entity()
export class User extends BaseEntity {
    

    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    userName: string;

    @Field()
    @Column("text", { unique: true })
    email: string;

    @Field()
    name(@Root() parent: User): string {
        
        return `${parent.userName}`;
    }

    @Column()
    password: string;

    @Column("bool", { default: false })
    confirmed: boolean;

}

