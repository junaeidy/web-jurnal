import { Link, usePage } from "@inertiajs/react";
import React, { useEffect, useState } from "react";

export default function HeroSection({ onLoadComplete, isLoading }) {
    const [heroList, setHeroList] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const { props } = usePage();
    const currentLang = props.locale || "en";

    // Fetch hero list
    useEffect(() => {
        const fetchHeroData = async () => {
            try {
                const response = await fetch("/api/home/hero");
                const data = await response.json();

                const processed = data.map((item) => ({
                    title:
                        typeof item.title === "string"
                            ? JSON.parse(item.title)
                            : item.title,
                    subtitle:
                        typeof item.subtitle === "string"
                            ? JSON.parse(item.subtitle)
                            : item.subtitle,
                    cta_text:
                        typeof item.cta_text === "string"
                            ? JSON.parse(item.cta_text)
                            : item.cta_text,
                    cta_link: item.cta_link,
                    image: item.image,
                }));

                setHeroList(processed);
            } catch (error) {
                console.error("Gagal mengambil data hero:", error);
            } finally {
                onLoadComplete();
            }
        };

        fetchHeroData();
    }, []);

    // Slider: ubah hero setiap 5 detik
    useEffect(() => {
        if (heroList.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % heroList.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [heroList]);

    if (isLoading || heroList.length === 0) return null;

    const heroData = heroList[currentIndex];

    return (
        <section
            className="relative h-screen bg-cover bg-center flex items-center justify-center text-center transition-all duration-1000"
            style={{ backgroundImage: `url('/storage/${heroData.image}')` }}
        >
            {(heroData.title?.[currentLang] ||
                heroData.subtitle?.[currentLang] ||
                heroData.cta_text?.[currentLang] ||
                heroData.cta_link) && (
                <div className="absolute inset-0 bg-black/60" />
            )}

            <div className="relative z-10 text-white px-4 sm:px-6 md:px-8 max-w-4xl w-full">
                <h1
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold leading-tight mb-4"
                    data-aos="fade-up"
                    data-aos-delay="100"
                >
                    {heroData.title?.[currentLang] || " "}
                </h1>
                <p
                    className="text-base sm:text-lg md:text-xl mb-8"
                    data-aos="fade-up"
                    data-aos-delay="300"
                >
                    {heroData.subtitle?.[currentLang] || " "}
                </p>
                {heroData.cta_text?.[currentLang] && heroData.cta_link && (
                    <div data-aos="zoom-in" data-aos-delay="500">
                        <Link
                            href={heroData.cta_link}
                            className="inline-block bg-[#50c878] hover:bg-[#3fa767] text-white font-bold py-3 px-6 sm:px-8 rounded-full text-base sm:text-lg shadow-lg transform hover:scale-105 transition duration-300"
                        >
                            {heroData.cta_text[currentLang]}
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
}
