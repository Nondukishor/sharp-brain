import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class User{
    @PrimaryGeneratedColumn()
    @Field(()=>Int)
    id: number;


    @Column()
    @Field()
    name: string;

    @Column({nullable: true})
    @Field({nullable: true})
    type?:string;
}