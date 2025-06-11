import { useState, useEffect } from "react";
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
import axios from "axios";

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState("Dashboard");
    const [journals, setJournals] = useState([]);

    useEffect(() => {
        axios.get("/api/journals").then((res) => {
            setJournals(res.data);
        });
    }, []);

    const total = journals.length;
    const active = journals.filter((j) => j.is_active).length;
    const inactive = total - active;

    const stats = [
        {
            icon: <ChartBarIcon className="h-6 w-6" />,
            label: "Total Jurnal",
            value: total,
            color: "blue",
            data: [
                { value: total * 0.2 },
                { value: total * 0.4 },
                { value: total * 0.6 },
                { value: total * 0.8 },
                { value: total },
            ],
        },
        {
            icon: <CheckCircleIcon className="h-6 w-6" />,
            label: "Jurnal Aktif",
            value: active,
            color: "green",
            data: [
                { value: active * 0.2 },
                { value: active * 0.5 },
                { value: active },
            ],
        },
        {
            icon: <XCircleIcon className="h-6 w-6" />,
            label: "Tidak Aktif",
            value: inactive,
            color: "red",
            data: [
                { value: inactive * 0.2 },
                { value: inactive * 0.5 },
                { value: inactive },
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
                            <RecentJournals journals={journals} />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
