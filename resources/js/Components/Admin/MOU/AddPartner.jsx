import React, { useState } from "react";
import Modal from "@/Components/UI/Modal";
import TextInput from "@/Components/UI/TextInput";
import PrimaryButton from "@/Components/UI/PrimaryButton";
import SecondaryButton from "@/Components/UI/SecondaryButton";
import toast from "react-hot-toast";
import axios from "axios";

export default function AddPartner({ show, onClose, onSuccess }) {
    const [form, setForm] = useState({ name: "", logo: null, link: "" });
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);

    const resetLogo = () => {
        setForm((prev) => ({ ...prev, logo: null }));
        setPreview(null);
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "logo") {
            const file = files[0];
            if (file) {
                setForm((prev) => ({ ...prev, logo: file }));
                setPreview(URL.createObjectURL(file));
            }
        } else {
            setForm((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append("name", form.name);
        if (form.logo) formData.append("logo", form.logo);
        formData.append("link", form.link);

        try {
            await axios.post("/api/partners", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            toast.success("Partner berhasil ditambahkan");
            setForm({ name: "", logo: null, link: "" });
            setPreview(null);
            onSuccess();
            onClose();
        } catch {
            toast.error("Gagal menambahkan partner");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal show={show} onClose={onClose} title="Tambah Partner">
            <form onSubmit={handleSubmit} className="px-4 py-2 space-y-4">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                    Tambah Data Partner
                </h2>

                <TextInput
                    label="Nama Partner"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    isRequired
                />

                <TextInput
                    label="Link (Opsional)"
                    name="link"
                    value={form.link}
                    onChange={handleChange}
                    placeholder="https://contoh.com"
                />

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Logo Partner
                    </label>
                    <input
                        type="file"
                        name="logo"
                        accept="image/*"
                        onChange={handleChange}
                        className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                        required
                    />
                </div>

                {preview && (
                    <div className="mt-2">
                        <p className="text-sm text-gray-600 mb-1">Preview Logo:</p>
                        <div className="relative inline-block">
                            <img
                                src={preview}
                                alt="Preview Logo"
                                className="max-h-40 object-contain border rounded p-1 bg-white"
                            />
                            <button
                                type="button"
                                onClick={resetLogo}
                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs hover:bg-red-600"
                                title="Hapus Gambar"
                            >
                                ✕
                            </button>
                        </div>
                    </div>
                )}

                <div className="flex justify-end gap-2 border-t border-gray-200 mt-4 pt-4">
                    <SecondaryButton onClick={onClose}>Batal</SecondaryButton>
                    <PrimaryButton type="submit" disabled={loading}>
                        {loading ? "Menyimpan..." : "Simpan"}
                    </PrimaryButton>
                </div>
            </form>
        </Modal>
    );
}
