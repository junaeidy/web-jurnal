import { useState } from "react";
import {
    ChartBarIcon,
    CheckCircleIcon,
    XCircleIcon,
} from "@heroicons/react/24/solid";
import Sidebar from "@/Components/layouts/Sidebar";
import StatCard from "@/Components/Admin/StatCard";
import Topbar from "@/Components/layouts/Topbar";
import { Head } from "@inertiajs/react";
import RecentJournals from "@/Components/Admin/RecentJournals";

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState("Dashboard");

    const stats = [
        {
            icon: <ChartBarIcon className="h-6 w-6" />,
            label: "Total Jurnal",
            value: 120,
            color: "blue",
            data: [
                { value: 20 },
                { value: 40 },
                { value: 60 },
                { value: 80 },
                { value: 90 },
                { value: 100 },
                { value: 120 },
            ],
        },
        {
            icon: <CheckCircleIcon className="h-6 w-6" />,
            label: "Jurnal Aktif",
            value: 87,
            color: "green",
            data: [
                { value: 10 },
                { value: 25 },
                { value: 50 },
                { value: 70 },
                { value: 87 },
            ],
        },
        {
            icon: <XCircleIcon className="h-6 w-6" />,
            label: "Tidak Aktif",
            value: 33,
            color: "red",
            data: [
                { value: 5 },
                { value: 10 },
                { value: 20 },
                { value: 25 },
                { value: 33 },
            ],
        },
    ];

    return (
        <div className="flex h-screen bg-gray-50">
            <Head title="Dashboard" />
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

            <div className="flex-1 flex flex-col overflow-auto">
                <Topbar />

                <main className="p-6 flex-1">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {stats.map((stat, i) => (
                            <StatCard key={i} {...stat} />
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-5">
                        <div className="lg:col-span-4">
                            <RecentJournals />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
