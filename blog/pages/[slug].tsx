import {GetStaticPaths, GetStaticProps, NextPage} from "next";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import {serialize} from "next-mdx-remote/serialize";
import {MDXRemote, MDXRemoteSerializeResult} from "next-mdx-remote";
import { PrismAsync as SyntaxHighlighter } from "react-syntax-highlighter";
import {FrontMatterType} from "../common/interfaces/post";
import React from "react";
import moment from "moment";
import Image from "next/image";
import remarkGfm from "remark-gfm";

interface PostPageTypeProps {
    frontMatter: FrontMatterType,
    mdxSource: MDXRemoteSerializeResult
}

const PostPage: NextPage<PostPageTypeProps> = ({frontMatter: {title, date, image}, mdxSource}) => {
    return (
        <div className="flex flex-row justify-center">
            <article className={"prose"}>
                <div className="flex flex-col items-center">
                    <h1>{title}</h1>
                    <p className="m-0 font-normal text-gray-500 mb-12">
                        {moment(date).format("ll")}
                    </p>
                    <div className="w-full aspect-video relative rounded-lg overflow-hidden">
                        <Image
                            src={image}
                            alt="thumbnail"
                            layout={"fill"}
                            objectFit="cover"
                        />
                    </div>
                </div>
                <MDXRemote {...mdxSource} components={{ SyntaxHighlighter, Image }} />
            </article>
        </div>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    const files = fs.readdirSync(path.join("posts"));

    const paths = files.map(filename => ({
        params: {
            slug: filename.replace(".mdx", "")
        }
    }));

    return ({
        paths,
        fallback: false,
    })
}

export const getStaticProps: GetStaticProps = async ({ params: { slug }}) => {
    const markdownWithMeta = fs.readFileSync(path.join("posts", slug + ".mdx"), "utf-8");

    const {data: frontMatter, content} = matter(markdownWithMeta);

    const mdxSource = await serialize(content, {
        mdxOptions: {
            remarkPlugins: [remarkGfm, require('remark-prism'),]
        },
    });

    return ({
        props: {
            frontMatter,
            slug,
            mdxSource
        }
    })
}

export default PostPage;