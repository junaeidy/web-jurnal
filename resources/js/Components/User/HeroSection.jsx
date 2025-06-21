import { Link, usePage } from "@inertiajs/react";
import React, { useEffect, useRef, useState } from "react";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import AOS from "aos";
import "aos/dist/aos.css";

export default function HeroSection({ onLoadComplete, isLoading }) {
    const [heroList, setHeroList] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(true);
    const { props } = usePage();
    const currentLang = props.locale || "en";

    // Init AOS
    useEffect(() => {
        AOS.init({
            duration: 800,
            once: false,
        });
    }, []);

    // Trigger ulang animasi setiap ganti slide
    useEffect(() => {
        AOS.refresh();
    }, [currentIndex]);

    // Ambil data dari API
    useEffect(() => {
        const fetchHeroData = async () => {
            try {
                const response = await fetch("/api/home/hero");
                const data = await response.json();

                const processed = data.map((item) => ({
                    title: typeof item.title === "string" ? JSON.parse(item.title) : item.title,
                    subtitle: typeof item.subtitle === "string" ? JSON.parse(item.subtitle) : item.subtitle,
                    cta_text: typeof item.cta_text === "string" ? JSON.parse(item.cta_text) : item.cta_text,
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

    // Slider interval
    useEffect(() => {
        if (heroList.length <= 1) return;

        const interval = setInterval(() => {
            setIsTransitioning(true);
            setCurrentIndex((prev) => prev + 1);
        }, 6000);

        return () => clearInterval(interval);
    }, [heroList]);

    // Reset loop ke kiri
    useEffect(() => {
        if (currentIndex === heroList.length) {
            const timeout = setTimeout(() => {
                setIsTransitioning(false);
                setCurrentIndex(0);
            }, 700);
            return () => clearTimeout(timeout);
        }
    }, [currentIndex, heroList.length]);

    if (isLoading || heroList.length === 0) return null;

    const displayedSlides = [...heroList, heroList[0]];

    return (
        <section className="relative w-full overflow-hidden min-h-screen bg-gradient-to-br from-[#f0fdf4] via-white to-[#e0f5eb]">
            <div
                className="flex"
                style={{
                    width: `${displayedSlides.length * 100}%`,
                    transform: `translateX(-${currentIndex * (100 / displayedSlides.length)}%)`,
                    transition: isTransitioning ? "transform 0.7s ease-in-out" : "none",
                }}
            >
                {displayedSlides.map((hero, index) => (
                    <div
                        key={index}
                        className="w-full flex-shrink-0 flex items-center justify-center px-6 lg:px-20 min-h-screen"
                        style={{ width: `${100 / displayedSlides.length}%` }}
                    >
                        <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 items-center gap-10 py-20 lg:py-28">
                            {/* Kiri: Teks dengan animasi */}
                            <div className="text-left" data-aos="fade-right" data-aos-delay="200">
                                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#2A7C4C] mb-6 leading-tight">
                                    {hero.title?.[currentLang] || ""}
                                </h1>
                                <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-8 max-w-xl" data-aos="fade-up" data-aos-delay="400">
                                    {hero.subtitle?.[currentLang] || ""}
                                </p>
                                {hero.cta_text?.[currentLang] && hero.cta_link && (
                                    <div data-aos="fade-up" data-aos-delay="600">
                                        <Link
                                            href={hero.cta_link}
                                            className="inline-flex items-center gap-2 bg-[#2A7C4C] hover:bg-[#3fa767] text-white font-semibold px-6 py-3 rounded-full text-base shadow-lg hover:scale-105 transition-transform"
                                        >
                                            {hero.cta_text[currentLang]}
                                            <ArrowRightIcon className="w-5 h-5" />
                                        </Link>
                                    </div>
                                )}
                            </div>

                            {/* Kanan: Gambar dengan animasi */}
                            <div className="flex justify-center" data-aos="fade-left" data-aos-delay="500">
                                <img
                                    src={`/storage/${hero.image}`}
                                    alt="Hero"
                                    className="w-full max-w-md rounded-xl shadow-lg object-cover"
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
