import { useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";

import Hero from "../components/Hero";
import FeaturedArticles from "../components/FeaturedArticles";
import LatestArticles from "../components/LatestArticles";
import GetFeaturedSection from "../components/GetFeaturedSection";
import NewsletterSection from "../components/NewsletterSection";

import {
    LINKEDIN_FEATURES,
    PODCAST_FEATURES,
} from "@/content";

import {
    useArticles,
    useFeaturedArticle,
} from "@/shared/hooks/useArticles";

export default function HomePage() {
    const location = useLocation();

    const {
        data: articles = [],
        isLoading: articlesLoading,
        error: articlesError,
    } = useArticles();

    const {
        data: featuredArticle,
        isLoading: featuredLoading,
        error: featuredError,
    } = useFeaturedArticle();

    const articlesWithoutFeatured = useMemo(() => {
        if (!featuredArticle) {
            return articles;
        }

        return articles.filter(
            (article) =>
                article.id !== featuredArticle.id,
        );
    }, [articles, featuredArticle]);

    const supportingArticles =
        articlesWithoutFeatured.slice(0, 2);

    const latestArticles =
        articlesWithoutFeatured.slice(2);

    useEffect(() => {
        const scrollTarget =
            (
                location.state as
                | {
                    scrollTo?: string;
                }
                | null
            )?.scrollTo;

        if (!scrollTarget) {
            return;
        }

        requestAnimationFrame(() => {
            if (scrollTarget === "hero") {
                window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                });

                return;
            }

            document
                .getElementById(scrollTarget)
                ?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
        });

        window.history.replaceState(
            {},
            "",
            location.pathname,
        );
    }, [location]);

    return (
        <>
            <section id="home-content">
                <Hero />

                <FeaturedArticles
                    featuredArticle={featuredArticle}
                    supportingArticles={
                        supportingArticles
                    }
                    isLoading={
                        featuredLoading ||
                        articlesLoading
                    }
                    hasError={
                        Boolean(featuredError) ||
                        Boolean(articlesError)
                    }
                />

                <LatestArticles
                    articles={latestArticles}
                    isLoading={articlesLoading}
                    hasError={Boolean(
                        articlesError,
                    )}
                />
            </section>

            <GetFeaturedSection
                linkedin={LINKEDIN_FEATURES.slice(
                    0,
                    3,
                )}
                podcasts={PODCAST_FEATURES.slice(
                    0,
                    3,
                )}
            />

            <NewsletterSection />
        </>
    );
}