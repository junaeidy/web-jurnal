import React from 'react'
import Topbar from "@/Components/layouts/Topbar";
import Sidebar from "@/Components/layouts/Sidebar";
import { useState } from "react";
import { Head } from "@inertiajs/react";
import PartnerList from "./PartnerList";

export default function index () {
    const [activeTab, setActiveTab] = useState("Manajemen Partner");

    return (
        <div className="flex h-screen overflow-hidden">
            <Head title="Manajemen Partner" />
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
            <div className="flex flex-col flex-1 overflow-hidden">
                <Topbar />
                <main className="flex-1 overflow-y-auto p-8">
                    <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
                        Manajemen Partner
                    </h1>
                    <PartnerList />
                </main>
            </div>
        </div>
    )
}