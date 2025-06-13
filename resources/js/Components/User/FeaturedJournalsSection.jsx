import React, { useEffect, useState } from "react";
import { Link } from "@inertiajs/react";
import Modal from "@/Components/UI/Modal";

export default function FeaturedJournalsSection() {
    const [journals, setJournals] = useState([]);
    const [selectedJournal, setSelectedJournal] = useState(null);

    useEffect(() => {
        const fetchJournals = async () => {
            try {
                const response = await fetch("/api/home/featured-journals");
                const data = await response.json();
                setJournals(data.slice(0, 5));
            } catch (error) {
                console.error("Gagal mengambil data jurnal unggulan:", error);
            }
        };

        fetchJournals();
    }, []);

    const handleCloseModal = () => setSelectedJournal(null);

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-4xl font-bold text-gray-800 mb-12">
                    Jurnal Unggulan Kami
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                    {journals.map((journal) => (
                        <div
                            key={journal.id}
                            className="bg-white rounded-lg shadow-xl overflow-hidden transform hover:scale-105 transition duration-300 border border-gray-200"
                        >
                            <img
                                src={`/${journal.cover}`}
                                alt={journal.title}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4 text-left">
                                <h3 className="text-lg font-semibold text-gray-800 mb-2 leading-snug">
                                    {journal.title}
                                </h3>
                                <p className="text-gray-600 text-xs mb-3">
                                    Oleh:{" "}
                                    <span className="font-medium text-blue-600">
                                        {journal.authors}
                                    </span>
                                </p>
                                <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                                    {journal.description}
                                </p>
                                <button
                                    onClick={() => setSelectedJournal(journal)}
                                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-1.5 px-4 rounded-lg text-xs transition duration-300"
                                >
                                    Baca Selengkapnya
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12">
                    <Link
                        href="/jurnal"
                        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 transform hover:scale-105"
                    >
                        Lihat Semua Jurnal
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
                        {/* Cover dan Judul */}
                        <img
                            src={`/${selectedJournal.cover}`}
                            alt={selectedJournal.title}
                            className="w-full h-64 object-cover rounded-t-lg"
                        />
                        <div className="p-6 space-y-4">
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">
                                {selectedJournal.title}
                            </h3>

                            {/* Konten Dua Kolom dengan Garis Pembatas */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Kolom Kiri - Deskripsi */}
                                <div>
                                    <p className="text-gray-700 leading-relaxed">
                                        {selectedJournal.description}
                                    </p>
                                    {selectedJournal.link && (
                                        <a
                                            href={selectedJournal.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-block mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition"
                                        >
                                            Kunjungi Jurnal
                                        </a>
                                    )}
                                </div>

                                {/* Kolom Kanan - Detail dengan Border */}
                                <div className="md:border-l md:pl-6 space-y-2 text-sm">
                                    <p className="text-gray-600">
                                        <span className="font-semibold">
                                            Penulis:
                                        </span>{" "}
                                        {selectedJournal.authors}
                                    </p>
                                    <p className="text-gray-600">
                                        <span className="font-semibold">
                                            Tahun Terbit:
                                        </span>{" "}
                                        {selectedJournal.published_year}
                                    </p>
                                    <p className="text-gray-600">
                                        <span className="font-semibold">
                                            Acceptance Rate:
                                        </span>{" "}
                                        {selectedJournal.acceptance_rate}%
                                    </p>
                                    <p className="text-gray-600">
                                        <span className="font-semibold">
                                            Decision Days:
                                        </span>{" "}
                                        {selectedJournal.decision_days} hari
                                    </p>
                                    <p className="text-gray-600">
                                        <span className="font-semibold">
                                            Impact Factor:
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
