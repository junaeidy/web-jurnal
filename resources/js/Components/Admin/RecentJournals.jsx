import { Link } from "@inertiajs/react";

export default function RecentJournals({ journals }) {
    const latestJournals = [...journals]
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .slice(0, 5);

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow w-full">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                    Jurnal Terbaru
                </h2>
                <Link href={route("dashboard.journals.index")} className="text-blue-600 hover:underline">
                    Lihat Semua
                </Link>
            </div>
            <table className="w-full text-sm text-left">
                <thead className="text-gray-400 border-b dark:text-gray-300">
                    <tr>
                        <th></th>
                        <th>No</th>
                        <th>Gambar Jurnal</th>
                        <th>Nama Jurnal</th>
                        <th>Tanggal Publikasi</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {latestJournals.map((item, index) => (
                        <tr
                            key={item.id}
                            className={`border-b dark:border-gray-700 ${
                                index % 2 === 1
                                    ? "bg-gray-50 dark:bg-gray-700"
                                    : ""
                            }`}
                        >
                            <td>
                                <input type="checkbox" />
                            </td>
                            <td className="py-2">{index + 1}</td>
                            <td>
                                {item.cover ? (
                                    <img
                                        src={`/${item.cover}`}
                                        alt="cover"
                                        className="w-10 h-10 object-cover rounded"
                                    />
                                ) : (
                                    <img
                                        src="https://placehold.co/250x400?text=No+Image"
                                        alt="cover"
                                        className="w-10 h-10 object-cover rounded"
                                    />
                                )}
                            </td>
                            <td className="flex items-center py-2">
                                {item.title}
                            </td>
                            <td>{new Date(item.created_at).toLocaleDateString()}</td>
                            <td>
                                <span
                                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                                        item.is_active
                                            ? "bg-green-100 text-green-600"
                                            : "bg-red-100 text-red-600"
                                    }`}
                                >
                                    {item.is_active ? "Aktif" : "Tidak Aktif"}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
