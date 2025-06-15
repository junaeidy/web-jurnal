import { useState, useEffect } from "react";
import Modal from "@/Components/UI/Modal";
import TextInput from "@/Components/UI/TextInput";
import PrimaryButton from "@/Components/UI/PrimaryButton";
import SecondaryButton from "@/Components/UI/SecondaryButton";
import toast from "react-hot-toast";
import { Textarea, Select, SelectItem } from "@heroui/react";

export default function EditJournal({ show, onClose, onSuccess, journalId }) {
    const [categories, setCategories] = useState([]);
    const [form, setForm] = useState({
        title: "",
        description: "",
        link: "",
        acceptance_rate: "",
        decision_days: "",
        impact_factor: "",
        is_active: true,
        is_featured: false,
        cover: null,
        category_id: "",
        published_year: "",
    });

    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (show) {
            fetch("/api/categories")
                .then((res) => res.json())
                .then((data) => setCategories(data));
        }

        if (show && journalId) {
            setLoading(true);
            fetch(`/api/journals/${journalId}`)
                .then((res) => res.json())
                .then((data) => {
                    setForm({
                        ...data,
                        is_active: !!data.is_active,
                        is_featured: !!data.is_featured,
                        cover: null,
                        category_id: data.category_id ?? "",
                        published_year: data.published_year ?? "",
                    });
                    setPreview(data.cover ? `/${data.cover}` : null);
                })
                .catch(() => toast.error("Gagal memuat data jurnal"))
                .finally(() => setLoading(false));
        }
    }, [show, journalId]);

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();

        for (const key in form) {
            let value = form[key];
            if (value === "") value = null;
            if (typeof value === "boolean") value = value ? 1 : 0;
            if (value !== null) formData.append(key, value);
        }

        try {
            const res = await fetch(`/api/journals/${journalId}`, {
                method: "POST",
                body: (() => {
                    formData.append("_method", "PUT");
                    return formData;
                })(),
            });

            if (res.ok) {
                const data = await res.json();
                toast.success("Jurnal berhasil diperbarui");
                onSuccess(data);
                onClose();
            } else {
                toast.error("Gagal memperbarui jurnal");
            }
        } catch (err) {
            console.error(err);
            toast.error("Terjadi kesalahan");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal show={show} onClose={onClose}>
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                    Edit Jurnal
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
                        label="Link"
                        name="link"
                        value={form.link}
                        onChange={handleChange}
                        placeholder="https://..."
                        isRequired
                    />
                    <TextInput
                        label="Acceptance Rate"
                        name="acceptance_rate"
                        type="number"
                        value={form.acceptance_rate}
                        onChange={handleChange}
                    />
                    <TextInput
                        label="Decision Days"
                        name="decision_days"
                        type="number"
                        value={form.decision_days}
                        onChange={handleChange}
                    />
                    <TextInput
                        label="Impact Factor"
                        name="impact_factor"
                        type="number"
                        step="0.01"
                        value={form.impact_factor}
                        onChange={handleChange}
                    />
                    <TextInput
                        label="Tahun Terbit"
                        name="published_year"
                        type="number"
                        value={form.published_year}
                        onChange={handleChange}
                        placeholder="Misal: 2024"
                        isRequired
                    />
                    <Select
                        label="Pilih Kategori"
                        selectedKeys={
                            form.category_id ? [String(form.category_id)] : []
                        }
                        onSelectionChange={(key) =>
                            setForm((prev) => ({
                                ...prev,
                                category_id: Array.from(key)[0],
                            }))
                        }
                        className="max-w-xs"
                        isRequired
                    >
                        {categories.map((cat) => (
                            <SelectItem key={cat.id} value={cat.id}>
                                {cat.name}
                            </SelectItem>
                        ))}
                    </Select>

                    {/* Checkbox is_active */}
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

                    {/* Checkbox is_featured */}
                    <div className="flex items-center mt-1">
                        <input
                            type="checkbox"
                            name="is_featured"
                            checked={form.is_featured}
                            onChange={handleChange}
                            className="mr-2"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-200">
                            Unggulan
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
                            maxLength={255}
                            isRequired
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
                        {loading ? "Menyimpan..." : "Simpan Perubahan"}
                    </PrimaryButton>
                </div>
            </form>
        </Modal>
    );
}
