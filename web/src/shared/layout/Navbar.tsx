import {
    Menu,
    X,
} from "lucide-react";

import {
    useState,
} from "react";

import type {
    MouseEvent,
} from "react";

import {
    Link,
    useLocation,
    useNavigate,
} from "react-router-dom";

import Container
    from "./Container";

import Button
    from "@/shared/ui/Button";

import {
    navigation,
} from "@/data/navigation";

import {
    useActiveSection,
} from "@/shared/hooks/useActiveSection";


export default function Navbar() {
    const [
        isOpen,
        setIsOpen,
    ] =
        useState(
            false,
        );


    const navigate =
        useNavigate();


    const {
        pathname,
    } =
        useLocation();


    const activeSection =
        useActiveSection();


    const isActive = (
        label:
            string,
    ) => {
        if (
            pathname !== "/"
        ) {
            switch (
            label
            ) {
                case "Home":
                    return (
                        pathname === "/"
                    );


                case "Articles":
                    return pathname
                        .startsWith(
                            "/articles",
                        );


                case "About":
                    return (
                        pathname ===
                        "/about"
                    );


                default:
                    return false;
            }
        }


        switch (
        label
        ) {
            case "Home":
                return (
                    activeSection ===
                    "home-content"
                );


            case "Get Featured":
                return (
                    activeSection ===
                    "get-featured"
                );


            case "Articles":

            case "About":
                return false;


            default:
                return false;
        }
    };


    const scrollToSection = (
        sectionId:
            string,
    ) => {
        document
            .getElementById(
                sectionId,
            )
            ?.scrollIntoView({
                behavior:
                    "smooth",

                block:
                    "start",
            });
    };


    const handleNavigation = (
        event:
            MouseEvent<HTMLAnchorElement>,

        label:
            string,
    ) => {
        setIsOpen(
            false,
        );


        if (
            label !== "Home" &&
            label !== "Get Featured"
        ) {
            return;
        }


        event.preventDefault();


        if (
            pathname !== "/"
        ) {
            navigate(
                "/",
                {
                    state: {
                        scrollTo:
                            label ===
                                "Get Featured"
                                ? "get-featured"
                                : "hero",
                    },
                },
            );


            return;
        }


        if (
            label === "Home"
        ) {
            window.scrollTo({
                top:
                    0,

                behavior:
                    "smooth",
            });


            return;
        }


        scrollToSection(
            "get-featured",
        );
    };


    const handleSubscribeNavigation =
        () => {
            setIsOpen(
                false,
            );


            if (
                pathname !== "/"
            ) {
                navigate(
                    "/",
                    {
                        state: {
                            scrollTo:
                                "newsletter",
                        },
                    },
                );


                return;
            }


            scrollToSection(
                "newsletter",
            );
        };


    return (
        <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl">
            <Container className="flex h-20 items-center justify-between">
                <Link
                    to="/"
                    onClick={() =>
                        setIsOpen(
                            false,
                        )
                    }
                    className="rounded-md text-3xl font-black tracking-tight text-[#06154A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#06154A] focus-visible:ring-offset-2"
                >
                    GenLeaders
                </Link>


                <nav className="hidden items-center gap-8 lg:flex">
                    {navigation.map(
                        (
                            link,
                        ) => {
                            const active =
                                isActive(
                                    link.label,
                                );


                            return (
                                <Link
                                    key={
                                        link.label
                                    }
                                    to={
                                        link.href
                                    }
                                    onClick={(
                                        event,
                                    ) =>
                                        handleNavigation(
                                            event,
                                            link.label,
                                        )
                                    }
                                    className={`relative rounded-sm text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#06154A] focus-visible:ring-offset-2 ${active
                                            ? "text-[#06154A]"
                                            : "text-slate-600 hover:text-[#06154A]"
                                        }`}
                                >
                                    {
                                        link.label
                                    }


                                    {active && (
                                        <span className="absolute -bottom-2 left-0 h-0.5 w-full rounded-full bg-[#06154A]" />
                                    )}
                                </Link>
                            );
                        },
                    )}
                </nav>


                <div className="hidden lg:block">
                    <Button
                        onClick={
                            handleSubscribeNavigation
                        }
                        className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#06154A] focus-visible:ring-offset-2"
                    >
                        Subscribe to Newsletter
                    </Button>
                </div>


                <button
                    type="button"
                    aria-label={
                        isOpen
                            ? "Close navigation menu"
                            : "Open navigation menu"
                    }
                    aria-expanded={
                        isOpen
                    }
                    aria-controls="mobile-navigation"
                    onClick={() =>
                        setIsOpen(
                            (
                                previous,
                            ) =>
                                !previous,
                        )
                    }
                    className="rounded-xl p-2 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#06154A] focus-visible:ring-offset-2 lg:hidden"
                >
                    {isOpen ? (
                        <X
                            size={
                                24
                            }
                        />
                    ) : (
                        <Menu
                            size={
                                24
                            }
                        />
                    )}
                </button>
            </Container>


            {isOpen && (
                <div
                    id="mobile-navigation"
                    className="border-t border-slate-200 bg-white lg:hidden"
                >
                    <Container className="flex flex-col py-4">
                        {navigation.map(
                            (
                                link,
                            ) => {
                                const active =
                                    isActive(
                                        link.label,
                                    );


                                return (
                                    <Link
                                        key={
                                            link.label
                                        }
                                        to={
                                            link.href
                                        }
                                        onClick={(
                                            event,
                                        ) =>
                                            handleNavigation(
                                                event,
                                                link.label,
                                            )
                                        }
                                        className={`rounded-xl px-2 py-3 font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#06154A] focus-visible:ring-offset-2 ${active
                                                ? "bg-slate-100 text-[#06154A]"
                                                : "text-slate-700 hover:bg-slate-100"
                                            }`}
                                    >
                                        {
                                            link.label
                                        }
                                    </Link>
                                );
                            },
                        )}


                        <div className="mt-4">
                            <Button
                                onClick={
                                    handleSubscribeNavigation
                                }
                                className="w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#06154A] focus-visible:ring-offset-2"
                            >
                                Subscribe
                            </Button>
                        </div>
                    </Container>
                </div>
            )}
        </header>
    );
}