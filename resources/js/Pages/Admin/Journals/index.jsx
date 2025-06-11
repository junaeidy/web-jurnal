import React from 'react'
import Topbar from "@/Components/layouts/Topbar";
import Sidebar from "@/Components/layouts/Sidebar";
import { useState } from "react";
import { Head } from "@inertiajs/react";
import JournalList from "./JournalList";

export default function index () {
    const [activeTab, setActiveTab] = useState("Manajemen Jurnal");

    return (
        <div className="flex">
            <Head title="Manajemen Jurnal" />
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
            <div className="flex flex-col flex-1 overflow-hidden">
                <Topbar />
                <main className="flex-1 p-8">
                    <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
                        Manajemen Jurnal
                    </h1>
                    <JournalList />
                </main>
            </div>
        </div>
    )
}