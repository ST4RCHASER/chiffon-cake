import { ObjectType, Field, Int } from "type-graphql";

@ObjectType()
export class Page {

    @Field(() => Int, { defaultValue: 1 })
    page: number;

    @Field(() => Boolean, { nullable: true })
    hasNext?: boolean;

    @Field(() => Boolean, { nullable: true })
    hasPrevious?: boolean;

    @Field(() => Int, { defaultValue: 20 })
    perPage: number;

    @Field(() => Int, { nullable: true })
    totalPages?: number;

}