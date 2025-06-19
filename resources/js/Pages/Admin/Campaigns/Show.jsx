import React from "react";
import { Head, Link } from "@inertiajs/react";

export default function Show({ campaign }) {
    return (
        <div className="p-8">
            <Head title={`Detail: ${campaign.name}`} />

            <h1 className="text-2xl font-bold mb-4">{campaign.name}</h1>
            <p className="mb-2">
                <strong>Subject:</strong> {campaign.subject}
            </p>
            <p className="mb-4">
                <strong>Dibuat:</strong>{" "}
                {new Date(campaign.created_at).toLocaleString()}
            </p>

            <h2 className="text-xl font-semibold mb-2">Daftar Penerima</h2>
            <table className="w-full border text-sm">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border px-2 py-1">Email</th>
                        <th className="border px-2 py-1">Status</th>
                        <th className="border px-2 py-1">Dikirim Pada</th>
                    </tr>
                </thead>
                <tbody>
                    {campaign.recipients.map((r, i) => (
                        <tr key={i} className="border-t">
                            <td className="border px-2 py-1">{r.email}</td>
                            <td className="border px-2 py-1">
                                <span
                                    className={
                                        r.status === "sent"
                                            ? "text-green-600"
                                            : r.status === "failed"
                                            ? "text-red-600"
                                            : "text-yellow-600"
                                    }
                                >
                                    {r.status}
                                </span>
                            </td>
                            <td className="border px-2 py-1">
                                {r.updated_at
                                    ? new Date(r.updated_at).toLocaleString()
                                    : "-"}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Link
                href={route("campaigns.index")}
                className="text-blue-500 mt-4 inline-block"
            >
                ← Kembali ke daftar campaign
            </Link>
        </div>
    );
}
