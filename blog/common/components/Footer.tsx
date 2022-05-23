import React from "react";

const Footer: React.FC = () => {
    return (
        <footer
            className="py-2 dark:bg-black"
        >
            <div className="container mx-auto px-4">
                <div
                    className="flex flex-row h-16 items-center justify-center"
                >
                    <p className="prose dark:prose-invert text-xs">
                        &copy; 2022 Chavokim. All Rights Reserved
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;