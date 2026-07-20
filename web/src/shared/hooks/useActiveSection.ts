import { useEffect, useState } from "react";

export function useActiveSection() {
    const [activeSection, setActiveSection] =
        useState("home-content");

    useEffect(() => {
        const handleScroll = () => {
            const featured =
                document.getElementById(
                    "get-featured",
                );

            if (!featured) {
                return;
            }

            const top =
                featured.getBoundingClientRect().top;

            if (top <= 120) {
                setActiveSection(
                    "get-featured",
                );
            } else {
                setActiveSection(
                    "home-content",
                );
            }
        };

        handleScroll();

        window.addEventListener(
            "scroll",
            handleScroll,
        );

        return () =>
            window.removeEventListener(
                "scroll",
                handleScroll,
            );
    }, []);

    return activeSection;
}