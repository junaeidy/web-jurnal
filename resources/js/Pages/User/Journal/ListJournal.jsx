import React, { useEffect, useState } from "react";
import { usePage, Head } from "@inertiajs/react";
import Modal from "@/Components/UI/Modal";

export default function ListJournal({ onLoaded }) {
    const { translations, locale } = usePage().props;
    const journalT = translations.journal || {};
    const currentLang = locale || "en";

    const [journals, setJournals] = useState([]);
    const [selectedJournal, setSelectedJournal] = useState(null);
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState("title");
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchJournals = async () => {
        setLoading(true);
        try {
            const query = new URLSearchParams({
                search,
                sort: sortBy,
                category: selectedCategory,
                page,
                limit: 15,
            }).toString();
            const response = await fetch(`/api/journals?${query}`);
            const data = await response.json();
            setJournals(data.data);
            setTotalPages(data.last_page);
        } catch (error) {
            console.error("Gagal mengambil data jurnal:", error);
        } finally {
            setLoading(false);
            if (onLoaded) onLoaded();
        }
    };

    useEffect(() => {
        fetchJournals();
    }, [search, sortBy, selectedCategory, page]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch("/api/categories");
                const data = await res.json();
                setCategories(data);
            } catch (error) {
                console.error("Gagal mengambil kategori:", error);
            }
        };
        fetchCategories();
    }, []);

    const handleCloseModal = () => setSelectedJournal(null);

    const getText = (field) => {
        if (!field) return "";
        return typeof field === "object" ? field[locale] || field["id"] || "" : field;
    };

    return (
        <section className="py-16 bg-white">
            <Head title={journalT.find_title?. [currentLang] ?? "Find Journal"} />
            <div className="container mx-auto px-4">
                {/* FILTERS */}
                <div className="mb-10 grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                    {/* Search */}
                    <div className="flex flex-col">
                        <label htmlFor="search" className="text-sm font-medium text-gray-700 mb-1">
                            {journalT.search_label?.[currentLang] ?? "Search Journal"}
                        </label>
                        <input
                            id="search"
                            type="text"
                            placeholder={journalT.search_placeholder?. [currentLang] ?? "Enter journal name..."}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Category */}
                    <div className="flex flex-col">
                        <label htmlFor="category" className="text-sm font-medium text-gray-700 mb-1">
                            {journalT.category_filter?. [currentLang] ?? "Category"}
                        </label>
                        <select
                            id="category"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">{journalT.all_categories?. [currentLang] ?? "All Categories"}</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {getText(cat.name)}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Sort */}
                    <div className="flex flex-col">
                        <label htmlFor="sort" className="text-sm font-medium text-gray-700 mb-1">
                            {journalT.sort_by?. [currentLang] ?? "Sort By"}
                        </label>
                        <select
                            id="sort"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="title">{journalT.sort_title_asc?. [currentLang] ?? "Title (A-Z)"}</option>
                            <option value="-title">{journalT.sort_title_desc?. [currentLang] ?? "Title (Z-A)"}</option>
                            <option value="-impact_factor">{journalT.sort_impact_desc?. [currentLang] ?? "Highest Impact Factor"}</option>
                            <option value="-acceptance_rate">{journalT.sort_acceptance_desc?. [currentLang] ?? "Highest Acceptance Rate"}</option>
                        </select>
                    </div>
                </div>

                {/* LOADING */}
                {loading ? (
                    <div className="text-center py-10">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="mt-2 text-gray-500">{journalT.loading?. [currentLang] ?? "Loading journals..."}</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                        {journals.length === 0 ? (
                            <div className="col-span-full flex flex-col items-center justify-center py-12 text-gray-500">
                                <img
                                    src="/images/not-found.svg"
                                    alt="Not found"
                                    className="w-40 h-40 object-contain mb-4"
                                />
                                <p className="text-lg font-medium">{journalT.no_journal?. [currentLang] ?? "No journals found."}</p>
                            </div>
                        ) : (
                            journals.map((journal) => (
                                <div
                                    key={journal.id}
                                    className="bg-white rounded-lg shadow-xl overflow-hidden transform hover:scale-105 transition duration-300 border border-gray-200"
                                >
                                    <img
                                        src={
                                            journal.cover
                                                ? `/${journal.cover}`
                                                : "https://placehold.co/250x400?text=No+Image"
                                        }
                                        alt={getText(journal.title?. [currentLang] ?? "Title")}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="p-4 text-left">
                                        <h3 className="text-lg font-semibold text-gray-800 mb-2 leading-snug">
                                            {getText(journal.title)}
                                        </h3>
                                        <p
                                            className="text-gray-700 text-sm mb-4 line-clamp-3"
                                            dangerouslySetInnerHTML={{
                                                __html: getText(journal.description?. [currentLang] ?? journal.description),
                                            }}
                                        />
                                        <button
                                            onClick={() => setSelectedJournal(journal)}
                                            className="inline-block bg-[#50c878] hover:bg-[#3fa767] text-white font-bold py-1.5 px-4 rounded-lg text-xs transition duration-300"
                                        >
                                            {journalT.read_more?. [currentLang] ?? "Read more"}
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}

                {/* PAGINATION */}
                {totalPages > 1 && (
                    <div className="mt-8 flex justify-center items-center space-x-1">
                        {[...Array(Math.min(totalPages, 9)).keys()].map((i) => {
                            const pageNum = i + 1;
                            return (
                                <button
                                    key={pageNum}
                                    onClick={() => setPage(pageNum)}
                                    className={`px-3 py-1 rounded ${
                                        page === pageNum
                                            ? "bg-[#50c878] text-white"
                                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    }`}
                                >
                                    {pageNum}
                                </button>
                            );
                        })}
                        {totalPages > 9 && (
                            <>
                                <span className="px-2 text-gray-500">...</span>
                                <button
                                    onClick={() => setPage(totalPages)}
                                    className={`px-3 py-1 rounded ${
                                        page === totalPages
                                            ? "bg-[#50c878] text-white"
                                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    }`}
                                >
                                    {totalPages}
                                </button>
                            </>
                        )}
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
                                        className="text-gray-700 leading-relaxed"
                                        dangerouslySetInnerHTML={{
                                            __html: getText(selectedJournal.description),
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
                                            WhatsApp
                                        </a>
                                        </div>
                                </div>
                                <div className="md:border-l md:pl-6 space-y-2 text-sm">
                                    <p className="text-gray-600">
                                        <span className="font-semibold">{journalT.published_year}:</span>{" "}
                                        {selectedJournal.published_year}
                                    </p>
                                    <p className="text-gray-600">
                                        <span className="font-semibold">{journalT.acceptance_rate}:</span>{" "}
                                        {selectedJournal.acceptance_rate}%
                                    </p>
                                    <p className="text-gray-600">
                                        <span className="font-semibold">{journalT.decision_days}:</span>{" "}
                                        {selectedJournal.decision_days} days
                                    </p>
                                    <p className="text-gray-600">
                                        <span className="font-semibold">{journalT.impact_factor}:</span>{" "}
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
