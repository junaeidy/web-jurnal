import { Link } from "@inertiajs/react";
import React, { useEffect, useState } from "react";

export default function HeroSection() {
    const [heroData, setHeroData] = useState(null);

    useEffect(() => {
        const fetchHeroData = async () => {
            try {
                const response = await fetch("/api/home/hero");
                const data = await response.json();
                setHeroData(data);
            } catch (error) {
                console.error("Gagal mengambil data hero:", error);
            }
        };

        fetchHeroData();
    }, []);

    if (!heroData) return null;

    return (
        <section
            className="relative h-screen bg-cover bg-center flex items-center justify-center text-center"
            style={{ backgroundImage: `url('/storage/${heroData.image}')` }}
        >
            <div className="absolute inset-0 bg-black opacity-60"></div>
            <div className="relative z-10 text-white px-4">
                <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-4 animate__animated animate__fadeInDown">
                    {heroData.title}
                </h1>
                <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto animate__animated animate__fadeInUp">
                    {heroData.subtitle}
                </p>
                <Link
                    href={heroData.cta_link}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg transform hover:scale-105 transition duration-300 animate__animated animate__zoomIn"
                >
                    {heroData.cta_text}
                </Link>
            </div>
        </section>
    );
}
