import { useState, useEffect } from "react";
import Modal from "@/Components/UI/Modal";
import TextInput from "@/Components/UI/TextInput";
import PrimaryButton from "@/Components/UI/PrimaryButton";
import SecondaryButton from "@/Components/UI/SecondaryButton";
import toast from "react-hot-toast";
import { Textarea } from "@heroui/react";

export default function AddJournal({ show, onClose, onSuccess }) {
    const [form, setForm] = useState({
        title: "",
        description: "",
        link: "",
        acceptance_rate: "",
        decision_days: "",
        impact_factor: "",
        is_active: true,
        cover: null,
        is_featured: false,
        authors: "",
    });

    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);

    const resetForm = () => {
        setForm({
            title: "",
            description: "",
            link: "",
            acceptance_rate: "",
            decision_days: "",
            impact_factor: "",
            is_active: true,
            cover: null,
            is_featured: false,
            authors: "",
        });
        setPreview(null);
    };

    useEffect(() => {
        if (show) resetForm();
    }, [show]);

    const handleChange = (e) => {
        if (!e || !e.target) return;

        const { name, value, type, checked, files } = e.target;

        if (!name) return;

        if (type === "file") {
            const file = files?.[0];
            if (file) {
                setForm((prev) => ({ ...prev, cover: file }));
                setPreview(URL.createObjectURL(file));
            }
        } else {
            setForm((prev) => ({
                ...prev,
                [name]: type === "checkbox" ? checked : value,
            }));
        }
    };

    const handleRemoveImage = () => {
        setForm((prev) => ({ ...prev, cover: null }));
        setPreview(null);
    };

    const validateForm = () => {
        if (!form.title.trim()) return "Judul jurnal wajib diisi";
        if (form.link && !/^https?:\/\/\S+$/i.test(form.link))
            return "Link tidak valid";
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const error = validateForm();
        if (error) {
            toast.error(error);
            return;
        }

        setLoading(true);
        const formData = new FormData();

        for (const key in form) {
            let value = form[key];
            if (value === "") value = null;

            if (typeof value === "boolean") {
                formData.append(key, value ? "1" : "0");
            } else if (value !== null) {
                formData.append(key, value);
            }
        }

        try {
            const res = await fetch("/api/journals", {
                method: "POST",
                body: formData,
            });

            if (res.ok) {
                const data = await res.json();
                toast.success("Jurnal berhasil ditambahkan");
                onSuccess(data);
                onClose();
            } else {
                toast.error("Gagal menambahkan jurnal");
            }
        } catch (err) {
            toast.error("Terjadi kesalahan saat mengirim data");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal show={show} onClose={onClose}>
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                    Tambah Jurnal
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <TextInput
                        label="Judul Jurnal"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        isRequired
                    />

                    <TextInput
                        label="Penulis"
                        name="authors"
                        value={form.authors}
                        onChange={handleChange}
                        isRequired
                    />

                    <TextInput
                        label="Link"
                        name="link"
                        value={form.link}
                        onChange={handleChange}
                        placeholder="https://contoh.com"
                        isRequired
                    />

                    <TextInput
                        label="Acceptance Rate (%)"
                        name="acceptance_rate"
                        type="number"
                        value={form.acceptance_rate}
                        onChange={handleChange}
                        isRequired
                    />

                    <TextInput
                        label="Decision Days"
                        name="decision_days"
                        type="number"
                        value={form.decision_days}
                        onChange={handleChange}
                        isRequired
                    />

                    <TextInput
                        label="Impact Factor"
                        name="impact_factor"
                        type="number"
                        step="0.01"
                        value={form.impact_factor}
                        onChange={handleChange}
                        isRequired
                    />

                    <div className="flex items-center mt-1">
                        <input
                            type="checkbox"
                            name="is_active"
                            checked={form.is_active}
                            onChange={handleChange}
                            className="mr-2"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-200">
                            Aktif
                        </span>
                    </div>

                    <div className="flex items-center mt-1">
                        <input
                            type="checkbox"
                            name="is_featured"
                            checked={form.is_featured}
                            onChange={handleChange}
                            className="mr-2"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-200">
                            Tandai sebagai jurnal unggulan
                        </span>
                    </div>

                    <div className="col-span-full">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                            Deskripsi
                        </label>
                        <Textarea
                            name="description"
                            value={form.description}
                            onChange={(e) =>
                                setForm((prev) => ({
                                    ...prev,
                                    description: e.target.value,
                                }))
                            }
                            rows={3}
                            required
                        />
                    </div>

                    <div className="col-span-full">
                        <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">
                            Sampul (Cover)
                        </label>
                        {preview ? (
                            <div className="relative w-[100px] h-[100px] max-w-xs">
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="rounded shadow"
                                />
                                <button
                                    type="button"
                                    onClick={handleRemoveImage}
                                    className="absolute top-1 right-1 px-2 py-1 bg-red-500 text-white text-xs rounded-full"
                                >
                                    ×
                                </button>
                            </div>
                        ) : (
                            <input
                                type="file"
                                name="cover"
                                accept="image/*"
                                onChange={handleChange}
                                className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                            />
                        )}
                    </div>
                </div>

                <div className="flex justify-end gap-2 pt-4">
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
