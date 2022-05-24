import React from "react";
import {PostType} from "../interfaces/post";
import Image from "next/image";
import Link from "next/link";
import moment from "moment";

interface PostCardProps {
    post: PostType,
    isFirst: boolean,
}

const PostCard:React.FC<PostCardProps> = ({post, isFirst}) => {
    return (
        <div className={`px-4 break-word basis-full lg:basis-6/12 ${isFirst ? "lg:basis-full" : ""}`}>
            <article className="mb-16 flex flex-col">
                <Link href={`/blog/${post.slug}`} passHref>
                    <div
                        className="overflow-hidden rounded-xl flex mb-4 relative aspect-video cursor-pointer"
                    >
                        <Image
                            src={post.frontMatter.image}
                            className="hover:scale-110 transition-all ease-in-out"
                            alt="thumbnail"
                            layout={"fill"}
                            objectFit="cover"
                        />
                    </div>
                </Link>
                <div className="card-body">
                    <p className="text-base text-gray-500 font-normal mb-2 dark:text-gray-400">
                        {moment(post.frontMatter.date).format("ll")}
                    </p>
                    <Link href={`/blog/${post.slug}`} passHref>
                        <button className="text-black dark:text-gray-200 text-3xl text-left
                        font-bold hover:text-red dark:hover:text-red transition-all ease-in-out
                        duration-200 mb-3">
                            {post.frontMatter.title}
                        </button>
                    </Link>
                    <p className="break-word text-base text-gray-500 font-light mb-2 dark:text-gray-400">
                        {post.frontMatter.excerpt}
                    </p>
                    <Link href={`/blog/${post.slug}`} passHref>
                        <a className="text-base text-gray-500 font-normal
                        hover:text-red transition-all ease-in-out dark:text-gray-400
                        duration-200">
                            읽으러 가기 →
                        </a>
                    </Link>
                </div>
            </article>
        </div>
    )
}

export default PostCard;
