import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const JournalSection = () => {
    const [journals, setJournals] = useState([]);
    const [featuredIds, setFeaturedIds] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        axios.get("/api/home/active-journals").then((res) => setJournals(res.data));
        axios.get("/api/home/featured-journals").then((res) =>
            setFeaturedIds(res.data.map((j) => j.id))
        );
    }, []);

    const handleToggle = (journalId) => {
        setFeaturedIds((prev) =>
            prev.includes(journalId)
                ? prev.filter((id) => id !== journalId)
                : [...prev, journalId]
        );
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            await axios.put("/api/home/featured-journals", {
                journal_ids: featuredIds,
            });
            toast.success("Jurnal unggulan berhasil diperbarui");
        } catch (err) {
            toast.error("Gagal memperbarui jurnal unggulan");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="mt-10 bg-white shadow p-6 rounded-xl max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Kelola Jurnal Unggulan</h2>

            {journals.length === 0 ? (
                <p className="text-gray-500">Tidak ada jurnal aktif tersedia.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
                    {journals.map((journal) => (
                        <div
                            key={journal.id}
                            className="border rounded-xl shadow-sm p-3 flex flex-col items-center text-center relative"
                        >
                            <img
                                src={`/storage/${journal.cover}`}
                                alt={journal.name}
                                className="w-full h-40 object-cover rounded-md mb-3"
                            />
                            <h3 className="text-sm font-semibold">{journal.name}</h3>
                            <label className="mt-2 flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={featuredIds.includes(journal.id)}
                                    onChange={() => handleToggle(journal.id)}
                                />
                                <span className="text-sm">Jadikan unggulan</span>
                            </label>
                        </div>
                    ))}
                </div>
            )}

            <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-5 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
            >
                {loading ? "Menyimpan..." : "Simpan Perubahan"}
            </button>
        </section>
    );
};

export default JournalSection;
