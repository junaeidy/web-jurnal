import React from "react";
import { Link } from "@inertiajs/react";

export default function CampaignList({ campaigns }) {
    return (
        <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <div className="flex justify-end mb-4">
                <Link
                    href={route("campaigns.create")}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    + Add Campaign
                </Link>
            </div>
            <table className="min-w-full table-auto border-collapse">
                <thead>
                    <tr className="bg-gray-100 dark:bg-gray-700 text-left text-gray-800 dark:text-white">
                        <th className="border px-4 py-2">Nama</th>
                        <th className="border px-4 py-2">Status</th>
                        <th className="border px-4 py-2">Berhasil</th>
                        <th className="border px-4 py-2">Gagal</th>
                        <th className="border px-4 py-2">Dibuat</th>
                        <th className="border px-4 py-2">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {campaigns.length === 0 ? (
                        <tr>
                            <td
                                colSpan="6"
                                className="text-center text-gray-500 py-4"
                            >
                                Belum ada campaign.
                            </td>
                        </tr>
                    ) : (
                        campaigns.map((c) => (
                            <tr
                                key={c.id}
                                className="hover:bg-gray-50 dark:hover:bg-gray-700"
                            >
                                <td className="border px-4 py-2">{c.name}</td>
                                <td className="border px-4 py-2 capitalize">
                                    {c.status}
                                </td>
                                <td className="border px-4 py-2 text-green-600">
                                    {c.success_count}
                                </td>
                                <td className="border px-4 py-2 text-red-600">
                                    {c.failed_count}
                                </td>
                                <td className="border px-4 py-2">
                                    {new Date(c.created_at).toLocaleString()}
                                </td>
                                <td className="border px-4 py-2">
                                    <Link
                                        href={route("campaigns.show", c.id)}
                                        className="text-blue-600 hover:underline"
                                    >
                                        View Details
                                    </Link>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}
