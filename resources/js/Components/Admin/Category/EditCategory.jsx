import React, { useEffect, useState } from "react";
import Modal from "@/Components/UI/Modal";
import TextInput from "@/Components/UI/TextInput";
import PrimaryButton from "@/Components/UI/PrimaryButton";
import SecondaryButton from "@/Components/UI/SecondaryButton";
import Checkbox from "@/Components/UI/Checkbox";
import toast from "react-hot-toast";
import axios from "axios";

export default function EditCategory({ show, onClose, onSuccess, category }) {
    const [form, setForm] = useState({ name: "", is_active: true });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (show && category) {
            setForm({
                name: category.name || "",
                is_active: category.is_active ?? true,
            });
        }
    }, [show, category]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!category?.id) return;
        setLoading(true);
        try {
            await axios.put(`/api/categories/${category.id}`, form);
            toast.success("Kategori berhasil diperbarui");
            onSuccess();
            onClose();
        } catch {
            toast.error("Gagal memperbarui kategori");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal show={show} onClose={onClose} title="Edit Kategori">
            <form onSubmit={handleSubmit} className="px-4 py-2 space-y-4">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                    Edit Data Kategori
                </h2>
                <TextInput
                    label="Nama Kategori"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                />

                <div className="flex items-center pt-1">
                    <input
                        type="checkbox"
                        name="is_active"
                        checked={form.is_active}
                        onChange={(e) =>
                            setForm((prev) => ({
                                ...prev,
                                is_active: e.target.checked,
                            }))
                        }
                        className="mr-2"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-200">
                        Aktif
                    </span>
                </div>

                <div className="pt-4 mt-4 flex justify-end gap-2 border-t border-gray-200">
                    <SecondaryButton onClick={onClose}>Batal</SecondaryButton>
                    <PrimaryButton type="submit" disabled={loading}>
                        {loading ? "Menyimpan..." : "Simpan Perubahan"}
                    </PrimaryButton>
                </div>
            </form>
        </Modal>
    );
}
