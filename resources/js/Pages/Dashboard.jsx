import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Dashboard({
    journalsCount = 21,
    recentJournalsCount = 19,
    publishedCount = 19,
    draftCount = 2,
    latestJournals = [
        {
            id: 1,
            title: "Analisis Dampak AI dalam Dunia Pendidikan",
            created_at: "2025-06-18T10:15:00",
            status: "published",
        },
        {
            id: 2,
            title: "Studi Komparatif Metode Klasifikasi Teks",
            created_at: "2025-06-16T08:45:00",
            status: "draft",
        },
        {
            id: 3,
            title: "Pemanfaatan Energi Terbarukan di Indonesia",
            created_at: "2025-06-14T14:20:00",
            status: "pending",
        },
        {
            id: 4,
            title: "Evaluasi Model Deep Learning untuk Deteksi Wajah",
            created_at: "2025-06-12T11:00:00",
            status: "published",
        },
        {
            id: 5,
            title: "Kajian Etika Penggunaan Data Pribadi",
            created_at: "2025-06-10T09:30:00",
            status: "draft",
        },
    ],
}) {
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
                            value={journalsCount}
                            bgColor="bg-[#2A7C4C]"
                        />
                        <StatCard
                            title="Jurnal Bulan Ini"
                            value={recentJournalsCount}
                            bgColor="bg-blue-600"
                        />
                        <StatCard
                            title="Dipublikasikan"
                            value={publishedCount}
                            bgColor="bg-teal-600"
                        />
                        <StatCard
                            title="Draft"
                            value={draftCount}
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
                                href=""
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
                                {latestJournals.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan="3"
                                            className="py-4 text-center text-gray-400"
                                        >
                                            Belum ada jurnal.
                                        </td>
                                    </tr>
                                ) : (
                                    latestJournals.map((j) => (
                                        <tr key={j.id} className="border-b">
                                            <td className="py-2">{j.title}</td>
                                            <td className="py-2">
                                                {new Date(
                                                    j.created_at
                                                ).toLocaleDateString()}
                                            </td>
                                            <td className="py-2">
                                                <StatusBadge
                                                    status={j.status}
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

function StatusBadge({ status }) {
    const isPublished = status === "published";
    const baseClass =
        "inline-block px-3 py-1 text-xs font-semibold rounded-full";

    const colorClass = isPublished
        ? "bg-green-100 text-green-700"
        : "bg-gray-100 text-gray-700";

    return (
        <span className={`${baseClass} ${colorClass}`}>
            {isPublished ? "Published" : "Draft"}
        </span>
    );
}
