import { useEffect, useState } from "react";
import axios from "axios";
import { Editor } from "@tinymce/tinymce-react";
import { PhotoIcon } from "@heroicons/react/24/solid";
import toast from "react-hot-toast";
import TextInput from "@/Components/UI/TextInput";

const AboutSection = () => {
    const [form, setForm] = useState({
        title: "",
        content: "",
        image: null,
        google_form_link: "",
        whatsapp_link: "",
    });
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        axios.get("/api/home/about").then((res) => {
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
        formData.append("title", form.title || "");
        formData.append("content", form.content || "");
        formData.append("google_form_link", form.google_form_link || "");
        formData.append("whatsapp_link", form.whatsapp_link || "");

        if (form.image instanceof File) {
            formData.append("image", form.image);
        }

        formData.append("_method", "PUT");

        try {
            await axios.post("/api/home/about", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            toast.success("About Section berhasil diperbarui");
        } catch (err) {
            console.error(err);
            toast.error("Gagal menyimpan About Section");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-4xl bg-white shadow p-6 rounded-xl space-y-6"
        >
            <h2 className="text-2xl font-bold mb-4">Section Tentang Kami</h2>

            <div>
                <label className="block text-sm font-medium">Judul</label>
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
                <label className="block text-sm font-medium mb-1">Konten</label>
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
                    onEditorChange={(content) => setForm({ ...form, content })}
                />
            </div>

            <div>
                <label className="block text-sm font-medium">
                    Gambar Pendukung
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium">
                        Link Google Form
                    </label>
                    <TextInput
                        type="url"
                        name="google_form_link"
                        value={form.google_form_link}
                        onChange={handleChange}
                        className="mt-1 w-full rounded-md border-gray-300 shadow-sm"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">
                        Link WhatsApp
                    </label>
                    <TextInput
                        type="url"
                        name="whatsapp_link"
                        value={form.whatsapp_link}
                        onChange={handleChange}
                        className="mt-1 w-full rounded-md border-gray-300 shadow-sm"
                    />
                </div>
            </div>

            <div className="pt-4">
                <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
                >
                    {loading ? "Menyimpan..." : "Simpan Perubahan"}
                </button>
            </div>
        </form>
    );
};

export default AboutSection;
