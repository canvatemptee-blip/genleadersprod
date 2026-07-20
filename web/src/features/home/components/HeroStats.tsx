interface HeroStat {
    value: string;
    label: string;
}

const stats: HeroStat[] = [
    {
        value: "500+",
        label: "Published Articles",
    },
    {
        value: "150+",
        label: "Podcast Episodes",
    },
    {
        value: "25K+",
        label: "Monthly Readers",
    },
];

export default function HeroStats() {
    return (
        <div className="mt-12 flex flex-wrap gap-10">
            {stats.map((stat) => (
                <div key={stat.label}>
                    <h3 className="text-3xl font-bold text-[#06154A]">
                        {stat.value}
                    </h3>

                    <p className="mt-1 text-slate-500">
                        {stat.label}
                    </p>
                </div>
            ))}
        </div>
    );
}