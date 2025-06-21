import React from "react";
import { Head } from "@inertiajs/react";
import CategoryList from "./CategoryList";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Index() {
    return (
        <div>
            <AuthenticatedLayout
                header={
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Manajemen Kategori
                    </h2>
                }
            >
                <Head title="Manajemen Kategori" />
                <div className="flex flex-col flex-1 overflow-hidden">
                    <main className="flex-1 p-8 overflow-y-auto">
                        <CategoryList />
                    </main>
                </div>
            </AuthenticatedLayout>
        </div>
    );
}
