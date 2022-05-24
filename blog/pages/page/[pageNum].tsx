import type {GetStaticPaths, GetStaticProps, NextPage} from 'next'
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import {PostType} from "../../common/interfaces/post";
import PostCard from "../../common/components/PostCard";
import moment from "moment";
import Link from 'next/link';

interface HomeTypeProps {
    posts: PostType[],
    totalPageNum: number,
    pageNum: number,
}

const Home: NextPage<HomeTypeProps> = ({ posts, totalPageNum, pageNum }) => {
  return (
    <div className='flex flex-col'>
        <div className="flex flex-row justify-center">
            <div className="grow-0 shrink-0 basis-10/12 flex flex-wrap flex-row">
                {posts.map((post, index) => (
                    <PostCard post={post} key={index} isFirst={!index}/>
                ))}
            </div>
        </div>
        <div className='mt-4'>
            <div className='flex flex-row justify-center items-center space-x-1'>
                { (pageNum > 1) ? (<Link passHref href={`/page/${pageNum - 1}`}>
                    <div 
                        className='h-12 w-12 flex flex-row justify-center items-center dark:text-white
                        cursor-pointer hover:bg-red hover:text-white rounded-lg dark:hover:text-black font-bold'
                    >
                        &lt;
                    </div>
                </Link>) : null}
                {
                    ([...new Array(totalPageNum)]).map((_, i) => (
                        <Link passHref href={`/page/${i+1}`} key={`pageitem-${i}`}>
                            <div 
                                className={`h-12 w-12 flex flex-row justify-center items-center dark:text-white
                                cursor-pointer hover:bg-red hover:text-white rounded-lg dark:hover:text-black font-bold
                                ${(i + 1 === pageNum) ? "bg-red text-white dark:text-black" : ""}
                                `}
                            >
                                {i + 1}
                            </div>
                        </Link>
                    ))
                }
                { (totalPageNum > pageNum) ? (<Link passHref href={`/page/${pageNum + 1}`}>
                    <div 
                        className='h-12 w-12 flex flex-row justify-center items-center dark:text-white
                        cursor-pointer hover:bg-red hover:text-white rounded-lg dark:hover:text-black font-bold'
                    >
                        &gt;
                    </div>
                </Link>) : null}
            </div>
        </div>
    </div>
  )
}

export default Home

export const getStaticPaths: GetStaticPaths = async () => {
    const files = fs.readdirSync(path.join("posts"));

    const totalPageNum = Math.ceil(files.length / 5);

    const paths = [...new Array(totalPageNum)].map((_, i) => ({
        params: {
            pageNum: (i + 1).toString(),
        }
    }));

    return ({
        paths,
        fallback: false,
    })
}

export const getStaticProps: GetStaticProps = async (context) => {
    const pageNum = Number(context.params?.pageNum);

    const files = fs.readdirSync(path.join("posts"));

    const totalPageNum = Math.ceil(files.length / 5);

    const posts = files.map(filename => {
        const markdownWithMeta = fs.readFileSync(path.join("posts", filename), "utf-8")
        const {data: frontMatter} = matter(markdownWithMeta);

        return ({
            frontMatter,
            slug: filename.split(".")[0]
        })
    });

    const compareDate = (l:PostType, r:PostType):number => {
        const leftDate = moment(l.frontMatter.date);
        const rightDate = moment(r.frontMatter.date);

        return leftDate.isAfter(rightDate) ? -1 : 1;
    }

    return ({
        props: {
            posts: posts.sort(compareDate).slice(5 * (pageNum - 1), 5 * pageNum),
            totalPageNum,
            pageNum,
        }
    })
}
