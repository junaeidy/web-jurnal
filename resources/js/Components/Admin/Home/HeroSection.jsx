import { useEffect, useState } from "react";
import axios from "axios";
import { PhotoIcon } from "@heroicons/react/24/solid";
import toast from "react-hot-toast";
import TextInput from "@/Components/UI/TextInput";
import { Textarea } from "@heroui/react";

const HeroSection = () => {
    const [form, setForm] = useState({
        title: "",
        subtitle: "",
        cta_text: "",
        cta_link: "",
        image: null,
    });
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        axios.get("/api/home/hero").then((res) => {
            const data = res.data;
            setForm((prev) => ({
                ...prev,
                ...data,
                image: null,
            }));
            if (data.image) {
                setPreview(`/storage/${data.image}`);
            }
        });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setForm({ ...form, image: file });

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
        formData.append("title", form.title ?? "");
        formData.append("subtitle", form.subtitle ?? "");
        formData.append("cta_text", form.cta_text ?? "");
        formData.append("cta_link", form.cta_link ?? "");
        if (form.image) {
            formData.append("image", form.image);
        }
        formData.append("_method", "PUT");

        for (const [key, value] of formData.entries()) {
            console.log("FormData:", key, value);
        }

        try {
            await axios.post("/api/home/hero", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            toast.success("Hero Section berhasil diperbarui");
        } catch (err) {
            console.error("Gagal menyimpan Hero Section", err);
            if (err.response) {
                console.error("Response error data:", err.response.data);
            }
            toast.error("Gagal menyimpan Hero Section");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-4xl bg-white shadow p-6 rounded-xl space-y-6"
        >
            <h2 className="text-2xl font-bold mb-4">Hero Section</h2>

            <div>
                <label className="block text-sm font-medium">Judul Utama</label>
                <TextInput
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-md border-gray-300 shadow-sm"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium">
                    Subjudul / Deskripsi
                </label>
                <Textarea
                    name="subtitle"
                    value={form.subtitle}
                    onChange={handleChange}
                    rows={3}
                    className="mt-1 w-full rounded-md border-gray-300 shadow-sm"
                />
            </div>

            <div>
                <label className="block text-sm font-medium">
                    Gambar Background / Ilustrasi
                </label>
                <div className="mt-2 flex flex-col sm:flex-row sm:items-center gap-4">
                    {preview && (
                        <div className="relative inline-block">
                            <img
                                src={preview}
                                alt="Preview"
                                className="h-32 rounded-lg object-cover border"
                            />
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
                        <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </label>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium">
                        Teks Tombol CTA
                    </label>
                    <TextInput
                        type="text"
                        name="cta_text"
                        value={form.cta_text}
                        onChange={handleChange}
                        className="mt-1 w-full rounded-md border-gray-300 shadow-sm"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">
                        Link Tombol CTA
                    </label>
                    <TextInput
                        type="url"
                        name="cta_link"
                        value={form.cta_link}
                        onChange={handleChange}
                        placeholder="https://..."
                        className="mt-1 w-full rounded-md border-gray-300 shadow-sm"
                    />
                </div>
            </div>

            <div className="pt-4">
                <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                    {loading ? "Menyimpan..." : "Simpan Perubahan"}
                </button>
            </div>
        </form>
    );
};

export default HeroSection;
