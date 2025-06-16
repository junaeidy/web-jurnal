import React, { useEffect, useState } from "react";
import Modal from "@/Components/UI/Modal";
import TextInput from "@/Components/UI/TextInput";
import PrimaryButton from "@/Components/UI/PrimaryButton";
import SecondaryButton from "@/Components/UI/SecondaryButton";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { Editor } from "@tinymce/tinymce-react";
import toast from "react-hot-toast";
import axios from "axios";

export default function EditAbout({ show, onClose, onSuccess, about }) {
    const [form, setForm] = useState({
        title: "",
        content: "",
        image: null,
        google_form_link: "",
        whatsapp_link: "",
    });
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("info");

    useEffect(() => {
        if (show && about) {
            setForm({
                title: about.title || "",
                content: about.content || "",
                google_form_link: about.google_form_link || "",
                whatsapp_link: about.whatsapp_link || "",
                image: null,
            });
            setPreview(about.image ? `/storage/${about.image}` : null);
        }
    }, [show, about]);

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
        if (!about?.id) return;

        setLoading(true);
        const formData = new FormData();
        Object.entries(form).forEach(([key, val]) => {
            if (val) formData.append(key, val);
        });
        formData.append("_method", "PUT");

        try {
            await axios.post(`/api/home/about/${about.id}`, formData);
            toast.success("About berhasil diperbarui");
            onSuccess();
            onClose();
        } catch (err) {
            toast.error("Gagal memperbarui data");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal show={show} onClose={onClose}>
            <div className="px-4 pt-3">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-5">
                    Edit Kegiatan
                </h2>
                <div className="flex gap-4 mb-4 border-b">
                    <button
                        type="button"
                        onClick={() => setActiveTab("info")}
                        className={`pb-2 px-1 border-b-2 text-sm ${
                            activeTab === "info"
                                ? "border-blue-600 font-semibold"
                                : "border-transparent text-gray-500 hover:text-gray-700"
                        }`}
                    >
                        Informasi Umum
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveTab("media")}
                        className={`pb-2 px-1 border-b-2 text-sm ${
                            activeTab === "media"
                                ? "border-blue-600 font-semibold"
                                : "border-transparent text-gray-500 hover:text-gray-700"
                        }`}
                    >
                        Konten & Media
                    </button>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 px-4 py-2">
                {activeTab === "info" && (
                    <>
                        <TextInput
                            label="Judul"
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            required
                        />
                        <TextInput
                            label="Link Google Form"
                            name="google_form_link"
                            value={form.google_form_link}
                            onChange={handleChange}
                        />
                        <TextInput
                            label="Link WhatsApp"
                            name="whatsapp_link"
                            value={form.whatsapp_link}
                            onChange={handleChange}
                        />
                    </>
                )}

                {activeTab === "media" && (
                    <>
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Konten
                            </label>
                            <Editor
                                apiKey="wh2upbh3nrh0erdyag8dxm7iktpct0smfh1oj0vxdfydpohv"
                                value={form.content}
                                init={{
                                    height: 300,
                                    menubar: false,
                                    plugins: "link lists image preview",
                                    toolbar:
                                        "undo redo | bold italic underline | bullist numlist | link | preview",
                                }}
                                onEditorChange={(content) =>
                                    setForm((prev) => ({ ...prev, content }))
                                }
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium">
                                Gambar
                            </label>
                            <div className="mt-2 flex gap-4 items-start">
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
                                            className="absolute top-0 right-0 bg-red-500 text-white px-1 text-xs rounded"
                                        >
                                            x
                                        </button>
                                    </div>
                                )}
                                <label className="cursor-pointer flex items-center gap-2">
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

                <div className="flex justify-end gap-2 border-t pt-4 mt-4">
                    <SecondaryButton onClick={onClose}>Batal</SecondaryButton>
                    <PrimaryButton type="submit" disabled={loading}>
                        {loading ? "Menyimpan..." : "Simpan Perubahan"}
                    </PrimaryButton>
                </div>
            </form>
        </Modal>
    );
}
