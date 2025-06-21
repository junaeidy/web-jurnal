import React from "react";
import { Head } from "@inertiajs/react";
import KegiatanList from "./KegiatanList";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function index() {
    return (
        <div>
            <AuthenticatedLayout
                header={
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Manajemen Kegiatan
                    </h2>
                }
            >
                <Head title="Manajemen Kegiatan" />
                <div className="flex flex-col flex-1 overflow-hidden">
                    <main className="flex-1 p-8 overflow-y-auto">
                        <KegiatanList />
                    </main>
                </div>
            </AuthenticatedLayout>
        </div>
    );
}
