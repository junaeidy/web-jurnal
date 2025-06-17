import React, { useEffect, useState, useRef } from "react";
import { Link, usePage } from "@inertiajs/react";
import Modal from "@/Components/UI/Modal";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export default function FeaturedJournalsSection({ onLoadComplete, isLoading }) {
    const [journals, setJournals] = useState([]);
    const [selectedJournal, setSelectedJournal] = useState(null);
    const sliderRef = useRef(null);
    const { translations, locale } = usePage().props;
    const journalT = translations?.journal || {};

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

    function stripHtml(html) {
        const div = document.createElement("div");
        div.innerHTML = html;
        return div.textContent || div.innerText || "";
    }

    function truncate(text, maxLength) {
        return text.length > maxLength
            ? text.slice(0, maxLength) + "..."
            : text;
    }

    const getText = (obj) =>
        typeof obj === "object" ? obj[locale] || "" : obj || "";

    if (isLoading || journals.length === 0) return null;

    return (
        <section className="py-16 bg-white relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2
                    className="text-3xl md:text-4xl font-bold text-gray-800 mb-12"
                    data-aos="fade-up"
                >
                    {journalT.title}
                </h2>

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
                                alt={getText(journal.title)}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4 text-left">
                                <h3 className="text-base font-semibold text-gray-800 mb-2 leading-snug line-clamp-2">
                                    {getText(journal.title)}
                                </h3>
                                <p className="text-gray-700 text-sm mb-4">
                                    {truncate(
                                        stripHtml(getText(journal.description)),
                                        120
                                    )}
                                </p>

                                <button
                                    onClick={() => setSelectedJournal(journal)}
                                    className="inline-block bg-[#50c878] hover:bg-[#3fa767] text-white font-bold py-1.5 px-4 rounded-lg text-xs transition duration-300"
                                >
                                    {journalT.read_more}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12" data-aos="zoom-in" data-aos-delay="800">
                    <Link
                        href="/journal"
                        className="inline-block bg-[#50c878] hover:bg-[#3fa767] text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 transform hover:scale-105"
                    >
                        {journalT.view_all}
                    </Link>
                </div>
            </div>

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
                            alt={getText(selectedJournal.title)}
                            className="w-full h-64 object-cover rounded-t-lg"
                        />
                        <div className="p-6 space-y-4">
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">
                                {getText(selectedJournal.title)}
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <div
                                        className="text-gray-700 leading-relaxed prose max-w-none"
                                        dangerouslySetInnerHTML={{
                                            __html: getText(
                                                selectedJournal.description
                                            ),
                                        }}
                                    />

                                    <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-4">
                                        {selectedJournal.link && (
                                            <a
                                                href={selectedJournal.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex-1 text-center bg-[#50c878] hover:bg-[#3fa767] text-white font-semibold py-2.5 px-4 rounded-lg transition duration-300"
                                            >
                                                {journalT.visit}
                                            </a>
                                        )}
                                        <a
                                            href="https://wa.me/6285379388533"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 text-center flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-lg transition duration-300"
                                        >
                                            {journalT.contact}
                                        </a>
                                    </div>
                                </div>

                                <div className="md:border-l md:pl-6 space-y-2 text-sm">
                                    <p className="text-gray-600">
                                        <span className="font-semibold">
                                            {journalT.published_year}:
                                        </span>{" "}
                                        {selectedJournal.published_year}
                                    </p>
                                    <p className="text-gray-600">
                                        <span className="font-semibold">
                                            {journalT.acceptance_rate}:
                                        </span>{" "}
                                        {selectedJournal.acceptance_rate}%
                                    </p>
                                    <p className="text-gray-600">
                                        <span className="font-semibold">
                                            {journalT.decision_days}:
                                        </span>{" "}
                                        {selectedJournal.decision_days} days
                                    </p>
                                    <p className="text-gray-600">
                                        <span className="font-semibold">
                                            {journalT.impact_factor}:
                                        </span>{" "}
                                        {selectedJournal.impact_factor}
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
