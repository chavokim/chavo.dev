import React from "react";
import Image from 'next/image'

const Nav: React.FC = () => {
    return (
        <header className="fixed top-0 left-0 right-0 bg-rose-700">
            <div className="container mx-auto px-4">
                <nav className="flex flex-row justify-between">
                    <Image
                        src="/logo_with_typo.png"
                        height={50}
                        width={157}
                        layout={"fixed"}
                    />
                    <div className="flex flex-row">
                        <button>
                            a
                        </button>
                        <button>
                            b
                        </button>
                        <button>
                            c
                        </button>
                    </div>
                </nav>
            </div>
        </header>
    )
}

export default Nav