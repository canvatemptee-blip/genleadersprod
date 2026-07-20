import {
    useState,
} from "react";

import {
    Outlet,
} from "react-router-dom";

import AdminHeader from "../components/AdminHeader";
import AdminSidebar from "../components/AdminSidebar";

export default function AdminLayout() {
    const [
        navigationOpen,
        setNavigationOpen,
    ] = useState(false);

    return (
        <div className="min-h-screen bg-slate-50">
            <AdminSidebar
                isOpen={navigationOpen}
                onClose={() =>
                    setNavigationOpen(false)
                }
            />

            <div className="lg:pl-72">
                <AdminHeader
                    onOpenNavigation={() =>
                        setNavigationOpen(true)
                    }
                />

                <main className="p-5 sm:p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}