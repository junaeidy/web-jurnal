import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard({
    journalsCount = 0,
    recentJournalsCount = 0,
    publishedCount = 0,
    draftCount = 0,
}) {
    const [latestJournals, setLatestJournals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        total: 0,
        thisMonth: 0,
        published: 0,
        draft: 0,
    });

    useEffect(() => {
        axios.get("/api/journals").then((response) => {
            const journals = response.data.data;

            setLatestJournals(journals);
            setLoading(false);

            // Hitung Statistik
            const total = journals.length;
            const now = new Date();
            const thisMonth = journals.filter((j) => {
                const createdAt = new Date(j.created_at);
                return (
                    createdAt.getMonth() === now.getMonth() &&
                    createdAt.getFullYear() === now.getFullYear()
                );
            }).length;

            const published = journals.filter((j) => j.is_active).length;
            const draft = journals.filter((j) => !j.is_active).length;

            // Set state stat
            setStats({
                total,
                thisMonth,
                published,
                draft,
            });
        });
    }, []);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard Admin
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-8 sm:px-6 lg:px-8">
                    {/* Statistik */}
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                        <StatCard
                            title="Total Jurnal"
                            value={stats.total}
                            bgColor="bg-[#2A7C4C]"
                        />
                        <StatCard
                            title="Jurnal Bulan Ini"
                            value={stats.thisMonth}
                            bgColor="bg-blue-600"
                        />
                        <StatCard
                            title="Dipublikasikan"
                            value={stats.published}
                            bgColor="bg-teal-600"
                        />
                        <StatCard
                            title="Draft"
                            value={stats.draft}
                            bgColor="bg-gray-600"
                        />
                    </div>

                    {/* Tabel Jurnal Terbaru */}
                    <div className="bg-white shadow rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-800">
                                Jurnal Terbaru
                            </h3>
                            <Link
                                href={route("dashboard.journals.index")}
                                className="text-sm text-[#2A7C4C] font-medium hover:underline"
                            >
                                Lihat Semua
                            </Link>
                        </div>

                        <table className="w-full table-auto text-sm text-left">
                            <thead className="text-gray-500 border-b">
                                <tr>
                                    <th className="py-2">Judul</th>
                                    <th className="py-2">Tanggal</th>
                                    <th className="py-2">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td
                                            colSpan="3"
                                            className="py-4 text-center text-gray-400"
                                        >
                                            Memuat...
                                        </td>
                                    </tr>
                                ) : latestJournals.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan="3"
                                            className="py-4 text-center text-gray-400"
                                        >
                                            Belum ada jurnal.
                                        </td>
                                    </tr>
                                ) : (
                                    latestJournals.slice(0, 5).map((j) => (
                                        <tr key={j.id} className="border-b">
                                            <td className="py-2">
                                                {j.title?.id}
                                            </td>
                                            <td className="py-2">
                                                {new Date(
                                                    j.created_at
                                                ).toLocaleDateString()}
                                            </td>
                                            <td className="py-2">
                                                <StatusBadge
                                                    is_active={j.is_active}
                                                />
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

function StatCard({ title, value, icon, bgColor, textColor }) {
    return (
        <div className={`p-5 rounded-2xl shadow-lg text-white ${bgColor}`}>
            <div className="text-sm font-medium opacity-80">{title}</div>
            <div className="mt-2 text-3xl font-bold">{value}</div>
        </div>
    );
}

function StatusBadge({ is_active }) {
    const baseClass =
        "inline-block px-3 py-1 text-xs font-semibold rounded-full";
    const colorClass = is_active
        ? "bg-green-100 text-green-700"
        : "bg-gray-100 text-gray-700";

    return (
        <span className={`${baseClass} ${colorClass}`}>
            {is_active ? "Published" : "Draft"}
        </span>
    );
}
