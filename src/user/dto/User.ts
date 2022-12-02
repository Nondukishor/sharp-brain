import { IsAlpha, IsEmail, MaxLength, MinLength } from "class-validator";
import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateUserInput{
    @IsAlpha()
    @MinLength(3)
    @MaxLength(30)
    @Field()
    firstName: string;

    @IsAlpha()
    @MinLength(3)
    @MaxLength(30)
    @Field()
    lastName: string;

    @IsEmail()
    @Field()
    email: string;

    
    @MinLength(6)
    @MaxLength(12)
    @Field()
    password: string;
}


@InputType()
export class UserCredentialInput{
    @IsEmail()
    @Field()
    email: string;

    @MinLength(6)
    @MaxLength(12)
    @Field()
    password: string;
}