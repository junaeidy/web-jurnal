import React, { useState, useEffect } from "react";
import Modal from "@/Components/UI/Modal";
import TextInput from "@/Components/UI/TextInput";
import PrimaryButton from "@/Components/UI/PrimaryButton";
import SecondaryButton from "@/Components/UI/SecondaryButton";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { Editor } from "@tinymce/tinymce-react";
import toast from "react-hot-toast";
import axios from "axios";

export default function AddAbout({ show, onClose, onSuccess }) {
    const [activeTab, setActiveTab] = useState("informasi");
    const [activeLangTab, setActiveLangTab] = useState("id");

    const [form, setForm] = useState({
        title_id: "",
        title_en: "",
        content_id: "",
        content_en: "",
        image: null,
        google_form_link: "",
        whatsapp_link: "",
    });

    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!show) {
            setForm({
                title_id: "",
                title_en: "",
                content_id: "",
                content_en: "",
                image: null,
                google_form_link: "",
                whatsapp_link: "",
            });
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
        if (file) {
            setPreview(URL.createObjectURL(file));
        }
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
            if (val) formData.append(key, val);
        });

        try {
            await axios.post("/api/home/about", formData);
            toast.success("About berhasil ditambahkan");
            onSuccess();
            onClose();
        } catch (err) {
            toast.error("Gagal menambahkan data");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal show={show} onClose={onClose}>
            <div className="border-b px-6 pt-4">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-5">
                    Tambah About Section
                </h2>
                <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                    <button
                        className={`pb-2 text-sm font-medium ${
                            activeTab === "informasi"
                                ? "border-b-2 border-blue-600 text-blue-600"
                                : "text-gray-500 hover:text-gray-700"
                        }`}
                        onClick={() => setActiveTab("informasi")}
                    >
                        Informasi Umum
                    </button>
                    <button
                        className={`pb-2 text-sm font-medium ${
                            activeTab === "konten"
                                ? "border-b-2 border-blue-600 text-blue-600"
                                : "text-gray-500 hover:text-gray-700"
                        }`}
                        onClick={() => setActiveTab("konten")}
                    >
                        Konten & Media
                    </button>
                </nav>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 px-6 py-4">
                {activeTab === "informasi" && (
                    <>
                        <div className="flex gap-4 border-b pb-2">
                            <button
                                type="button"
                                className={`text-sm font-semibold ${
                                    activeLangTab === "id"
                                        ? "text-blue-600 border-b-2 border-blue-600"
                                        : "text-gray-500"
                                }`}
                                onClick={() => setActiveLangTab("id")}
                            >
                                Bahasa Indonesia
                            </button>
                            <button
                                type="button"
                                className={`text-sm font-semibold ${
                                    activeLangTab === "en"
                                        ? "text-blue-600 border-b-2 border-blue-600"
                                        : "text-gray-500"
                                }`}
                                onClick={() => setActiveLangTab("en")}
                            >
                                English
                            </button>
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
                            label="Link Google Form (opsional)"
                            name="google_form_link"
                            value={form.google_form_link}
                            onChange={handleChange}
                        />
                        <TextInput
                            label="Link WhatsApp (opsional)"
                            name="whatsapp_link"
                            value={form.whatsapp_link}
                            onChange={handleChange}
                        />
                    </>
                )}

                {activeTab === "konten" && (
                    <>
                        <div className="flex gap-4 border-b pb-2">
                            <button
                                type="button"
                                className={`text-sm font-semibold ${
                                    activeLangTab === "id"
                                        ? "text-blue-600 border-b-2 border-blue-600"
                                        : "text-gray-500"
                                }`}
                                onClick={() => setActiveLangTab("id")}
                            >
                                Bahasa Indonesia
                            </button>
                            <button
                                type="button"
                                className={`text-sm font-semibold ${
                                    activeLangTab === "en"
                                        ? "text-blue-600 border-b-2 border-blue-600"
                                        : "text-gray-500"
                                }`}
                                onClick={() => setActiveLangTab("en")}
                            >
                                English
                            </button>
                        </div>

                        {activeLangTab === "id" && (
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Konten (ID)
                                </label>
                                <div className="border rounded-md shadow-sm overflow-hidden">
                                    <Editor
                                        apiKey="pyjzhjk91dk9ks2jft1cs0wd0dw2alw1wy0x03qhtj1wrn2d"
                                        value={form.content_id}
                                        init={{
                                            height: 300,
                                            menubar: false,
                                            plugins: "link lists image preview",
                                            toolbar:
                                                "undo redo | bold italic underline | bullist numlist | link | preview",
                                        }}
                                        onEditorChange={(content) =>
                                            setForm((prev) => ({
                                                ...prev,
                                                content_id: content,
                                            }))
                                        }
                                    />
                                </div>
                            </div>
                        )}

                        {activeLangTab === "en" && (
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Content (EN)
                                </label>
                                <div className="border rounded-md shadow-sm overflow-hidden">
                                    <Editor
                                        apiKey="pyjzhjk91dk9ks2jft1cs0wd0dw2alw1wy0x03qhtj1wrn2d"
                                        value={form.content_en}
                                        init={{
                                            height: 300,
                                            menubar: false,
                                            plugins: "link lists image preview",
                                            toolbar:
                                                "undo redo | bold italic underline | bullist numlist | link | preview",
                                        }}
                                        onEditorChange={(content) =>
                                            setForm((prev) => ({
                                                ...prev,
                                                content_en: content,
                                            }))
                                        }
                                    />
                                </div>
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Gambar
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
                    <SecondaryButton onClick={onClose}>Batal</SecondaryButton>
                    <PrimaryButton type="submit" disabled={loading}>
                        {loading ? "Menyimpan..." : "Simpan"}
                    </PrimaryButton>
                </div>
            </form>
        </Modal>
    );
}
