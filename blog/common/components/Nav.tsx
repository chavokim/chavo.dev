import React, {useState} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import useIsomorphicLayoutEffect from "../utils/useIsomorphicLayoutEffect"
import {useRouter} from "next/router";
import LightIcon from "../../public/icons/light_icon.svg"
import DarkIcon from "../../public/icons/dark_icon.svg"
import SystemIcon from "../../public/icons/system_icon.svg"

const TAB_ITEMS = [
    {label: "Dev", href: "/?activeName=dev", value: "dev",},
    {label: "Books", href: "/?activeName=books", value: "books"},
    {label: "Diary", href: "/?activeName=diary", value: "diary",},
]

const DisplayThemeType = {
    Light: "light",
    Dark: "dark",
    System: "system",
}

const DisplayThemeTypeToIcon = {
    [DisplayThemeType.Light]: <LightIcon width={24} height={24} />,
    [DisplayThemeType.Dark]: <DarkIcon width={24} height={24} />,
    [DisplayThemeType.System]: <SystemIcon width={24} height={24} />,
}

const Nav: React.FC = () => {
    const [displayTheme, setDisplayTheme] = useState("");

    const [popUpOpen, setPopUpOpen] = useState(false);

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

        gsap.to('.progress-bar', {
            width: "100%",
            ease: 'none',
            scrollTrigger: { scrub: 0.3 }
        });
    }, [])

    useIsomorphicLayoutEffect(() => {
        if(!displayTheme) {
            // On page load or when changing themes, best to add inline in `head` to avoid FOUC
            if (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                document.documentElement.classList.add(DisplayThemeType.Dark);
            } else {
                document.documentElement.classList.remove(DisplayThemeType.Dark);
            }

            if(localStorage.theme === DisplayThemeType.Dark) {
                setDisplayTheme(DisplayThemeType.Dark);
            } else if(localStorage.theme === DisplayThemeType.Light) {
                setDisplayTheme(DisplayThemeType.Light);
            }
        } else if(displayTheme === DisplayThemeType.Dark) {
            document.documentElement.classList.add(DisplayThemeType.Dark);
        } else {
            document.documentElement.classList.remove(DisplayThemeType.Dark);
        }
    }, [displayTheme])

    const router = useRouter();

    const {activeName} = router.query;

    const selected = (label: string):boolean => {
        return activeName === label.toLowerCase();
    }

    const handleThemeChange = (newDisplayTheme: string) => {
        if(newDisplayTheme === DisplayThemeType.System) {
            localStorage.removeItem('theme');
            setDisplayTheme("");
            return;
        }

        setDisplayTheme(newDisplayTheme);
        localStorage.theme = newDisplayTheme;
    }

    const togglePopUpOpen = () => {
        setPopUpOpen(prev => !prev);
    }

    return (
        <>
            <div
                className={"mock-appbar bg-red"}
                style={{
                    width: "100%",
                    height: 108,
                }}
            />
            <div className="top-0 left-0 right-0 fixed z-50 flex flex-col">
                <header className="bg-red
                 w-screen pt-8 pb-4 ease-in-out transition-all">
                    <div className="container mx-auto px-4">
                        <nav className="flex flex-row justify-between items-center">
                            <img
                                className="cursor-pointer hover:opacity-70 logo-image"
                                src="/logo_typo_animation.gif"
                                style={{
                                    height: 50,
                                    width: "auto",
                                }}
                                onClick={() => router.push("/")}
                            />
                            <div className="flex flex-row items-center">
                                <div className="flex-row hidden sm:flex">
                                {
                                    TAB_ITEMS.map(tabItem => (
                                        <a
                                            key={tabItem.value}
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
                                <div
                                    className=" ml-6 pl-6 flex flex-row py-6"
                                >
                                    <button
                                        className="fill-slate-800 dark:fill-slate-200"
                                        aria-expanded={popUpOpen}
                                        aria-haspopup={"true"}
                                        onClick={togglePopUpOpen}
                                    >
                                        {DisplayThemeTypeToIcon[displayTheme || DisplayThemeType.System]}
                                    </button>
                                </div>
                                {
                                    popUpOpen ? (
                                        <ul
                                            className="absolute z-50 top-full right-0 bg-white rounded-lg ring-1
                                             ring-slate-900/10 shadow-lg overflow-hidden w-36 py-1 text-sm
                                             text-slate-700 font-semibold dark:bg-slate-800 dark:ring-0
                                             dark:highlight-white/5 dark:text-slate-300 mt-8"
                                        >
                                            {
                                                Object.values(DisplayThemeType).map(displayTheme => (
                                                    <li
                                                        key={displayTheme}
                                                        className="py-1 px-2 flex items-center cursor-pointer"
                                                        onClick={() => handleThemeChange(displayTheme)}
                                                    >
                                                        <span className="mr-2">
                                                            {DisplayThemeTypeToIcon[displayTheme]}
                                                        </span>
                                                        {displayTheme}
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    ) : null
                                }
                            </div>
                        </nav>
                    </div>
                </header>
                <div
                    className="w-screen h-1 appearance-none bg-transparent progress-wrapper"
                >
                    <div
                        className="bg-black progress-bar h-full w-0"
                        style={{
                            backgroundImage: "linear-gradient(to right, #ff8177 0%, #ff867a 0%," +
                                " #ff8c7f 21%, #f99185 52%, #cf556c 78%, #b12a5b 100%)"
                        }}
                    />
                </div>
            </div>
        </>
    )
}

export default Nav