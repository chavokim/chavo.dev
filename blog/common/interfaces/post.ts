export type FrontMatterType = { [key: string]: any }

export interface PostType {
    frontMatter: FrontMatterType,
    slug: string,
}