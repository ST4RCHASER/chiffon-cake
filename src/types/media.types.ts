import { ObjectType, Field, Int, registerEnumType } from "type-graphql";
import { MediaChapter } from "./mediaChapter.types";

export enum MediaType {
    MANGA = "MANGA",
    NOVEL = "NOVEL",
}

export enum MediaStatus {
    COMPLETED = "COMPLETED",
    ONGOING = "ONGOING",
    UNKNOWN = "UNKNOWN",
}

registerEnumType(MediaType, {
    name: "MediaType",
    description: "The type of media",
});

registerEnumType(MediaStatus, {
    name: "MediaStatus",
    description: "The status of media",
});

@ObjectType()
export class IndexMedia {

    @Field(() => Int)
    siteId: number;

    @Field(() => String)
    mediaId: string;

    @Field(() => String, { nullable: true })
    title?: string;

    @Field(() => [String])
    otherTitles: string[];

    @Field(() => [String])
    tags: string[];

    @Field(() => String, { nullable: true })
    thumbnail?: string;

    @Field(() => Int)
    year: number;

    @Field(() => Date)
    lastUpdated: Date;

    @Field(() => String)
    status: MediaStatus;

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

    @Field(() => String, { nullable: true })
    title?: string;

    @Field(() => [String])
    otherTitles: string[];

    @Field(() => String)
    status: MediaStatus;

    @Field(() => String, { nullable: true })
    description?: string;

    @Field(() => Int)
    year: number;

    @Field(() => String, { nullable: true })
    thumbnail?: string;

    @Field(() => String)
    writer: string;

    @Field(() => String)
    artist: string;

    @Field(() => [String])
    tags: string[];

    @Field(() => String, { nullable: true })
    publisher?: string;
}