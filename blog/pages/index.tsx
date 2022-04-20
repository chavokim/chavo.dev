import type {GetStaticProps, NextPage} from 'next'
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import {PostType} from "../common/interfaces/post";
import PostCard from "../common/components/PostCard";
import moment from "moment";

interface HomeTypeProps {
    posts: PostType[]
}

const Home: NextPage<HomeTypeProps> = ({ posts }) => {
  return (
    <div className="flex flex-row justify-center">
        <div className="grow-0 shrink-0 basis-10/12 flex flex-wrap flex-row">
        {posts.map((post, index) => (
            <PostCard post={post} index={index} />
        ))}
        </div>
    </div>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async () => {
  const files = fs.readdirSync(path.join("posts"));

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
          posts: posts.sort(compareDate),
      }
  })
}
