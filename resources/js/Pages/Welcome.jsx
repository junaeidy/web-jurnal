import React, { useState } from "react";
import { Head } from "@inertiajs/react";
import Navbar from "@/Components/User/Navbar";
import HeroSection from "@/Components/User/HeroSection";
import AboutSection from "@/Components/User/AboutSection";
import FeaturedJournalsSection from "@/Components/User/FeaturedJournalsSection";
import Footer from "@/Components/User/Footer";

export default function Home({ auth }) {
    const [loadingCount, setLoadingCount] = useState(3);
    const handleSectionLoaded = () => {
        setLoadingCount((prev) => prev - 1);
    };

    const isLoading = loadingCount > 0;

    return (
        <>
            <Head title="Home" />

            {isLoading && (
                <div className="fixed inset-0 bg-white z-[999] flex flex-col items-center justify-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent"></div>
                    <p className="mt-4 text-gray-600 text-sm font-medium">
                        Memuat halaman...
                    </p>
                </div>
            )}

            <Navbar user={auth.user} />
            <HeroSection onLoadComplete={handleSectionLoaded} />
            <AboutSection onLoadComplete={handleSectionLoaded} />
            <FeaturedJournalsSection onLoadComplete={handleSectionLoaded} />
            <Footer />
        </>
    );
}
