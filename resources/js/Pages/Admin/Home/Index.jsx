import React from "react";
import { Head } from "@inertiajs/react";
import HeroSection from "@/Components/Admin/Home/HeroSection";
import AboutSection from "@/Components/Admin/Home/AboutSection";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Index() {
    return (
        <div>
            <AuthenticatedLayout
                header={
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Manajemen Home
                    </h2>
                }
            >
                <Head title="Manajemen Home" />
                <div className="flex flex-col flex-1 overflow-hidden">
                    <main className="flex-1 overflow-y-auto p-8">
                        <div className="space-y-24 pb-24">
                            <HeroSection />
                            <AboutSection />
                        </div>
                    </main>
                </div>
            </AuthenticatedLayout>
        </div>
    );
}
