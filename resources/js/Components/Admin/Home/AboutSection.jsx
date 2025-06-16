import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import PrimaryButton from "@/Components/UI/PrimaryButton";
import ConfirmDialog from "@/Components/ConfirmDialog";
import AddAbout from "./AddAbout";
import EditAbout from "./EditAbout";

const AboutSection = () => {
    const [data, setData] = useState([]);
    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [selected, setSelected] = useState(null);
    const [showConfirm, setShowConfirm] = useState(false);

    const fetchData = async () => {
        try {
            const res = await axios.get("/api/home/about");
            setData(res.data);
        } catch (err) {
            toast.error("Gagal memuat data");
        }
    };

    const handleDelete = async () => {
        if (!selected?.id) return;
        try {
            await axios.delete(`/api/home/about/${selected.id}`);
            toast.success("Data berhasil dihapus");
            fetchData();
        } catch {
            toast.error("Gagal menghapus data");
        } finally {
            setShowConfirm(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">
                    Manajemen About Section
                </h2>
                <PrimaryButton onClick={() => setShowAdd(true)}>
                    Tambah
                </PrimaryButton>
            </div>

            <div className="grid gap-4">
                {data.map((item) => (
                    <div key={item.id} className="bg-white p-4 rounded shadow">
                        <h3 className="text-lg font-semibold">{item.title?.id}</h3>
                        <p
                            dangerouslySetInnerHTML={{
                                __html: item.content?.id || "",
                            }}
                            className="text-sm mt-2"
                        />
                        {item.image && (
                            <img
                                src={`/storage/${item.image}`}
                                className="h-32 mt-2 rounded"
                                alt="Gambar About"
                            />
                        )}
                        <div className="mt-4 flex gap-2">
                            <PrimaryButton
                                onClick={() => {
                                    setSelected(item);
                                    setShowEdit(true);
                                }}
                            >
                                Edit
                            </PrimaryButton>
                            <button
                                onClick={() => {
                                    setSelected(item);
                                    setShowConfirm(true);
                                }}
                                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                            >
                                Hapus
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <AddAbout
                show={showAdd}
                onClose={() => setShowAdd(false)}
                onSuccess={fetchData}
            />
            {selected && (
                <EditAbout
                    show={showEdit}
                    onClose={() => setShowEdit(false)}
                    onSuccess={fetchData}
                    about={selected}
                />
            )}
            <ConfirmDialog
                isOpen={showConfirm}
                onClose={() => setShowConfirm(false)}
                onConfirm={handleDelete}
                title="Konfirmasi Hapus"
                message={`Yakin ingin menghapus about "${selected?.title?.id}"?`}
            />
        </div>
    );
};

export default AboutSection;
