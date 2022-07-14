import { ObjectType, Field, Int, registerEnumType } from "type-graphql";
import { MediaChapter } from "./mediaChapter.types";

export enum MediaType {
    MANGA = "MANGA",
    NOVEL = "NOVEL",
}

registerEnumType(MediaType, {
    name: "MediaType",
    description: "The type of media",
});

@ObjectType()
export class IndexMedia {

    @Field(() => Int)
    siteId: number;

    @Field(() => String)
    mediaId: string;

    @Field(() => String)
    title: string;

    @Field(() => [String])
    otherTitles: string[];

    @Field(() => [String])
    tags: string[];

    @Field(() => String)
    thumbnail: string;

    @Field(() => Int)
    year: number;

    @Field(() => Date)
    lastUpdated: Date;

    @Field(() => String)
    status: string;

    @Field(() => Int)
    totalChapters: number;

    @Field(() => Int)
    totalPages: number;

}

@ObjectType()
export class Media {

    @Field(() => Int)
    siteId: number;

    @Field(() => String)
    mediaId: string;

    @Field(() => MediaType)
    mediaType: typeof MediaType[keyof typeof MediaType];

    @Field(() => Int)
    totalChapters: number;

    @Field(() => [MediaChapter])
    chapters: MediaChapter[];

    @Field(() => Date)
    created: Date;

    @Field(() => Date)
    lastUpdated: Date;

    @Field(() => String)
    title: string;

    @Field(() => [String])
    otherTitles: string[];

    @Field(() => String)
    status: string;

    @Field(() => String)
    description: string;

    @Field(() => Int)
    year: number;

    @Field(() => String)
    thumbnail: string;

    @Field(() => String)
    writer: string;

    @Field(() => String)
    artist: string;

    @Field(() => [String])
    tags: string[];

    @Field(() => String)
    publisher: string;
}