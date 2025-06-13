import React, { useEffect, useState } from "react";
import Modal from "@/Components/UI/Modal";

export default function ListJournal() {
    const [journals, setJournals] = useState([]);
    const [selectedJournal, setSelectedJournal] = useState(null);
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState("title");
    const [loading, setLoading] = useState(false);

    const fetchJournals = async () => {
        setLoading(true);
        try {
            const query = new URLSearchParams({
                search,
                sort: sortBy,
            }).toString();
            const response = await fetch(`/api/journals?${query}`);
            const data = await response.json();
            setJournals(data);
        } catch (error) {
            console.error("Gagal mengambil data jurnal:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJournals();
    }, [search, sortBy]);

    const handleCloseModal = () => setSelectedJournal(null);

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4 text-center">
                {/* FILTERS */}
                <div className="mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <input
                        type="text"
                        placeholder="Cari berdasarkan judul atau penulis..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="title">Sort by Judul</option>
                        <option value="impact_factor">Sort by Impact Factor</option>
                        <option value="acceptance_rate">Sort by Acceptance Rate</option>
                    </select>
                </div>

                {/* SPINNER */}
                {loading ? (
                    <div className="text-center py-10">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="mt-2 text-gray-500">Memuat data jurnal...</p>
                    </div>
                ) : (
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
                                        Oleh: <span className="font-medium text-blue-600">{journal.authors}</span>
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
                )}
            </div>

            {/* MODAL DETAIL */}
            <Modal
                show={!!selectedJournal}
                maxWidth="2xl"
                onClose={handleCloseModal}
            >
                {selectedJournal && (
                    <div className="relative">
                        <img
                            src={`/${selectedJournal.cover}`}
                            alt={selectedJournal.title}
                            className="w-full h-64 object-cover rounded-t-lg"
                        />
                        <div className="p-6 space-y-4">
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">
                                {selectedJournal.title}
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                <div className="md:border-l md:pl-6 space-y-2 text-sm">
                                    <p className="text-gray-600">
                                        <span className="font-semibold">Penulis:</span> {selectedJournal.authors}
                                    </p>
                                    <p className="text-gray-600">
                                        <span className="font-semibold">Acceptance Rate:</span> {selectedJournal.acceptance_rate}%
                                    </p>
                                    <p className="text-gray-600">
                                        <span className="font-semibold">Decision Days:</span> {selectedJournal.decision_days} hari
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
