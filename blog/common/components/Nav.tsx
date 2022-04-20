import React from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import useIsomorphicLayoutEffect from "../utils/useIsomorphicLayoutEffect"
import {useRouter} from "next/router";

const TAB_ITEMS = [
    {label: "Dev", href: "/?activeName=dev"},
    {label: "Books", href: "/?activeName=books"},
    {label: "Diary", href: "/?activeName=diary"},
]

const Nav: React.FC = () => {
    useIsomorphicLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const mockNavEl = document.querySelector(".mock-appbar");
        const navEl = document.querySelector("header");
        const imageEl = document.querySelector(".logo-image");

        ScrollTrigger.create({
            start: `top -96px`,
            end: "bottom bottom",
            trigger: mockNavEl,
            onEnterBack: () => {
                navEl?.classList.remove("shadow-2xl");
                navEl?.classList.add("pt-8", "pb-4");
                imageEl?.setAttribute("src", "/logo_typo_animation.gif");

            },
            onLeave: () => {
                navEl?.classList.add("shadow-2xl");
                navEl?.classList.remove("pt-8", "pb-4");
                imageEl?.setAttribute("src", "/logo_typo.svg");
            },
        });

        gsap.to('progress', {
            value: 100,
            ease: 'none',
            scrollTrigger: { scrub: 0.3 }
        });
    }, [])

    const router = useRouter();

    const {activeName} = router.query;

    const selected = (label: string):boolean => {
        return activeName === label.toLowerCase();
    }

    return (
        <>
            <div
                className={"mock-appbar"}
                style={{
                    width: "100%",
                    height: 108,
                }}
            />
            <div className="top-0 left-0 right-0 fixed z-50 flex flex-col">
                <header className="bg-red
                 w-screen pt-8 pb-4 ease-in-out transition-all">
                    <div className="container mx-auto px-4">
                        <nav className="flex flex-row justify-between">
                            <img
                                className="cursor-pointer hover:opacity-70 logo-image"
                                src="/logo_typo_animation.gif"
                                style={{
                                    height: 50,
                                    width: "auto",
                                }}
                                onClick={() => router.push("/")}
                            />
                            <div className="flex flex-row">
                            {
                                TAB_ITEMS.map(tabItem => (
                                    <a
                                        className={
                                            `p-4 text-lg text-white font-medium 
                                            hover:text-black ${selected(tabItem.label) ? "text-black" : ""}`
                                        }
                                        href={tabItem.href}
                                    >
                                        {tabItem.label}
                                    </a>
                                ))
                            }
                            </div>
                        </nav>
                    </div>
                </header>
                <progress
                    className="w-screen h-1"
                    max={100}
                    value={0}
                    style={{
                        background: "linear-gradient(to right, #8e0e00, #1f1c18)",
                    }}
                />
            </div>
        </>
    )
}

export default Nav