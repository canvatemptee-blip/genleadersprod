import ImageWithFallback from "@/shared/ui/ImageWithFallback";

interface PodcastPreviewCardProps {
    title: string;
    image: string;
    description: string;
    youtubeUrl: string;
}

export default function PodcastPreviewCard({
    title,
    image,
    description,
    youtubeUrl,
}: PodcastPreviewCardProps) {
    return (
        <a
            href={youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Watch podcast: ${title}`}
            className="group block overflow-hidden rounded-2xl bg-white/5 transition-all duration-300 hover:-translate-y-1 hover:bg-white/10"
        >
            <div className="flex gap-4 p-3">
                <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl">
                    <ImageWithFallback
                        src={image}
                        alt={title}
                        imgClassName="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                </div>

                <div className="flex flex-1 flex-col justify-center">
                    <h4 className="font-semibold transition group-hover:text-purple-300">
                        {title}
                    </h4>

                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-300">
                        {description}
                    </p>

                    <span className="mt-3 text-sm font-semibold text-purple-300">
                        Watch on YouTube →
                    </span>
                </div>
            </div>
        </a>
    );
}