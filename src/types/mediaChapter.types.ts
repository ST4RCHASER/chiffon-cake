import { ObjectType, Field, Int } from "type-graphql";
import { ChapterPage } from "./chapterPage.types";

@ObjectType()
export class MediaChapter {

    @Field(() => String)
    chapterId: String;

    @Field(() => String)
    name: string;

    @Field(() => Int)
    chapterCount: number;

    @Field(() => Date)
    lastUpdated: Date;

    @Field(() => [ChapterPage])
    pages: ChapterPage[];

}