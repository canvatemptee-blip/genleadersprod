import {
    CalendarClock,
} from "lucide-react";

import type {
    ArticleEditorValues,
} from "@/types/articleEditor";


interface ArticlePublishingPanelProps {
    status:
    ArticleEditorValues["status"];

    isFeatured:
    boolean;

    scheduledAt:
    string;

    onStatusChange: (
        status:
            ArticleEditorValues["status"],
    ) => void;

    onFeaturedChange: (
        isFeatured: boolean,
    ) => void;

    onScheduledAtChange: (
        scheduledAt: string,
    ) => void;
}


function getMinimumScheduleTime() {
    const now =
        new Date();

    now.setMinutes(
        now.getMinutes() -
        now.getTimezoneOffset() +
        1,
    );

    return now
        .toISOString()
        .slice(
            0,
            16,
        );
}


export default function ArticlePublishingPanel({
    status,
    isFeatured,
    scheduledAt,
    onStatusChange,
    onFeaturedChange,
    onScheduledAtChange,
}: ArticlePublishingPanelProps) {
    const isScheduled =
        status ===
        "scheduled";


    return (
        <section className="rounded-3xl border border-slate-200 bg-white p-6">
            <h3 className="text-lg font-bold text-[#06154A]">
                Publishing
            </h3>


            <div className="mt-5">
                <label
                    htmlFor="article-status"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                >
                    Status
                </label>


                <select
                    id="article-status"
                    value={
                        status
                    }
                    onChange={(
                        event,
                    ) =>
                        onStatusChange(
                            event.target
                                .value as
                            ArticleEditorValues["status"],
                        )
                    }
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                >
                    <option value="draft">
                        Draft
                    </option>

                    <option value="scheduled">
                        Scheduled
                    </option>

                    <option value="published">
                        Published
                    </option>

                    <option value="archived">
                        Archived
                    </option>
                </select>
            </div>


            {isScheduled && (
                <div className="mt-5 rounded-2xl border border-blue-100 bg-blue-50/60 p-4">
                    <div className="flex items-start gap-3">
                        <CalendarClock
                            size={20}
                            className="mt-0.5 shrink-0 text-blue-700"
                            aria-hidden="true"
                        />

                        <div className="min-w-0 flex-1">
                            <label
                                htmlFor="scheduled-at"
                                className="block text-sm font-semibold text-[#06154A]"
                            >
                                Publish date and time
                            </label>

                            <p className="mt-1 text-sm leading-5 text-slate-600">
                                The article will publish
                                automatically after this
                                time is reached.
                            </p>
                        </div>
                    </div>


                    <input
                        id="scheduled-at"
                        type="datetime-local"
                        value={
                            scheduledAt
                        }
                        min={
                            getMinimumScheduleTime()
                        }
                        onChange={(
                            event,
                        ) =>
                            onScheduledAtChange(
                                event.target
                                    .value,
                            )
                        }
                        required
                        className="mt-4 w-full rounded-xl border border-blue-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    />


                    <p className="mt-3 text-xs leading-5 text-slate-500">
                        Time is entered using your
                        device's local timezone.
                    </p>
                </div>
            )}


            <label className="mt-5 flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 p-4">
                <input
                    type="checkbox"
                    checked={
                        isFeatured
                    }
                    onChange={(
                        event,
                    ) =>
                        onFeaturedChange(
                            event.target
                                .checked,
                        )
                    }
                    className="mt-1 h-4 w-4"
                />


                <span>
                    <span className="block text-sm font-semibold text-slate-800">
                        Featured article
                    </span>

                    <span className="mt-1 block text-sm leading-5 text-slate-500">
                        Highlight this article
                        in the featured content
                        area.
                    </span>
                </span>
            </label>
        </section>
    );
}