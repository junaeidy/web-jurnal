import React from "react";
import { Head } from "@inertiajs/react";
import AboutList from "./AboutList";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Index() {
    return (
        <div>
            <AuthenticatedLayout
                header={
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Manajemen About
                    </h2>
                }
            >
                <Head title="Manajemen About" />
                <div className="flex flex-col flex-1 overflow-hidden">
                    <main className="flex-1 p-8 overflow-y-auto">
                        <AboutList />
                    </main>
                </div>
            </AuthenticatedLayout>
        </div>
    );
}
