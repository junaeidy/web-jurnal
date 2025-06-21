import { useEffect, useState } from "react";
import Modal from "@/Components/UI/Modal";
import TextInput from "@/Components/UI/TextInput";
import PrimaryButton from "@/Components/UI/PrimaryButton";
import SecondaryButton from "@/Components/UI/SecondaryButton";
import toast from "react-hot-toast";
import { Select, SelectItem } from "@heroui/react";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";

export default function EditJournal({ show, journalId, onClose, onSuccess }) {
    const [activeTab, setActiveTab] = useState("informasi");
    const [activeLangTab, setActiveLangTab] = useState("id");
    const [form, setForm] = useState({
        title_id: "",
        title_en: "",
        description_id: "",
        description_en: "",
        link: "",
        acceptance_rate: "",
        decision_days: "",
        impact_factor: "",
        is_active: true,
        is_featured: false,
        category_id: "",
        published_year: "",
        cover: null,
    });
    const [preview, setPreview] = useState(null);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);

    useEffect(() => {
        if (show && journalId) {
            fetchCategories();
            fetchJournalData(journalId);
        }
    }, [show, journalId]);

    const fetchCategories = async () => {
        try {
            const res = await axios.get("/api/categories");
            setCategories(res.data);
        } catch {
            toast.error("Gagal memuat kategori");
        }
    };

    const fetchJournalData = async (id) => {
        try {
            setInitialLoading(true);
            const res = await axios.get(`/api/journals/${id}`);
            const journal = res.data;
            setForm({
                title_id: journal.title?.id || "",
                title_en: journal.title?.en || "",
                description_id: journal.description?.id || "",
                description_en: journal.description?.en || "",
                link: journal.link || "",
                acceptance_rate: journal.acceptance_rate || "",
                decision_days: journal.decision_days || "",
                impact_factor: journal.impact_factor || "",
                is_active: journal.is_active ?? true,
                is_featured: journal.is_featured ?? false,
                category_id:
                    journal.category_id?.map((id) => id.toString()) || [],
                published_year: journal.published_year || "",
                cover: null,
            });
            setPreview(journal.cover ? `/${journal.cover}` : null);
        } catch {
            toast.error("Gagal memuat data jurnal");
        } finally {
            setInitialLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setForm((prev) => ({ ...prev, cover: file }));
        if (file) setPreview(URL.createObjectURL(file));
    };

    const handleRemoveImage = () => {
        setForm((prev) => ({ ...prev, cover: null }));
        setPreview(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        Object.entries(form).forEach(([key, val]) => {
            if (val !== "" && val !== null) {
                if (key === "category_id" && Array.isArray(val)) {
                    val.forEach((v) => {
                        formData.append("category_id[]", v);
                    });
                } else {
                    formData.append(
                        key,
                        typeof val === "boolean" ? (val ? "1" : "0") : val
                    );
                }
            }
        });

        try {
            await axios.post(
                `/api/journals/${journalId}?_method=PUT`,
                formData
            );
            toast.success("Jurnal berhasil diperbarui");
            onSuccess();
            onClose();
        } catch {
            toast.error("Gagal mengedit jurnal");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal show={show} onClose={onClose} maxWidth="3xl">
            {initialLoading ? (
                <div className="p-6 text-center text-gray-500">
                    Memuat data jurnal...
                </div>
            ) : (
                <>
                    <div className="border-b px-6 pt-4">
                        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-5">
                            Edit Jurnal
                        </h2>
                        <nav
                            className="-mb-px flex space-x-6"
                            aria-label="Tabs"
                        >
                            {["informasi", "konten"].map((tab) => (
                                <button
                                    key={tab}
                                    className={`pb-2 text-sm font-medium ${
                                        activeTab === tab
                                            ? "border-b-2 border-blue-600 text-blue-600"
                                            : "text-gray-500 hover:text-gray-700"
                                    }`}
                                    onClick={() => setActiveTab(tab)}
                                >
                                    {tab === "informasi"
                                        ? "Informasi Umum"
                                        : "Konten & Media"}
                                </button>
                            ))}
                        </nav>
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-6 px-6 py-4"
                    >
                        {activeTab === "informasi" && (
                            <>
                                <div className="flex gap-4 border-b pb-2">
                                    {["id", "en"].map((lang) => (
                                        <button
                                            type="button"
                                            key={lang}
                                            className={`text-sm font-semibold ${
                                                activeLangTab === lang
                                                    ? "text-blue-600 border-b-2 border-blue-600"
                                                    : "text-gray-500"
                                            }`}
                                            onClick={() =>
                                                setActiveLangTab(lang)
                                            }
                                        >
                                            {lang === "id"
                                                ? "Bahasa Indonesia"
                                                : "English"}
                                        </button>
                                    ))}
                                </div>

                                {activeLangTab === "id" && (
                                    <TextInput
                                        label="Judul (ID)"
                                        name="title_id"
                                        value={form.title_id}
                                        onChange={handleChange}
                                        isRequired
                                    />
                                )}
                                {activeLangTab === "en" && (
                                    <TextInput
                                        label="Title (EN)"
                                        name="title_en"
                                        value={form.title_en}
                                        onChange={handleChange}
                                        isRequired
                                    />
                                )}

                                <TextInput
                                    label="Link Jurnal"
                                    name="link"
                                    value={form.link}
                                    onChange={handleChange}
                                    isRequired
                                />

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <TextInput
                                        label="Acceptance Rate (%)"
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
                                    />
                                </div>

                                <Select
                                    label="Kategori"
                                    selectionMode="multiple"
                                    selectedKeys={form.category_id}
                                    onSelectionChange={(selected) => {
                                        const values = Array.from(selected);
                                        setForm((prev) => ({
                                            ...prev,
                                            category_id: values,
                                        }));
                                    }}
                                >
                                    {categories.map((cat) => (
                                        <SelectItem key={cat.id} value={cat.id}>
                                            {cat.name}
                                        </SelectItem>
                                    ))}
                                </Select>

                                <div className="flex items-center gap-6 mt-2">
                                    <label className="flex gap-2 items-center text-sm">
                                        <input
                                            type="checkbox"
                                            name="is_active"
                                            checked={form.is_active}
                                            onChange={handleChange}
                                        />
                                        Published
                                    </label>
                                    <label className="flex gap-2 items-center text-sm">
                                        <input
                                            type="checkbox"
                                            name="is_featured"
                                            checked={form.is_featured}
                                            onChange={handleChange}
                                        />
                                        Tampilkan sebagai unggulan
                                    </label>
                                </div>
                            </>
                        )}

                        {activeTab === "konten" && (
                            <>
                                <div className="flex gap-4 border-b pb-2">
                                    {["id", "en"].map((lang) => (
                                        <button
                                            type="button"
                                            key={lang}
                                            className={`text-sm font-semibold ${
                                                activeLangTab === lang
                                                    ? "text-blue-600 border-b-2 border-blue-600"
                                                    : "text-gray-500"
                                            }`}
                                            onClick={() =>
                                                setActiveLangTab(lang)
                                            }
                                        >
                                            {lang === "id"
                                                ? "Bahasa Indonesia"
                                                : "English"}
                                        </button>
                                    ))}
                                </div>

                                {activeLangTab === "id" && (
                                    <div>
                                        <label className="block text-sm font-medium mb-2">
                                            Deskripsi (ID)
                                        </label>
                                        <Editor
                                            apiKey="pyjzhjk91dk9ks2jft1cs0wd0dw2alw1wy0x03qhtj1wrn2d"
                                            value={form.description_id}
                                            init={{
                                                height: 250,
                                                menubar: false,
                                                plugins:
                                                    "link lists image preview",
                                                toolbar:
                                                    "undo redo | bold italic underline | bullist numlist | link | preview",
                                            }}
                                            onEditorChange={(content) =>
                                                setForm((prev) => ({
                                                    ...prev,
                                                    description_id: content,
                                                }))
                                            }
                                        />
                                    </div>
                                )}
                                {activeLangTab === "en" && (
                                    <div>
                                        <label className="block text-sm font-medium mb-2">
                                            Description (EN)
                                        </label>
                                        <Editor
                                            apiKey="pyjzhjk91dk9ks2jft1cs0wd0dw2alw1wy0x03qhtj1wrn2d"
                                            value={form.description_en}
                                            init={{
                                                height: 250,
                                                menubar: false,
                                                plugins:
                                                    "link lists image preview",
                                                toolbar:
                                                    "undo redo | bold italic underline | bullist numlist | link | preview",
                                            }}
                                            onEditorChange={(content) =>
                                                setForm((prev) => ({
                                                    ...prev,
                                                    description_en: content,
                                                }))
                                            }
                                        />
                                    </div>
                                )}

                                <div>
                                    <label className="block text-sm font-medium mb-1">
                                        Sampul (Cover)
                                    </label>
                                    <div className="mt-2 flex gap-4 items-center">
                                        {preview && (
                                            <div className="relative">
                                                <img
                                                    src={preview}
                                                    alt="Preview"
                                                    className="h-24 rounded border"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={handleRemoveImage}
                                                    className="absolute top-0 right-0 bg-red-500 text-white px-1 text-xs rounded-bl"
                                                >
                                                    x
                                                </button>
                                            </div>
                                        )}
                                        <label className="cursor-pointer flex items-center gap-2 text-sm px-3 py-2 border border-gray-300 rounded-md bg-gray-50 hover:bg-gray-100">
                                            <PhotoIcon className="w-5 h-5" />
                                            <span>Pilih Gambar</span>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={handleImageChange}
                                            />
                                        </label>
                                    </div>
                                </div>
                            </>
                        )}

                        <div className="flex justify-end gap-3 border-t pt-4 mt-6">
                            <SecondaryButton onClick={onClose}>
                                Batal
                            </SecondaryButton>
                            <PrimaryButton type="submit" disabled={loading}>
                                {loading ? "Menyimpan..." : "Simpan Perubahan"}
                            </PrimaryButton>
                        </div>
                    </form>
                </>
            )}
        </Modal>
    );
}
