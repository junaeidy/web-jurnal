import React from 'react'
import Topbar from "@/Components/layouts/Topbar";
import Sidebar from "@/Components/layouts/Sidebar";
import { useState } from "react";
import { Head } from "@inertiajs/react";
import TeamList from './TeamList';


export default function Index () {
    const [activeTab, setActiveTab] = useState("Manajemen Team");

    return (
        <div className="flex h-screen overflow-hidden">
            <Head title="Manajemen Team" />
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
            <div className="flex flex-col flex-1 overflow-hidden">
                <Topbar />
                <main className="flex-1 p-8 overflow-y-auto">
                    <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
                        Manajemen Team
                    </h1>
                    <TeamList />
                </main>
            </div>
        </div>
    )
}