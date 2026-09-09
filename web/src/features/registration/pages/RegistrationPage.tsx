import { Helmet } from "react-helmet-async";

import { SITE_CONFIG } from "@/config/site";

import RegistrationForm
    from "../components/RegistrationForm";


const PAGE_TITLE =
    `Get Featured | ${SITE_CONFIG.name}`;


const PAGE_DESCRIPTION =
    "Register with GenLeaders to showcase your new role, announce a milestone, or explore LinkedIn management, LinkedIn makeover and company branding support.";


export default function RegistrationPage() {
    return (
        <>
            <Helmet>
                <title>
                    {PAGE_TITLE}
                </title>

                <meta
                    name="description"
                    content={
                        PAGE_DESCRIPTION
                    }
                />

                <meta
                    property="og:title"
                    content={
                        PAGE_TITLE
                    }
                />

                <meta
                    property="og:description"
                    content={
                        PAGE_DESCRIPTION
                    }
                />
            </Helmet>


            <section className="bg-slate-50 py-20 lg:py-28">
                <div className="mx-auto max-w-3xl px-6">
                    <div className="text-center">
                        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-700">
                            Get Featured
                        </p>


                        <h1 className="mt-4 text-4xl font-bold text-[#06154A] sm:text-5xl">
                            Registration
                        </h1>


                        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-slate-600">
                            Your Role. Your Story. Amplified
                            With Us.
                        </p>


                        <p className="mx-auto mt-4 inline-flex rounded-full bg-white px-5 py-2 text-sm font-semibold text-slate-700 ring-1 ring-slate-200">
                            We are not a job provider.
                        </p>
                    </div>


                    <div className="mt-12">
                        <RegistrationForm />
                    </div>
                </div>
            </section>
        </>
    );
}
