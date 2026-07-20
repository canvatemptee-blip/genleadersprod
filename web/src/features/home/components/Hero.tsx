import { useNavigate } from "react-router-dom";

import Button from "@/shared/ui/Button";

import HeroStats from "./HeroStats";
import FeaturedHeroCard from "./FeaturedHeroCard";

import { useFeaturedArticle } from "@/shared/hooks/useArticles";

export default function Hero() {
    const navigate = useNavigate();

    const {
        data: featuredArticle,
        isLoading,
    } = useFeaturedArticle();

    const handleExploreArticles = () => {
        navigate("/articles");
    };

    const handleGetFeatured = () => {
        const featured =
            document.getElementById("get-featured");

        if (featured) {
            featured.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });

            return;
        }

        navigate("/", {
            state: {
                scrollTo: "get-featured",
            },
        });
    };

    return (
        <section
            id="hero"
            className="bg-white"
        >
            <div className="mx-auto grid min-h-[90vh] max-w-7xl items-center gap-20 px-6 py-20 lg:grid-cols-2">

                <div>

                    <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
                        Leadership • AI • Innovation
                    </span>

                    <h1 className="mt-8 text-5xl font-extrabold leading-tight text-[#06154A] lg:text-7xl">
                        Leadership for
                        <br />
                        the Next Generation.
                    </h1>

                    <p className="mt-8 max-w-xl text-lg leading-8 text-slate-600">
                        Where leaders share ideas, innovators inspire change,
                        and conversations shape the future of business and technology.
                    </p>

                    <div className="mt-10 flex flex-wrap gap-4">

                        <Button onClick={handleExploreArticles}>
                            Explore Articles
                        </Button>

                        <Button
                            variant="secondary"
                            onClick={handleGetFeatured}
                        >
                            Get Featured
                        </Button>

                    </div>

                    <HeroStats />

                </div>

                <FeaturedHeroCard
                    article={featuredArticle}
                    loading={isLoading}
                />

            </div>
        </section>
    );
}