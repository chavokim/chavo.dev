import {DiscussionEmbed} from "disqus-react"
import {NextPage} from "next";
import {FrontMatterType} from "../interfaces/post";

interface DisqusCommentsTypeProps {
    frontMatter: FrontMatterType,
    slug: string,
}

const DisqusComments: NextPage<DisqusCommentsTypeProps> = ({ frontMatter, slug }) => {
    const {title, } = frontMatter;
    
    const disqusShortname = "chavolog"
    const disqusConfig = {
        url: `https://blog.chavo.dev/blog/${slug}`,
        identifier: slug,
        title: title
    }
    return (
        <DiscussionEmbed
            shortname={disqusShortname}
            config={disqusConfig}
        />
    )
}
export default DisqusComments;
