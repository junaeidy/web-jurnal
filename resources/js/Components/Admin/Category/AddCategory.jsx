import React, { useState } from "react";
import Modal from "@/Components/UI/Modal";
import TextInput from "@/Components/UI/TextInput";
import PrimaryButton from "@/Components/UI/PrimaryButton";
import SecondaryButton from "@/Components/UI/SecondaryButton";
import toast from "react-hot-toast";
import axios from "axios";

export default function AddCategory({ show, onClose, onSuccess }) {
    const [form, setForm] = useState({ name: "", is_active: false });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post("/api/categories", form);
            toast.success("Kategori berhasil ditambahkan");
            setForm({ name: "", is_active: false });
            onSuccess();
            onClose();
        } catch {
            toast.error("Gagal menambahkan kategori");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal show={show} onClose={onClose} title="Tambah Kategori">
            <form onSubmit={handleSubmit} className="px-4 py-2 space-y-4">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                    Tambah Data Kategori
                </h2>

                <TextInput
                    label="Nama Kategori"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                />
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
