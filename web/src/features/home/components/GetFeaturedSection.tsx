import LinkedInPreviewCard from "./LinkedInPreviewCard";
import PodcastPreviewCard from "./PodcastPreviewCard";

import { FORMS } from "@/config/forms";

import type { ContentLink } from "@/types/content";

interface Props {
    linkedin: readonly ContentLink[];
    podcasts: readonly ContentLink[];
}

export default function GetFeaturedSection({
    linkedin,
    podcasts,
}: Props) {
    return (
        <section
            id="get-featured"
            className="bg-[#06154A] py-28 text-white"
        >
            <div className="mx-auto max-w-7xl px-6">
                <div className="mx-auto mb-20 max-w-3xl text-center">
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-300">
                        Get Featured
                    </p>

                    <h2 className="mt-4 text-5xl font-bold">
                        Share Your Story With GenLeaders
                    </h2>

                    <p className="mt-6 text-lg leading-8 text-slate-300">
                        Explore professionals featured by GenLeaders and
                        discover conversations with founders and leaders.
                        Apply today to become part of our growing community.
                    </p>
                </div>

                <section className="mb-20">
                    <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <h3 className="text-3xl font-bold">
                                Featured on LinkedIn
                            </h3>

                            <p className="mt-2 text-slate-300">
                                Highlights from our LinkedIn community.
                            </p>
                        </div>

                        <a
                            href={FORMS.LINKEDIN}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-full bg-white px-7 py-4 text-center font-semibold text-[#06154A] transition hover:bg-slate-100"
                        >
                            Get Featured
                        </a>
                    </div>

                    <div className="grid gap-6 lg:grid-cols-3">
                        {linkedin.map((feature) => (
                            <LinkedInPreviewCard
                                key={feature.id}
                                title={feature.title}
                                image={feature.image}
                                description={feature.description}
                                linkedinUrl={feature.href}
                            />
                        ))}
                    </div>
                </section>

                <section>
                    <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <h3 className="text-3xl font-bold">
                                Featured Podcasts
                            </h3>

                            <p className="mt-2 text-slate-300">
                                Watch conversations with inspiring founders,
                                executives and innovators.
                            </p>
                        </div>

                        <a
                            href={FORMS.PODCAST}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-full bg-white px-7 py-4 text-center font-semibold text-[#06154A] transition hover:bg-slate-100"
                        >
                            Become a Guest
                        </a>
                    </div>

                    <div className="grid gap-6 lg:grid-cols-3">
                        {podcasts.map((podcast) => (
                            <PodcastPreviewCard
                                key={podcast.id}
                                title={podcast.title}
                                image={podcast.image}
                                description={podcast.description}
                                youtubeUrl={podcast.href}
                            />
                        ))}
                    </div>
                </section>
            </div>
        </section>
    );
}