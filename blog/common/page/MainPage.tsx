import {NextPage} from "next";
import PostCard from "../components/PostCard";
import Link from "next/link";
import {PostType} from "../interfaces/post";

export interface MainPageTypeProps {
    posts: PostType[],
    totalPageNum: number,
    pageNum: number,
}

const MainPage: NextPage<MainPageTypeProps> = ({ posts, totalPageNum, pageNum }) => {
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

export default MainPage