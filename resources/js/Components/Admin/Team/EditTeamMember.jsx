import React, { useEffect, useState } from "react";
import Modal from "@/Components/UI/Modal"; // Import Modal kustom
import TextInput from "@/Components/UI/TextInput"; // Import TextInput kustom
import PrimaryButton from "@/Components/UI/PrimaryButton"; // Import PrimaryButton kustom
import SecondaryButton from "@/Components/UI/SecondaryButton"; // Import SecondaryButton kustom
import toast from "react-hot-toast";
import { Textarea, Spinner } from "@heroui/react"; // Textarea dan Spinner masih dari heroui/react

export default function EditTeamMember({ show, onClose, onSuccess, teamId }) {
    const [form, setForm] = useState({
        name: "",
        position: "",
        photo: null, // File objek untuk foto baru
        description: "",
        email: "",
        contact: "",
        is_active: true,
    });
    const [existingPhoto, setExistingPhoto] = useState(null); // URL foto yang sudah ada
    const [preview, setPreview] = useState(null); // URL preview untuk foto baru
    const [loading, setLoading] = useState(false); // Untuk indikator loading data
    const [submitting, setSubmitting] = useState(false); // Untuk indikator submit form

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/teams/${teamId}`);
            if (!res.ok) {
                throw new Error("Failed to fetch team data");
            }
            const data = await res.json();
            setForm({
                name: data.name || "",
                position: data.position || "",
                photo: null, // Reset photo file saat load data baru
                description: data.description || "",
                email: data.email || "",
                contact: data.contact || "",
                is_active: data.is_active,
            });
            setExistingPhoto(data.photo || null);
            setPreview(null); // Pastikan preview direset saat memuat data baru
        } catch (error) {
            console.error("Fetch error:", error);
            toast.error("Gagal memuat data tim");
        } finally {
            setLoading(false);
        }
    };

    // Panggil fetchData saat modal muncul atau teamId berubah
    useEffect(() => {
        if (show && teamId) {
            fetchData();
        }
    }, [show, teamId]);

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;

        if (type === "file") {
            const file = files?.[0];
            setForm((prev) => ({ ...prev, photo: file }));
            if (file) {
                setPreview(URL.createObjectURL(file));
                setExistingPhoto(null); // Hapus existingPhoto jika ada foto baru di-upload
            } else {
                setPreview(null);
            }
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
        setExistingPhoto(null); // Hapus juga existingPhoto
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

        setSubmitting(true);
        const formData = new FormData();

        // Append semua data form
        for (const key in form) {
            let value = form[key];
            if (value === "") value = null;
            if (typeof value === "boolean") value = value ? 1 : 0;
            if (value !== null) {
                formData.append(key, value);
            }
        }

        // Jika foto baru tidak di-upload tapi ada foto lama dan tidak dihapus, kirim indikator untuk mempertahankan foto lama
        // Ini perlu disesuaikan dengan bagaimana backend kamu menangani update foto
        // Contoh: jika photo: null di form, tapi existingPhoto ada, berarti tidak ada perubahan foto
        // Jika kamu ingin bisa menghapus foto lama tanpa upload baru, tambahkan flag `_delete_photo` ke formData
        // if (!form.photo && existingPhoto) {
        //     formData.append('photo_unchanged', true); // Contoh flag
        // }
        // Atau jika ingin hapus foto jika `photo` di form adalah `null` dan `existingPhoto` dihapus:
        // if (form.photo === null && existingPhoto === null && original_existingPhoto_was_present_before_editing) {
        //     formData.append('_delete_photo', true);
        // }
        // Untuk saat ini, kita biarkan `photo: null` saja jika tidak ada perubahan, backend harus mengabaikannya.

        try {
            // Gunakan metode POST atau PATCH. Jika backend Laravel, POST dengan _method: 'PUT'/'PATCH' biasanya lebih mudah.
            // Atau jika API memang menerima PATCH, gunakan itu.
            formData.append('_method', 'PUT'); // Menyimulasikan PUT/PATCH untuk Laravel

            const res = await fetch(`/api/teams/${teamId}`, {
                method: "POST", // Tetap POST, tapi sertakan _method PUT/PATCH
                body: formData,
            });

            if (res.ok) {
                toast.success("Data anggota tim berhasil diperbarui");
                const updatedData = await res.json(); // Ambil data terbaru jika API mengembalikan
                onSuccess(updatedData); // Panggil onSuccess dengan data terbaru
                onClose();
                // Reset state setelah sukses
                setPreview(null);
                setExistingPhoto(null);
            } else {
                const errorData = await res.json();
                toast.error(errorData.message || "Gagal memperbarui data tim");
            }
        } catch (error) {
            console.error(error);
            toast.error("Terjadi kesalahan saat menyimpan perubahan");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Modal show={show} onClose={onClose}>
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                    Edit Anggota Tim
                </h2>

                {loading ? (
                    <div className="flex justify-center items-center py-8">
                        <Spinner label="Memuat data..." />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <TextInput
                            label="Nama Lengkap"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            isRequired
                        />
                        <TextInput
                            label="Jabatan"
                            name="position"
                            value={form.position}
                            onChange={handleChange}
                            isRequired
                        />
                        <TextInput
                            label="Email (opsional)"
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                        />
                        <TextInput
                            label="Kontak (opsional)"
                            name="contact"
                            value={form.contact}
                            onChange={handleChange}
                        />

                        {/* Checkbox Status Aktif */}
                        <div className="flex items-center mt-1">
                            <input
                                id="is_active_edit"
                                type="checkbox"
                                name="is_active"
                                checked={form.is_active}
                                onChange={handleChange}
                                className="mr-2 rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                            />
                            <label htmlFor="is_active_edit" className="text-sm text-gray-700 dark:text-gray-200">
                                Aktif
                            </label>
                        </div>

                        {/* Textarea Deskripsi */}
                        <div className="col-span-full">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                                Deskripsi (opsional)
                            </label>
                            <Textarea
                                name="description"
                                value={form.description}
                                onChange={(e) =>
                                    setForm((prev) => ({ ...prev, description: e.target.value }))
                                }
                                rows={3}
                            />
                        </div>

                        {/* Input Foto */}
                        <div className="col-span-full">
                            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">
                                Foto
                            </label>
                            {(preview || existingPhoto) ? (
                                <div className="relative w-[100px] h-[100px] max-w-xs">
                                    <img
                                        src={preview || `/${existingPhoto}`} // Gunakan preview jika ada, kalau tidak gunakan existingPhoto
                                        alt="Preview"
                                        className="rounded shadow object-cover w-full h-full"
                                    />
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
                )}

                <div className="flex justify-end gap-2 pt-4">
                    <SecondaryButton type="button" onClick={onClose} disabled={submitting}>
                        Batal
                    </SecondaryButton>
                    <PrimaryButton type="submit" disabled={submitting || loading}>
                        {submitting ? "Menyimpan..." : "Simpan Perubahan"}
                    </PrimaryButton>
                </div>
            </form>
        </Modal>
    );
}