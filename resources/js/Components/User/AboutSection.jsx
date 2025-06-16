import React, { useEffect, useState, useRef } from "react";

export default function AboutSection({ onLoadComplete, isLoading }) {
    const [aboutList, setAboutList] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const sliderRef = useRef();

    useEffect(() => {
        const fetchAboutData = async () => {
            try {
                const response = await fetch("/api/home/about");
                const data = await response.json();
                setAboutList(data);
            } catch (error) {
                console.error("Gagal memuat data About:", error);
            } finally {
                onLoadComplete();
            }
        };

        fetchAboutData();
    }, []);

    const next = () => {
        setCurrentIndex((prev) =>
            prev === aboutList.length - 1 ? 0 : prev + 1
        );
    };

    const prev = () => {
        setCurrentIndex((prev) =>
            prev === 0 ? aboutList.length - 1 : prev - 1
        );
    };

    if (!aboutList.length || isLoading) return null;

    return (
        <section className="py-16 bg-gray-50 relative overflow-hidden">
            {/* Tombol Navigasi */}
            <button
                onClick={prev}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white shadow p-2 rounded-full"
            >
                &#8592;
            </button>
            <button
                onClick={next}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white shadow p-2 rounded-full"
            >
                &#8594;
            </button>

            {/* Carousel Container */}
            <div className="relative w-full overflow-hidden max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div
                    ref={sliderRef}
                    className="flex transition-transform duration-700 ease-in-out"
                    style={{
                        width: `${aboutList.length * 100}%`,
                        transform: `translateX(-${
                            currentIndex * (100 / aboutList.length)
                        }%)`,
                    }}
                >
                    {aboutList.map((about, idx) => (
                        <div
                            key={about.id}
                            className="w-full flex-shrink-0 flex flex-col md:flex-row items-center gap-10 px-4 md:px-8"
                            style={{ width: `${100 / aboutList.length}%` }}
                            data-aos={currentIndex === idx ? "fade-up" : ""}
                            data-aos-duration="1000"
                            data-aos-once="true"
                        >
                            {/* Gambar */}
                            {about.image && (
                                <div className="md:w-1/2 w-full flex justify-center">
                                    <img
                                        src={`/storage/${about.image}`}
                                        alt={about.title}
                                        className="rounded-lg shadow-lg max-w-full h-auto object-cover"
                                    />
                                </div>
                            )}

                            {/* Konten */}
                            <div className="md:w-1/2 w-full text-center md:text-left">
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                                    {about.title}
                                </h2>
                                <div
                                    className="text-base md:text-lg text-gray-700 mb-8 leading-relaxed"
                                    dangerouslySetInnerHTML={{
                                        __html: about.content,
                                    }}
                                />
                                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                                    {about.google_form_link && (
                                        <a
                                            target="_blank"
                                            href={about.google_form_link}
                                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-base transition duration-300 transform hover:scale-105"
                                        >
                                            Register Now
                                        </a>
                                    )}
                                    {about.whatsapp_link && (
                                        <a
                                            href={about.whatsapp_link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg text-base transition duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width={24}
                                                height={24}
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" />
                                                <path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1" />
                                            </svg>
                                            <span>WhatsApp</span>
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
