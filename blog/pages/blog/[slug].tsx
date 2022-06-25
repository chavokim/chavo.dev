import Head from "next/head";
import {GetStaticPaths, GetStaticProps, NextPage} from "next";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import {serialize} from "next-mdx-remote/serialize";
import {MDXRemote, MDXRemoteSerializeResult} from "next-mdx-remote";
import {FrontMatterType} from "../../common/interfaces/post";
import React from "react";
import moment from "moment";
import Image from "next/image";
import remarkGfm from "remark-gfm";
import DisqusComments from "../../common/components/DisqusComments";

interface PostPageTypeProps {
    frontMatter: FrontMatterType,
    mdxSource: MDXRemoteSerializeResult,
    slug: string,
}

const PostPage: NextPage<PostPageTypeProps> = ({frontMatter, mdxSource, slug}) => {
    const {title, date, image, excerpt} = frontMatter; 
    
    return (
        <>
            <Head>
                <title>Chavolog - {title}</title>
                <meta name="description" content={excerpt} key={"description"} />
                <meta property="og:title" content={title} key={"og-title"} />
                <meta property="og:description" content={excerpt} key={"og-description"} />
                <meta property="og:image" content={image} key={"og-image"} />
            </Head>
            <div className="flex flex-col items-center px-4 sm:px-0">
                <article className={"prose overflow-hidden dark:prose-invert"}>
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
                    <MDXRemote {...mdxSource} components={{ Image }} />
                </article>
                <div
                    className="mt-24 w-full"
                >
                    <DisqusComments
                        frontMatter={frontMatter}
                        slug={slug}
                    />
                </div>
            </div>
        </>
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

export const getStaticProps: GetStaticProps = async (context) => {
    const slug = context.params?.slug;

    const markdownWithMeta = fs.readFileSync(path.join("posts", slug + ".mdx"), "utf-8");

    const {data: frontMatter, content} = matter(markdownWithMeta);

    const mdxSource = await serialize(content, {
        mdxOptions: {
            remarkPlugins: [
                remarkGfm, 
                require('remark-prism'),
            ]
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