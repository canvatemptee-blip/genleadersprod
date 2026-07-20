import {
    ArrowRight,
    Mail,
    MapPin,
    Phone,
} from "lucide-react";

import {
    FaInstagram,
    FaLinkedin,
    FaYoutube,
} from "react-icons/fa6";

import {
    Link,
    useLocation,
    useNavigate,
} from "react-router-dom";

import Container
    from "./Container";

import {
    ROUTES,
} from "@/config/routes";

import {
    SITE_CONFIG,
} from "@/config/site";


const quickLinks = [
    {
        title:
            "Home",

        href:
            ROUTES.HOME,
    },

    {
        title:
            "Articles",

        href:
            ROUTES.ARTICLES,
    },

    {
        title:
            "Get Featured",

        href:
            "get-featured",
    },

    {
        title:
            "About",

        href:
            ROUTES.ABOUT,
    },
];


const resources = [
    {
        title:
            "Podcasts",

        href:
            ROUTES.PODCASTS,
    },
];


export default function Footer() {
    const navigate =
        useNavigate();


    const {
        pathname,
    } =
        useLocation();


    const handleScrollNavigation = (
        sectionId:
            string,
    ) => {
        if (
            pathname !==
            ROUTES.HOME
        ) {
            navigate(
                ROUTES.HOME,
                {
                    state: {
                        scrollTo:
                            sectionId,
                    },
                },
            );


            return;
        }


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


    const handleNewsletterNavigation =
        () => {
            handleScrollNavigation(
                "newsletter",
            );
        };


    return (
        <footer className="bg-[#06154A] text-white">
            <Container>
                <div className="grid gap-16 py-20 lg:grid-cols-[2fr_1fr_1fr]">
                    <div>
                        <h2 className="text-4xl font-black">
                            GenLeaders
                        </h2>


                        <p className="mt-6 max-w-lg leading-8 text-slate-300">
                            A modern publication focused on
                            leadership, business, technology
                            and innovation through articles,
                            podcasts and community stories.
                        </p>


                        <div className="mt-8 space-y-4 text-slate-300">
                            <div className="flex items-center gap-3">
                                <Mail
                                    size={
                                        18
                                    }
                                />

                                <span>
                                    {
                                        SITE_CONFIG.email
                                    }
                                </span>
                            </div>


                            <div className="flex items-center gap-3">
                                <Phone
                                    size={
                                        18
                                    }
                                />

                                <span>
                                    {
                                        SITE_CONFIG.phone
                                    }
                                </span>
                            </div>


                            <div className="flex items-center gap-3">
                                <MapPin
                                    size={
                                        18
                                    }
                                />

                                <span>
                                    {
                                        SITE_CONFIG.location
                                    }
                                </span>
                            </div>
                        </div>
                    </div>


                    <div>
                        <h3 className="mb-6 text-xl font-bold">
                            Navigation
                        </h3>


                        <div className="space-y-4">
                            {quickLinks.map(
                                (
                                    link,
                                ) =>
                                    link.title ===
                                        "Get Featured" ? (
                                        <button
                                            key={
                                                link.title
                                            }
                                            type="button"
                                            onClick={() =>
                                                handleScrollNavigation(
                                                    link.href,
                                                )
                                            }
                                            className="block text-left text-slate-300 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#06154A]"
                                        >
                                            {
                                                link.title
                                            }
                                        </button>
                                    ) : (
                                        <Link
                                            key={
                                                link.title
                                            }
                                            to={
                                                link.href
                                            }
                                            className="block text-slate-300 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#06154A]"
                                        >
                                            {
                                                link.title
                                            }
                                        </Link>
                                    ),
                            )}
                        </div>
                    </div>


                    <div>
                        <h3 className="mb-6 text-xl font-bold">
                            Resources
                        </h3>


                        <div className="space-y-4">
                            {resources.map(
                                (
                                    resource,
                                ) => (
                                    <Link
                                        key={
                                            resource.title
                                        }
                                        to={
                                            resource.href
                                        }
                                        className="block text-slate-300 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#06154A]"
                                    >
                                        {
                                            resource.title
                                        }
                                    </Link>
                                ),
                            )}
                        </div>


                        <button
                            type="button"
                            onClick={
                                handleNewsletterNavigation
                            }
                            className="mt-10 flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-[#06154A] transition-all hover:gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#06154A]"
                        >
                            Subscribe

                            <ArrowRight
                                size={
                                    18
                                }
                            />
                        </button>
                    </div>
                </div>


                <div className="flex flex-col items-center justify-between gap-8 border-t border-white/10 py-8 lg:flex-row">
                    <p className="text-sm text-slate-400">
                        © {
                            new Date()
                                .getFullYear()
                        } GenLeaders. All rights reserved.
                    </p>


                    <div className="flex items-center gap-4">
                        <a
                            href={
                                SITE_CONFIG.socials.linkedin
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Visit GenLeaders on LinkedIn"
                            className="rounded-full bg-white/10 p-3 transition hover:bg-white hover:text-[#06154A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#06154A]"
                        >
                            <FaLinkedin
                                size={
                                    18
                                }
                            />
                        </a>


                        <a
                            href={
                                SITE_CONFIG.socials.instagram
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Visit GenLeaders on Instagram"
                            className="rounded-full bg-white/10 p-3 transition hover:bg-white hover:text-[#06154A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#06154A]"
                        >
                            <FaInstagram
                                size={
                                    18
                                }
                            />
                        </a>


                        <a
                            href={
                                SITE_CONFIG.socials.youtube
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Visit GenLeaders on YouTube"
                            className="rounded-full bg-white/10 p-3 transition hover:bg-white hover:text-[#06154A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#06154A]"
                        >
                            <FaYoutube
                                size={
                                    18
                                }
                            />
                        </a>
                    </div>
                </div>
            </Container>
        </footer>
    );
}