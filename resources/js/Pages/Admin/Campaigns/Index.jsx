import React, { useState } from "react";
import Topbar from "@/Components/layouts/Topbar";
import Sidebar from "@/Components/layouts/Sidebar";
import { Head } from "@inertiajs/react";
import CampaignList from "./CampaignList";

export default function Index({ campaigns }) {
    const [activeTab, setActiveTab] = useState("Campaign Email");

    return (
        <div className="flex h-screen overflow-hidden">
            <Head title="Campaign Email" />
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
            <div className="flex flex-col flex-1 overflow-hidden">
                <Topbar />
                <main className="flex-1 p-8 overflow-y-auto bg-gray-100 dark:bg-gray-900">
                    <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
                        Manajemen Campaign
                    </h1>
                    <CampaignList campaigns={campaigns} />
                </main>
            </div>
        </div>
    );
}
