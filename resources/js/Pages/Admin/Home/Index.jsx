import React, { useState } from "react";
import Topbar from "@/Components/layouts/Topbar";
import Sidebar from "@/Components/layouts/Sidebar";
import { Head } from "@inertiajs/react";
import HeroSection from "@/Components/Admin/Home/HeroSection";
import AboutSection from "@/Components/Admin/Home/AboutSection";

export default function Index() {
    const [activeTab, setActiveTab] = useState("Manajemen Home");

    return (
        <div className="flex h-screen overflow-hidden">
            <Head title="Manajemen Home" />

            <Sidebar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                className="h-full overflow-y-auto"
            />

            <div className="flex flex-col flex-1 overflow-hidden">
                <Topbar />

                <main className="flex-1 overflow-y-auto p-8">
                    <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
                        Manajemen Home
                    </h1>

                    <div className="space-y-24 pb-24">
                        <HeroSection />
                        <AboutSection />
                    </div>
                </main>
            </div>
        </div>
    );
}
