import {GetStaticPaths, GetStaticProps, NextPage} from "next";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import {serialize} from "next-mdx-remote/serialize";
import {MDXRemote} from "next-mdx-remote";
import SyntaxHighlighter from "react-syntax-highlighter";
import {FrontMatterType} from "../interfaces/post";
import {MDXRemoteSerializeResult} from "next-mdx-remote/dist/types";
import React from "react";

const Button: React.FC<{ text: string }> = ({ text }) => {
    return (
        <button
            className="btn btn-primary"
            onClick={event => event.target.innerText = 'You clicked me!'}
        >
            {text}
        </button>
    )
}

interface PostPageTypeProps {
    frontMatter: FrontMatterType,
    mdxSource: MDXRemoteSerializeResult
}

const PostPage: NextPage<PostPageTypeProps> = ({frontMatter: {title}, mdxSource}) => {
    return (
        <div className="mt-4">
            <h1>{title}</h1>
            <MDXRemote {...mdxSource} components={{ SyntaxHighlighter, Button }} />
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

    const mdxSource = await serialize(content);

    return ({
        props: {
            frontMatter,
            slug,
            mdxSource
        }
    })
}

export default PostPage;