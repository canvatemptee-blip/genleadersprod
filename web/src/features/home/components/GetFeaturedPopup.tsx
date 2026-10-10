import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useLocation } from "react-router-dom";
import Button from "@/shared/ui/Button";
import { FORMS } from "@/config/forms";
import { ROUTES } from "@/config/routes";

// Set once the visitor opens either form; hides the popup for the session.
const FORM_VISITED_SESSION_KEY =
    "genleaders-get-featured-form-visited";

// Set once the popup is shown in the articles area; cleared on leaving it.
const ARTICLES_SEEN_SESSION_KEY =
    "genleaders-get-featured-popup-articles";

function isArticlesPath(pathname: string) {
    return (
        pathname === ROUTES.ARTICLES ||
        pathname.startsWith(`${ROUTES.ARTICLES}/`)
    );
}

export default function GetFeaturedPopup() {
    const [isOpen, setIsOpen] = useState(false);

    const { pathname } = useLocation();

    useEffect(() => {
        const inArticles = isArticlesPath(pathname);

        if (!inArticles) {
            sessionStorage.removeItem(
                ARTICLES_SEEN_SESSION_KEY,
            );
        }

        if (
            sessionStorage.getItem(
                FORM_VISITED_SESSION_KEY,
            ) ||
            pathname === ROUTES.GET_FEATURED
        ) {
            return;
        }

        if (
            inArticles &&
            sessionStorage.getItem(
                ARTICLES_SEEN_SESSION_KEY,
            )
        ) {
            return;
        }

        const timer = window.setTimeout(() => {
            setIsOpen(true);

            if (inArticles) {
                sessionStorage.setItem(
                    ARTICLES_SEEN_SESSION_KEY,
                    "true",
                );
            }
        }, 300);

        return () => window.clearTimeout(timer);
    }, [pathname]);

    const openForm = (url: string) => {
        sessionStorage.setItem(
            FORM_VISITED_SESSION_KEY,
            "true",
        );

        window.open(
            url,
            "_blank",
            "noopener,noreferrer",
        );
    };

    useEffect(() => {
        if (!isOpen) {
            document.body.style.overflow = "";
            return;
        }

        document.body.style.overflow = "hidden";

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setIsOpen(false);
            }
        };

        window.addEventListener("keydown", handleEscape);

        return () => {
            document.body.style.overflow = "";
            window.removeEventListener(
                "keydown",
                handleEscape,
            );
        };
    }, [isOpen]);

    if (!isOpen) {
        return null;
    }

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-6 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={() => setIsOpen(false)}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-lg rounded-3xl bg-white p-8 shadow-2xl animate-in zoom-in-95 duration-300"
            >
                <button
                    onClick={() => setIsOpen(false)}
                    className="absolute right-5 top-5 rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-[#06154A]"
                    aria-label="Close popup"
                >
                    <X size={22} />
                </button>

                <div className="pr-8">
                    <span className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">
                        GenLeaders
                    </span>

                    <h2 className="mt-3 text-4xl font-bold text-[#06154A]">
                        Get Featured
                    </h2>

                    <p className="mt-5 leading-7 text-slate-600">
                        Share your startup, journey,
                        achievements or expertise with
                        thousands of readers through
                        GenLeaders. Choose how you'd
                        like to get featured.
                    </p>
                </div>

                <div className="mt-10 space-y-4">
                    <Button
                        className="w-full py-3 text-base"
                        onClick={() =>
                            openForm(FORMS.LINKEDIN)
                        }
                    >
                        Featured on LinkedIn →
                    </Button>

                    <Button
                        variant="secondary"
                        className="w-full py-3 text-base"
                        onClick={() =>
                            openForm(FORMS.PODCAST)
                        }
                    >
                        Become a Podcast Guest →
                    </Button>
                </div>
            </div>
        </div>
    );
}