import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";
import Footer from "./Footer";

import GetFeaturedPopup from "@/features/home/components/GetFeaturedPopup";

export default function MainLayout() {
    return (
        <>
            <GetFeaturedPopup />

            <Navbar />

            <main className="min-h-screen">
                <Outlet />
            </main>

            <Footer />
        </>
    );
}