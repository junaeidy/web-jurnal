import React, { useEffect, useState } from "react";

export default function AboutSection({ onLoadComplete }) {
    const [aboutData, setAboutData] = useState(null);

    useEffect(() => {
        const fetchAboutData = async () => {
            try {
                const response = await fetch("/api/home/about");
                const data = await response.json();
                setAboutData(data);
            } catch (error) {
                console.error("Gagal memuat data About:", error);
            } finally {
                onLoadComplete();
            }
        };

        fetchAboutData();
    }, []);

    if (!aboutData) return null;

    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-10">
                {/* Gambar */}
                <div className="md:w-1/2 w-full flex justify-center">
                    <img
                        src={`/storage/${aboutData.image}`}
                        alt="Tentang Kami"
                        className="rounded-lg shadow-lg max-w-full h-auto object-cover"
                    />
                </div>

                {/* Konten */}
                <div className="md:w-1/2 w-full text-center md:text-left">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                        {aboutData.title}
                    </h2>
                    <div
                        className="text-base md:text-lg text-gray-700 mb-8 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: aboutData.content }}
                    />
                    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                        {aboutData.google_form_link && (
                            <a
                                target="_blank"
                                href={aboutData.google_form_link}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-base transition duration-300 transform hover:scale-105"
                            >
                                Daftar Sekarang
                            </a>
                        )}
                        {aboutData.whatsapp_link && (
                            <a
                                href={aboutData.whatsapp_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg text-base transition duration-300 transform hover:scale-105"
                            >
                                Hubungi via WhatsApp
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
