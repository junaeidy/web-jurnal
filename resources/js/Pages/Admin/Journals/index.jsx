import React from "react";
import { Head } from "@inertiajs/react";
import JournalList from "./JournalList";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function index() {
    return (
        <div>
            <Head title="Manajemen Jurnal" />
            <AuthenticatedLayout
                header={
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Manajemen Jurnal
                    </h2>
                }
            >
                <div className="flex flex-col flex-1 overflow-hidden">
                    <main className="flex-1 overflow-y-auto p-8">
                        <JournalList />
                    </main>
                </div>
            </AuthenticatedLayout>
        </div>
    );
}
