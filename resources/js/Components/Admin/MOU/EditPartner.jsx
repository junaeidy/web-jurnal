import React, { useEffect, useState } from "react";
import Modal from "@/Components/UI/Modal";
import TextInput from "@/Components/UI/TextInput";
import PrimaryButton from "@/Components/UI/PrimaryButton";
import SecondaryButton from "@/Components/UI/SecondaryButton";
import toast from "react-hot-toast";
import axios from "axios";

export default function EditPartner({ show, onClose, onSuccess, partner }) {
    const [form, setForm] = useState({ name: "", logo: null, link: "" });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (show && partner) {
            setForm({
                name: partner.name || "",
                logo: null,
                link: partner.link || "",
            });
        }
    }, [show, partner]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "logo") {
            setForm((prev) => ({
                ...prev,
                logo: files[0],
            }));
        } else {
            setForm((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!partner?.id) return;
        setLoading(true);

        const formData = new FormData();
        formData.append("name", form.name);
        if (form.logo) {
            formData.append("logo", form.logo);
        }
        formData.append("link", form.link);

        try {
            await axios.post(`/api/partners/${partner.id}?_method=PUT`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            toast.success("Partner berhasil diperbarui");
            onSuccess();
            onClose();
        } catch {
            toast.error("Gagal memperbarui partner");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal show={show} onClose={onClose} title="Edit Partner">
            <form onSubmit={handleSubmit} className="px-4 py-2 space-y-4">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                    Edit Data Partner
                </h2>

                <TextInput
                    label="Nama Partner"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                />

                <TextInput
                    label="Link (Opsional)"
                    name="link"
                    value={form.link}
                    onChange={handleChange}
                    placeholder="https://example.com"
                />

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Ganti Logo (opsional)
                    </label>
                    <input
                        type="file"
                        name="logo"
                        accept="image/*"
                        onChange={handleChange}
                        className="text-sm text-gray-600"
                    />
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
