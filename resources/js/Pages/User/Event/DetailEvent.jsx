import { useEffect, useState } from "react";
import { Head, usePage } from "@inertiajs/react";
import axios from "axios";
import Navbar from "@/Components/User/Navbar";
import Footer from "@/Components/User/Footer";

export default function DetailEvent({ auth }) {
    const { slug } = usePage().props;

    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!slug) return;

        axios
            .get(`/api/events/slug/${slug}`)
            .then((res) => {
                setEvent(res.data);
            })
            .catch((err) => {
                console.error("Gagal ambil data event", err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [slug]);

    if (loading) {
        return (
            <div className="fixed inset-0 bg-white z-[999] flex flex-col items-center justify-center">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-2 text-gray-500">Memuat halaman...</p>
            </div>
        );
    }

    if (!event) {
        return (
            <div className="text-center py-16 text-gray-500">
                Kegiatan tidak ditemukan.
            </div>
        );
    }

    const formattedDate = new Date(event.event_date).toLocaleString("id-ID", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
    });

    return (
        <>
            <Navbar user={auth.user} />
            <Head title={event.title} />
            <section className="max-w-4xl mx-auto px-4 pt-24 pb-12">
                <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
                <p className="text-gray-500 mb-2">
                    {formattedDate}
                    {event.location && ` • ${event.location}`}
                </p>

                <div className="mb-6">
                    {event.image ? (
                        <img
                            src={`/storage/${event.image}`}
                            alt={event.title}
                            className="w-full rounded-lg shadow"
                        />
                    ) : event.related_link ? (
                        <div className="aspect-w-16 aspect-h-9">
                            <iframe
                                src={event.related_link}
                                title="Video"
                                className="w-full h-96 rounded-lg"
                                allowFullScreen
                            />
                        </div>
                    ) : (
                        <img
                            src="https://placehold.co/800x400?text=No+Image"
                            alt="No Image"
                            className="w-full rounded-lg shadow"
                        />
                    )}
                </div>

                <div
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: event.description }}
                />
            </section>

            <Footer />
        </>
    );
}
