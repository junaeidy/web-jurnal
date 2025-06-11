import { useState, useEffect } from "react";
import Modal from "@/Components/UI/Modal"; // Import Modal kustom kamu
import TextInput from "@/Components/UI/TextInput"; // Import TextInput kustom kamu
import PrimaryButton from "@/Components/UI/PrimaryButton"; // Import PrimaryButton kustom kamu
import SecondaryButton from "@/Components/UI/SecondaryButton"; // Import SecondaryButton kustom kamu
import toast from "react-hot-toast";
import { Textarea } from "@heroui/react"; // Textarea masih dari heroui/react

export default function AddTeamMember({ show, onClose, onSuccess }) {
    const [form, setForm] = useState({
        name: "",
        position: "",
        photo: null,
        description: "",
        email: "",
        contact: "",
        is_active: true,
    });

    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false); // Menggunakan 'loading' sebagai pengganti 'submitting'

    const resetForm = () => {
        setForm({
            name: "",
            position: "",
            photo: null,
            description: "",
            email: "",
            contact: "",
            is_active: true,
        });
        setPreview(null);
    };

    // Reset form saat modal dibuka
    useEffect(() => {
        if (show) resetForm();
    }, [show]);

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;

        if (type === "file") {
            const file = files?.[0]; // Menggunakan optional chaining
            setForm((prev) => ({ ...prev, photo: file }));
            if (file) setPreview(URL.createObjectURL(file));
        } else {
            setForm((prev) => ({
                ...prev,
                [name]: type === "checkbox" ? checked : value,
            }));
        }
    };

    const handleRemoveImage = () => {
        setForm((prev) => ({ ...prev, photo: null }));
        setPreview(null);
    };

    const validateForm = () => {
        if (!form.name.trim()) return "Nama wajib diisi";
        if (!form.position.trim()) return "Jabatan wajib diisi";
        if (form.email && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i.test(form.email))
            return "Email tidak valid";
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
            if (typeof value === "boolean") value = value ? 1 : 0;
            if (value !== null) {
                formData.append(key, value);
            }
        }

        try {
            const res = await fetch("/api/teams", {
                method: "POST",
                body: formData,
            });

            if (res.ok) {
                toast.success("Anggota tim berhasil ditambahkan");
                const data = await res.json(); // Jika API mengembalikan data setelah berhasil
                onSuccess(data); // Panggil onSuccess dengan data baru jika diperlukan
                onClose(); // Tutup modal setelah sukses
            } else {
                toast.error("Gagal menambahkan anggota tim");
            }
        } catch (err) {
            console.error(err); // Log error untuk debugging
            toast.error("Terjadi kesalahan saat mengirim data");
        } finally {
            setLoading(false); // Selalu matikan loading
        }
    };

    return (
        <Modal show={show} onClose={onClose}>
            {/* Modal ini akan berisi konten modal (Header, Body, Footer) */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                    Tambah Anggota Tim
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <TextInput
                        label="Nama Lengkap"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        isRequired // Pastikan prop ini didukung oleh TextInput kamu
                    />
                    <TextInput
                        label="Jabatan"
                        name="position"
                        value={form.position}
                        onChange={handleChange}
                        isRequired
                    />
                    <TextInput
                        label="Email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        isRequired
                    />
                    <TextInput
                        label="No telpon"
                        name="contact"
                        value={form.contact}
                        onChange={handleChange}
                        isRequired
                    />
                    {/* Perubahan untuk checkbox, karena tidak ada Switch dari heroui/react lagi */}
                    <div className="flex items-center mt-1">
                        <input
                            id="is_active_add" // Tambahkan ID untuk label accessibility
                            type="checkbox"
                            name="is_active"
                            checked={form.is_active}
                            onChange={handleChange}
                            className="mr-2 rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500" // Tailwind classes for styling
                        />
                        <label htmlFor="is_active_add" className="text-sm text-gray-700 dark:text-gray-200">
                            Aktif
                        </label>
                    </div>

                    <div className="col-span-full">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                            Deskripsi (opsional)
                        </label>
                        <Textarea // Menggunakan Textarea dari heroui/react
                            name="description"
                            value={form.description}
                            onChange={(e) =>
                                setForm((prev) => ({ ...prev, description: e.target.value }))
                            }
                            rows={3}
                        />
                    </div>

                    <div className="col-span-full">
                        <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">
                            Foto
                        </label>
                        {preview ? (
                            <div className="relative w-[100px] h-[100px] max-w-xs">
                                <img src={preview} alt="Preview" className="rounded shadow object-cover w-full h-full" />
                                <button
                                    type="button"
                                    onClick={handleRemoveImage}
                                    className="absolute top-1 right-1 px-2 py-1 bg-red-500 text-white text-xs rounded-full hover:bg-red-600 transition-colors"
                                >
                                    ×
                                </button>
                            </div>
                        ) : (
                            <input
                                type="file"
                                name="photo"
                                accept="image/*"
                                onChange={handleChange}
                                className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                            />
                        )}
                    </div>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                    <SecondaryButton type="button" onClick={onClose} disabled={loading}>
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