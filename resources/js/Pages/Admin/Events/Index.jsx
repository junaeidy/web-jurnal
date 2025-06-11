import React from 'react'
import Topbar from "@/Components/layouts/Topbar";
import Sidebar from "@/Components/layouts/Sidebar";
import { useState } from "react";
import { Head } from "@inertiajs/react";
import KegiatanList from './KegiatanList';

export default function index () {
    const [activeTab, setActiveTab] = useState("Manajemen Kegiatan");

    return (
        <div className="flex">
            <Head title="Manajemen Kegiatan" />
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
            <div className="flex flex-col flex-1 overflow-hidden">
                <Topbar />
                <main className="flex-1 p-8">
                    <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
                        Manajemen Kegiatan
                    </h1>
                    <KegiatanList />
                </main>
            </div>
        </div>
    )
}