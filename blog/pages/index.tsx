import type {GetStaticProps, NextPage} from 'next'
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import {PostType} from "../common/interfaces/post";
import moment from "moment";
import MainPage, {MainPageTypeProps} from "../common/page/MainPage";

const Home: NextPage<MainPageTypeProps> = ({ posts, totalPageNum }) => {
    return (
        <MainPage
            posts={posts}
            pageNum={1}
            totalPageNum={totalPageNum}
        />
    )
}

export default Home

export const getStaticProps: GetStaticProps = async () => {
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
          posts: posts.sort(compareDate).slice(0, 5),
          totalPageNum,
      }
  })
}
