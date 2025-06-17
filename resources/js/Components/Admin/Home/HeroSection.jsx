import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AddHero from "./AddHero";
import EditHero from "./EditHero";
import ConfirmDialog from "@/Components/ConfirmDialog";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";

export default function HeroSection() {
    const [heroes, setHeroes] = useState([]);
    const [selectedHero, setSelectedHero] = useState(null);
    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(null);

    const fetchHeroes = async () => {
        try {
            const res = await axios.get("/api/home/hero");
            setHeroes(res.data);
        } catch (err) {
            toast.error("Gagal mengambil data");
        }
    };

    useEffect(() => {
        fetchHeroes();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/home/hero/${id}`);
            toast.success("Berhasil dihapus");
            fetchHeroes();
        } catch {
            toast.error("Gagal menghapus data");
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Hero Section</h2>
                <button
                    className="px-4 py-2 bg-blue-600 text-white rounded"
                    onClick={() => setShowAdd(true)}
                >
                    Tambah
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {heroes.map((hero) => (
                    <div key={hero.id} className="bg-white shadow rounded p-4 relative">
                        {hero.image && (
                            <img
                                src={`/storage/${hero.image}`}
                                className="h-40 w-full object-cover rounded mb-3"
                            />
                        )}
                        <h3 className="text-xl font-semibold">
                            {hero.title?.id || "-"}
                        </h3>
                        <p className="text-gray-600 text-sm">{hero.subtitle?.id}</p>
                        <div className="mt-2 flex gap-2">
                            <button
                                onClick={() => {
                                    setSelectedHero(hero);
                                    setShowEdit(true);
                                }}
                                className="text-blue-600 hover:underline flex items-center gap-1"
                            >
                                <PencilIcon className="w-4 h-4" />
                                Edit
                            </button>
                            <button
                                onClick={() => setConfirmDelete(hero)}
                                className="text-red-600 hover:underline flex items-center gap-1"
                            >
                                <TrashIcon className="w-4 h-4" />
                                Hapus
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <AddHero show={showAdd} onClose={() => setShowAdd(false)} onSuccess={fetchHeroes} />
            <EditHero hero={selectedHero} show={showEdit} onClose={() => setShowEdit(false)} onSuccess={fetchHeroes} />
            <ConfirmDialog
    isOpen={confirmDelete !== null}
    title="Hapus Hero Section?"
    message="Data akan dihapus permanen dan tidak bisa dikembalikan."
    onClose={() => setConfirmDelete(null)}
    onConfirm={() => {
        if (confirmDelete) {
            handleDelete(confirmDelete.id);
            setConfirmDelete(null);
        }
    }}
/>

        </div>
    );
}
