import { useState, useEffect } from "react";
import Modal from "@/Components/UI/Modal";
import TextInput from "@/Components/UI/TextInput";
import PrimaryButton from "@/Components/UI/PrimaryButton";
import SecondaryButton from "@/Components/UI/SecondaryButton";
import toast from "react-hot-toast";
import { Editor } from "@tinymce/tinymce-react";

export default function AddAbout({ show, onClose, onSuccess }) {
    const [form, setForm] = useState({
        title: "",
        content: "",
        image: null,
        video_url: "",
        extra_link: "",
    });

    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [tab, setTab] = useState("general");

    const resetForm = () => {
        setForm({
            title: "",
            content: "",
            image: null,
            video_url: "",
            extra_link: "",
        });
        setPreview(null);
        setTab("general");
    };

    useEffect(() => {
        if (show) resetForm();
    }, [show]);

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;

        if (type === "file") {
            const file = files?.[0];
            setForm((prev) => ({ ...prev, image: file }));
            if (file) setPreview(URL.createObjectURL(file));
        } else {
            setForm((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleRemoveImage = () => {
        setForm((prev) => ({ ...prev, image: null }));
        setPreview(null);
    };

    const validateForm = () => {
        if (!form.title.trim()) return "Judul wajib diisi";
        if (!form.content.trim()) return "Konten wajib diisi";
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
            if (value !== null) {
                formData.append(key, value);
            }
        }

        try {
            const res = await fetch("/api/abouts", {
                method: "POST",
                body: formData,
            });

            if (res.ok) {
                toast.success("Data About berhasil ditambahkan");
                const data = await res.json();
                onSuccess(data);
                onClose();
            } else {
                toast.error("Gagal menambahkan data About");
            }
        } catch (err) {
            console.error(err);
            toast.error("Terjadi kesalahan saat mengirim data");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal show={show} onClose={onClose}>
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                    Tambah Data About
                </h2>

                {/* Tab Selector */}
                <div className="flex gap-4 border-b pb-2">
                    <button
                        type="button"
                        className={`pb-1 border-b-2 ${
                            tab === "general"
                                ? "border-indigo-500 text-indigo-600 font-semibold"
                                : "border-transparent text-gray-500 hover:text-indigo-500"
                        }`}
                        onClick={() => setTab("general")}
                    >
                        Informasi Umum
                    </button>
                    <button
                        type="button"
                        className={`pb-1 border-b-2 ${
                            tab === "content"
                                ? "border-indigo-500 text-indigo-600 font-semibold"
                                : "border-transparent text-gray-500 hover:text-indigo-500"
                        }`}
                        onClick={() => setTab("content")}
                    >
                        Konten & Media
                    </button>
                </div>

                {/* Tab Content */}
                {tab === "general" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <TextInput
                            label="Judul"
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            isRequired
                        />
                        <TextInput
                            label="Video (Embed URL)"
                            name="video_url"
                            value={form.video_url}
                            onChange={handleChange}
                        />
                        <TextInput
                            label="Link atau Kontak Tambahan"
                            name="extra_link"
                            value={form.extra_link}
                            onChange={handleChange}
                        />
                    </div>
                )}

                {tab === "content" && (
                    <>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                                Konten Utama
                            </label>
                            <Editor
                                apiKey="pyjzhjk91dk9ks2jft1cs0wd0dw2alw1wy0x03qhtj1wrn2d"
                                value={form.content}
                                init={{
                                    height: 300,
                                    menubar: false,
                                    plugins: [
                                        "advlist",
                                        "autolink",
                                        "lists",
                                        "link",
                                        "image",
                                        "charmap",
                                        "preview",
                                        "anchor",
                                        "searchreplace",
                                        "visualblocks",
                                        "code",
                                        "fullscreen",
                                        "insertdatetime",
                                        "media",
                                        "table",
                                        "help",
                                        "wordcount",
                                    ],
                                    toolbar:
                                        "undo redo | formatselect | bold italic backcolor | \
                                        alignleft aligncenter alignright alignjustify | \
                                        bullist numlist outdent indent | removeformat | help",
                                }}
                                onEditorChange={(content) =>
                                    setForm((prev) => ({ ...prev, content }))
                                }
                            />
                        </div>

                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">
                                Gambar/Banner (opsional)
                            </label>
                            {preview ? (
                                <div className="relative w-[150px] h-[100px] max-w-xs">
                                    <img
                                        src={preview}
                                        alt="Preview"
                                        className="rounded shadow object-cover w-full h-full"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleRemoveImage}
                                        className="absolute top-1 right-1 px-2 py-1 bg-red-500 text-white text-xs rounded-full hover:bg-red-600"
                                    >
                                        ×
                                    </button>
                                </div>
                            ) : (
                                <input
                                    type="file"
                                    name="image"
                                    accept="image/*"
                                    onChange={handleChange}
                                    className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                                />
                            )}
                        </div>
                    </>
                )}

                <div className="flex justify-between items-center pt-6">
                    <div className="flex gap-2">
                        <SecondaryButton
                            type="button"
                            onClick={onClose}
                            disabled={loading}
                        >
                            Batal
                        </SecondaryButton>
                        <PrimaryButton type="submit" disabled={loading}>
                            {loading ? "Menyimpan..." : "Simpan"}
                        </PrimaryButton>
                    </div>

                    <div className="flex gap-2">
                        {tab === "content" && (
                            <button
                                type="button"
                                className="text-sm text-gray-500 hover:text-indigo-600"
                                onClick={() => setTab("general")}
                            >
                                ← Kembali
                            </button>
                        )}
                        {tab === "general" && (
                            <button
                                type="button"
                                className="text-sm text-indigo-600 font-medium hover:underline"
                                onClick={() => setTab("content")}
                            >
                                Lanjut →
                            </button>
                        )}
                    </div>
                </div>
            </form>
        </Modal>
    );
}
