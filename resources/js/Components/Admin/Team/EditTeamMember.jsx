import React, { useEffect, useState } from "react";
import Modal from "@/Components/UI/Modal";
import TextInput from "@/Components/UI/TextInput";
import PrimaryButton from "@/Components/UI/PrimaryButton";
import SecondaryButton from "@/Components/UI/SecondaryButton";
import toast from "react-hot-toast";
import { Textarea, Spinner } from "@heroui/react";

export default function EditTeamMember({ show, onClose, onSuccess, teamId }) {
    const [form, setForm] = useState({
        name: "",
        position: "",
        photo: null,
        description: "",
        email: "",
        contact: "",
        is_active: true,
    });
    const [existingPhoto, setExistingPhoto] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);

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
                photo: null,
                description: data.description || "",
                email: data.email || "",
                contact: data.contact || "",
                is_active: data.is_active,
            });
            setExistingPhoto(data.photo || null);
            setPreview(null);
        } catch (error) {
            console.error("Fetch error:", error);
            toast.error("Gagal memuat data tim");
        } finally {
            setLoading(false);
        }
    };

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
                setExistingPhoto(null);
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

        try {

            const res = await fetch(`/api/teams/${teamId}`, {
                method: "POST",
                body: (() => {
          formData.append("_method", "PUT");
          return formData;
        })(),
            });

            if (res.ok) {
                toast.success("Data anggota tim berhasil diperbarui");
                const updatedData = await res.json(); 
                onSuccess(updatedData); 
                onClose();
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
                                        src={preview || `/${existingPhoto}`}
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