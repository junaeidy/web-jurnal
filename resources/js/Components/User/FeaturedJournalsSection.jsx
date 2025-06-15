import React, { useEffect, useState, useRef } from "react";
import { Link } from "@inertiajs/react";
import Modal from "@/Components/UI/Modal";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export default function FeaturedJournalsSection({ onLoadComplete, isLoading }) {
    const [journals, setJournals] = useState([]);
    const [selectedJournal, setSelectedJournal] = useState(null);
    const sliderRef = useRef(null);

    useEffect(() => {
        const fetchJournals = async () => {
            try {
                const response = await fetch("/api/home/featured-journals");
                const data = await response.json();
                setJournals(data.slice(0, 10));
            } catch (error) {
                console.error("Gagal mengambil data jurnal unggulan:", error);
            } finally {
                onLoadComplete();
            }
        };

        fetchJournals();
    }, []);

    const handleCloseModal = () => setSelectedJournal(null);

    const scroll = (direction) => {
        const slider = sliderRef.current;
        if (slider) {
            const scrollAmount = slider.clientWidth * 0.8;
            slider.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            });
        }
    };

    if (isLoading || journals.length === 0) return null;

    return (
        <section className="py-16 bg-white relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2
                    className="text-3xl md:text-4xl font-bold text-gray-800 mb-12"
                    data-aos="fade-up"
                >
                    Our Featured Journals
                </h2>

                {/* Tombol kiri-kanan */}
                <div className="hidden md:block">
                    <button
                        onClick={() => scroll("left")}
                        className="absolute left-4 top-[52%] z-10 bg-white shadow-md p-2 rounded-full hover:bg-gray-100"
                    >
                        <ChevronLeftIcon className="h-6 w-6 text-gray-700" />
                    </button>
                    <button
                        onClick={() => scroll("right")}
                        className="absolute right-4 top-[52%] z-10 bg-white shadow-md p-2 rounded-full hover:bg-gray-100"
                    >
                        <ChevronRightIcon className="h-6 w-6 text-gray-700" />
                    </button>
                </div>

                {/* Slider */}
                <div
                    ref={sliderRef}
                    className="flex overflow-x-auto gap-6 scroll-smooth scrollbar-hide py-2"
                >
                    {journals.map((journal, index) => (
                        <div
                            key={journal.id}
                            className="min-w-[80%] sm:min-w-[300px] sm:max-w-[300px] bg-white rounded-lg shadow-xl overflow-hidden transform hover:scale-105 transition duration-300 border border-gray-200"
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                        >
                            <img
                                src={
                                    journal.cover
                                        ? `/${journal.cover}`
                                        : "https://placehold.co/250x400?text=No+Image"
                                }
                                alt={journal.title}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4 text-left">
                                <h3 className="text-base font-semibold text-gray-800 mb-2 leading-snug line-clamp-2">
                                    {journal.title}
                                </h3>
                                <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                                    {journal.description}
                                </p>
                                <button
                                    onClick={() => setSelectedJournal(journal)}
                                    className="inline-block bg-[#50c878] hover:bg-[#3fa767] text-white font-bold py-1.5 px-4 rounded-lg text-xs transition duration-300"
                                >
                                    Read more
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Tombol Lihat Semua */}
                <div className="mt-12" data-aos="zoom-in" data-aos-delay="800">
                    <Link
                        href="/journal"
                        className="inline-block bg-[#50c878] hover:bg-[#3fa767] text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 transform hover:scale-105"
                    >
                        View All Journals
                    </Link>
                </div>
            </div>

            {/* Modal Detail */}
            <Modal
                show={!!selectedJournal}
                maxWidth="2xl"
                onClose={handleCloseModal}
            >
                {selectedJournal && (
                    <div className="relative">
                        <img
                            src={
                                selectedJournal.cover
                                    ? `/${selectedJournal.cover}`
                                    : "https://placehold.co/250x400?text=No+Image"
                            }
                            alt={selectedJournal.title}
                            className="w-full h-64 object-cover rounded-t-lg"
                        />
                        <div className="p-6 space-y-4">
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">
                                {selectedJournal.title}
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                                        {selectedJournal.description}
                                    </p>
                                    {selectedJournal.link && (
                                        <a
                                            href={selectedJournal.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-block mt-4 bg-[#50c878] hover:bg-[#3fa767] text-white font-bold py-2 px-4 rounded-lg transition"
                                        >
                                            Visit Journal
                                        </a>
                                    )}
                                </div>
                                <div className="md:border-l md:pl-6 space-y-2 text-sm">
                                    <p className="text-gray-600">
                                        <span className="font-semibold">First Published:</span> {selectedJournal.published_year}
                                    </p>
                                    <p className="text-gray-600">
                                        <span className="font-semibold">Acceptance Rate:</span> {selectedJournal.acceptance_rate}%
                                    </p>
                                    <p className="text-gray-600">
                                        <span className="font-semibold">Decision Days:</span> {selectedJournal.decision_days} days
                                    </p>
                                    <p className="text-gray-600">
                                        <span className="font-semibold">Impact Factor:</span> {selectedJournal.impact_factor}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </Modal>
        </section>
    );
}
