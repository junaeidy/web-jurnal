import { useEffect, useState } from "react";
import Modal from "@/Components/UI/Modal";
import TextInput from "@/Components/UI/TextInput";
import PrimaryButton from "@/Components/UI/PrimaryButton";
import SecondaryButton from "@/Components/UI/SecondaryButton";
import { Textarea } from "@heroui/react";
import { PhotoIcon } from "@heroicons/react/24/solid";
import toast from "react-hot-toast";
import axios from "axios";

export default function AddHero({ show, onClose, onSuccess }) {
    const initialForm = {
        title_id: "",
        title_en: "",
        subtitle_id: "",
        subtitle_en: "",
        cta_text_id: "",
        cta_text_en: "",
        cta_link: "",
        image: null,
    };

    const [form, setForm] = useState(initialForm);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);

    // Reset form saat modal dibuka
    useEffect(() => {
        if (show) {
            setForm(initialForm);
            setPreview(null);
        }
    }, [show]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setForm((prev) => ({ ...prev, image: file }));
        if (file) setPreview(URL.createObjectURL(file));
    };

    const handleRemoveImage = () => {
        setForm((prev) => ({ ...prev, image: null }));
        setPreview(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        Object.entries(form).forEach(([key, val]) => {
            if (val !== null) formData.append(key, val);
        });

        try {
            await axios.post("/api/home/hero", formData);
            toast.success("Hero section berhasil ditambahkan");
            onClose();
            onSuccess();
        } catch (err) {
            console.error(err);
            toast.error("Gagal menambahkan hero");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal show={show} maxWidth="2xl" onClose={onClose}>
            <form onSubmit={handleSubmit} className="space-y-6 p-6">
                <h2 className="text-xl font-semibold">Tambah Hero</h2>

                <div className="grid md:grid-cols-2 gap-4">
                    <TextInput label="Judul (ID)" name="title_id" value={form.title_id} onChange={handleChange} />
                    <TextInput label="Title (EN)" name="title_en" value={form.title_en} onChange={handleChange} />
                    <Textarea label="Subjudul (ID)" name="subtitle_id" value={form.subtitle_id} onChange={handleChange} rows={3} />
                    <Textarea label="Subtitle (EN)" name="subtitle_en" value={form.subtitle_en} onChange={handleChange} rows={3} />
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                    <TextInput label="Teks Tombol (ID)" name="cta_text_id" value={form.cta_text_id} onChange={handleChange} />
                    <TextInput label="CTA Text (EN)" name="cta_text_en" value={form.cta_text_en} onChange={handleChange} />
                    <TextInput label="Link CTA" name="cta_link" value={form.cta_link} onChange={handleChange} />
                </div>

                <div>
                    <label className="block text-sm font-medium">Gambar Background</label>
                    <div className="mt-2 flex flex-col sm:flex-row sm:items-center gap-4">
                        {preview && (
                            <div className="relative inline-block">
                                <img src={preview} alt="Preview" className="h-32 rounded-lg object-cover border" />
                                <button
                                    type="button"
                                    onClick={handleRemoveImage}
                                    className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1 py-0.5 rounded-bl-md hover:bg-red-600"
                                >
                                    X
                                </button>
                            </div>
                        )}
                        <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-md border border-gray-300">
                            <PhotoIcon className="w-5 h-5" />
                            <span>Pilih Gambar</span>
                            <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                        </label>
                    </div>
                </div>

                <div className="flex justify-end gap-2">
                    <SecondaryButton type="button" onClick={onClose}>
                        Batal
                    </SecondaryButton>
                    <PrimaryButton type="submit" disabled={loading}>
                        {loading ? "Menyimpan..." : "Simpan"}
                    </PrimaryButton>
                </div>
            </form>
        </Modal>
    );
}
