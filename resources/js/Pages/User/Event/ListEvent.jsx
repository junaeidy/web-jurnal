import { useEffect, useState } from "react";
import { Link } from "@inertiajs/react";
import axios from "axios";

function stripHtml(html) {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
}

export default function ListEvent() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        axios.get("/api/events").then((res) => {
            const activeEvents = res.data.filter(
                (event) => event.is_active === 1
            );
            setEvents(activeEvents);
        });
    }, []);

    if (!events.length) {
        return (
            <div className="text-center py-20">
                <img
                    src="/images/not-found.svg"
                    alt="Not Found"
                    className="mx-auto mb-4 w-32"
                />
                <p className="text-gray-500">
                    Tidak ada kegiatan yang tersedia.
                </p>
            </div>
        );
    }

    return (
        <section className="max-w-6xl mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold mb-8 text-center">
                Daftar Kegiatan
            </h2>

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
                                {stripHtml(event.description).slice(0, 100)}...
                            </p>
                            <p className="text-gray-400 text-xs mt-3">
                                {new Date(event.event_date).toLocaleDateString(
                                    "id-ID",
                                    {
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric",
                                    }
                                )}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
