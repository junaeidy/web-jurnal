import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "@inertiajs/react";

function stripHtml(html) {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
}

export default function ListEvent({ onLoaded }) {
    const [events, setEvents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const limit = 15;

    useEffect(() => {
        const fetchEvents = async () => {
            setIsLoading(true);
            try {
                const res = await axios.get(
                    `/api/public-events?page=${currentPage}&limit=${limit}`
                );
                setEvents(res.data.data);
                setTotalPages(res.data.last_page);
            } catch (error) {
                console.error("Gagal mengambil data kegiatan:", error);
            } finally {
                setIsLoading(false);
                if (onLoaded) onLoaded();
            }
        };

        fetchEvents();
    }, [currentPage]);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const renderPagination = () => {
        if (totalPages <= 1) return null;

        const pages = [];
        const maxVisible = 9;
        let startPage = Math.max(1, currentPage - 4);
        let endPage = Math.min(totalPages, startPage + maxVisible - 1);

        if (endPage - startPage < maxVisible - 1) {
            startPage = Math.max(1, endPage - maxVisible + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={`px-3 py-1 rounded-md mx-1 text-sm ${
                        currentPage === i
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 text-gray-700 hover:bg-blue-100"
                    }`}
                >
                    {i}
                </button>
            );
        }

        if (endPage < totalPages) {
            pages.push(
                <span key="dots" className="mx-2 text-gray-500">
                    ...
                </span>
            );
        }

        return <div className="flex justify-center mt-8">{pages}</div>;
    };

    return (
        <section className="max-w-6xl mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold mb-8 text-center">
                List of events
            </h2>

            {isLoading ? (
                <div className="text-center py-20">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto mb-2"></div>
                    <p className="text-gray-500">Loading events ...</p>
                </div>
            ) : events.length === 0 ? (
                <div className="text-center py-20">
                    <img
                        src="/images/not-found.svg"
                        alt="Not Found"
                        className="mx-auto mb-4 w-32"
                    />
                    <p className="text-gray-500">
                        There are no events available.
                    </p>
                </div>
            ) : (
                <>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {events.map((event) => (
                            <Link
                                href={`/events/${event.slug}`}
                                key={event.id}
                                className="bg-white rounded-lg shadow hover:shadow-lg transition duration-300 overflow-hidden group"
                            >
                                {event.image ? (
                                    <img
                                        src={`/storage/${event.image}`}
                                        alt={event.title}
                                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                ) : (
                                    <img
                                        src="https://placehold.co/600x300?text=No+Image"
                                        alt="No Image"
                                        className="w-full h-48 object-cover"
                                    />
                                )}

                                <div className="p-4">
                                    <h3 className="text-xl font-semibold mb-2">
                                        {event.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm line-clamp-3">
                                        {stripHtml(event.description).slice(
                                            0,
                                            100
                                        )}
                                        ...
                                    </p>
                                    <p className="text-gray-400 text-xs mt-3">
                                        {new Date(
                                            event.event_date
                                        ).toLocaleDateString("id-ID", {
                                            day: "numeric",
                                            month: "long",
                                            year: "numeric",
                                        })}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {renderPagination()}
                </>
            )}
        </section>
    );
}
