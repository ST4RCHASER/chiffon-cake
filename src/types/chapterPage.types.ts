import { ObjectType, Field, Int, registerEnumType } from "type-graphql";

export enum PageType {
    IMAGE = "IMAGE",
    VIDEO = "VIDEO",
    AUDIO = "AUDIO",
    RAW = "RAW",
    HTML = "HTML",
    BBCODE = "BBCODE",
}

registerEnumType(PageType, {
    name: "PageType",
    description: "The type of page",
});

@ObjectType()
export class ChapterPage {
    
    @Field(() => String)
    pageId: string;

    @Field(() => String)
    content: string;

    @Field(() => String)
    name: string;

    @Field(() => PageType)
    pageType: typeof PageType[keyof typeof PageType];

}