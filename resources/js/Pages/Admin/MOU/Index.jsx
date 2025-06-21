import React from "react";
import { Head } from "@inertiajs/react";
import PartnerList from "./PartnerList";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function index() {
    return (
        <div>
            <AuthenticatedLayout
                header={
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Manajemen Partner
                    </h2>
                }
            >
                <Head title="Manajemen Partner" />
                <div className="flex flex-col flex-1 overflow-hidden">
                    <main className="flex-1 overflow-y-auto p-8">
                        <PartnerList />
                    </main>
                </div>
            </AuthenticatedLayout>
        </div>
    );
}
