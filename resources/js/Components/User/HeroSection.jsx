import { Link } from "@inertiajs/react";
import React, { useEffect, useState } from "react";

export default function HeroSection({ onLoadComplete, isLoading }) {
    const [heroData, setHeroData] = useState(null);

    useEffect(() => {
        const fetchHeroData = async () => {
            try {
                const response = await fetch("/api/home/hero");
                const data = await response.json();
                setHeroData(data);
            } catch (error) {
                console.error("Gagal mengambil data hero:", error);
            } finally {
                onLoadComplete();
            }
        };

        fetchHeroData();
    }, []);

    if (!heroData || isLoading) return null;

    return (
        <section
            className="relative h-screen bg-cover bg-center flex items-center justify-center text-center"
            style={{ backgroundImage: `url('/storage/${heroData.image}')` }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/60" />

            {/* Konten */}
            <div className="relative z-10 text-white px-4 sm:px-6 md:px-8 max-w-4xl w-full">
                <h1
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold leading-tight mb-4"
                    data-aos="fade-up"
                    data-aos-delay="100"
                >
                    {heroData.title}
                </h1>
                <p
                    className="text-base sm:text-lg md:text-xl mb-8"
                    data-aos="fade-up"
                    data-aos-delay="300"
                >
                    {heroData.subtitle}
                </p>
                <div data-aos="zoom-in" data-aos-delay="500">
                    <Link
                        href={heroData.cta_link}
                        className="inline-block bg-[#50c878] hover:bg-[#3fa767] text-white font-bold py-3 px-6 sm:px-8 rounded-full text-base sm:text-lg shadow-lg transform hover:scale-105 transition duration-300"
                    >
                        {heroData.cta_text}
                    </Link>
                </div>
            </div>
        </section>
    );
}
