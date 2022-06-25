import React from "react";

const Footer: React.FC = () => {
    return (
        <footer
            className="py-10 dark:bg-black"
        >
            <div className="container mx-auto px-4">
                <div
                    className="flex flex-col h-16 items-center justify-center"
                >
                    <p className="prose dark:prose-invert">
                        &copy; 2022 Chavokim. All Rights Reserved
                    </p>
                    <p className="prose dark:prose-invert">
                        Built with{" "}
                        <a 
                            href="https://nextjs.org/"
                            target="_blank"
                            className="cursor-pointer"
                        >
                            Next.js
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;