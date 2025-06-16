import { useEffect, useState } from "react";
import axios from "axios";
import { PhotoIcon } from "@heroicons/react/24/solid";
import toast from "react-hot-toast";
import TextInput from "@/Components/UI/TextInput";
import { Textarea } from "@heroui/react";

const HeroSection = () => {
    const [form, setForm] = useState({
        title_id: "",
        title_en: "",
        subtitle_id: "",
        subtitle_en: "",
        cta_text_id: "",
        cta_text_en: "",
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
                title_id: data.title ? JSON.parse(data.title).id : "",
                title_en: data.title ? JSON.parse(data.title).en : "",
                subtitle_id: data.subtitle ? JSON.parse(data.subtitle).id : "",
                subtitle_en: data.subtitle ? JSON.parse(data.subtitle).en : "",
                cta_text_id: data.cta_text ? JSON.parse(data.cta_text).id : "",
                cta_text_en: data.cta_text ? JSON.parse(data.cta_text).en : "",
                cta_link: data.cta_link || "",
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
        if (file) setPreview(URL.createObjectURL(file));
    };

    const handleRemoveImage = () => {
        setForm({ ...form, image: null });
        setPreview(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append("title_id", form.title_id);
        formData.append("title_en", form.title_en);
        formData.append("subtitle_id", form.subtitle_id);
        formData.append("subtitle_en", form.subtitle_en);
        formData.append("cta_text_id", form.cta_text_id);
        formData.append("cta_text_en", form.cta_text_en);
        formData.append("cta_link", form.cta_link);
        if (form.image) formData.append("image", form.image);
        formData.append("_method", "PUT");

        try {
            await axios.post("/api/home/hero", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            toast.success("Hero Section berhasil diperbarui");
        } catch (err) {
            console.error("Gagal menyimpan:", err);
            toast.error("Gagal menyimpan Hero Section");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-5xl bg-white shadow p-6 rounded-xl space-y-6"
        >
            <h2 className="text-2xl font-bold mb-4">Hero Section</h2>

            <div className="grid md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium">
                        Judul (Indonesia)
                    </label>
                    <TextInput
                        name="title_id"
                        value={form.title_id}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">
                        Title (English)
                    </label>
                    <TextInput
                        name="title_en"
                        value={form.title_en}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">
                        Subjudul (Indonesia)
                    </label>
                    <Textarea
                        name="subtitle_id"
                        value={form.subtitle_id}
                        onChange={handleChange}
                        rows={3}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">
                        Subtitle (English)
                    </label>
                    <Textarea
                        name="subtitle_en"
                        value={form.subtitle_en}
                        onChange={handleChange}
                        rows={3}
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium">
                    Gambar Background
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

            <div className="grid md:grid-cols-3 gap-4">
                <div>
                    <label className="block text-sm font-medium">
                        Teks Tombol (ID)
                    </label>
                    <TextInput
                        name="cta_text_id"
                        value={form.cta_text_id}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">
                        CTA Text (EN)
                    </label>
                    <TextInput
                        name="cta_text_en"
                        value={form.cta_text_en}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">
                        Link CTA
                    </label>
                    <TextInput
                        name="cta_link"
                        value={form.cta_link}
                        onChange={handleChange}
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
