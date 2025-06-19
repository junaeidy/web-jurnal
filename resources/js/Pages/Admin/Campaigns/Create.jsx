import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import { Head } from "@inertiajs/react";
import Sidebar from "@/Components/layouts/Sidebar";
import Topbar from "@/Components/layouts/Topbar";
import { Editor } from "@tinymce/tinymce-react";
import Papa from "papaparse";
import toast from "react-hot-toast";

export default function Create() {
    const [activeTab, setActiveTab] = useState("Manajemen Campaign");
    const [inputType, setInputType] = useState("manual");
    const [manualEmails, setManualEmails] = useState("");
    const [csvEmails, setCsvEmails] = useState([]);

    const { data, setData, post, processing, errors } = useForm({
        name: "",
        subject: "",
        content: "",
        emails: [],
    });

    const handleCsvUpload = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        if (file.type !== "text/csv") {
            alert("File harus berformat CSV.");
            return;
        }

        Papa.parse(file, {
            complete: (results) => {
                const emails = results.data
                    .map((row) => row[0]?.trim())
                    .filter((email) => email && /\S+@\S+\.\S+/.test(email));

                // Gabungkan ke dalam textarea
                const emailsText = emails.join(", ");

                // Update textarea & form data sekaligus
                setManualEmails(emailsText);
                setData("emails", emails);

                console.log("📥 CSV Upload => Emails parsed:", emails);
            },
            error: (err) => {
                console.error("CSV Parse Error:", err);
                alert("Gagal membaca file CSV.");
            },
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const finalEmails =
            inputType === "csv"
                ? csvEmails
                : manualEmails
                      .split(",")
                      .map((email) => email.trim())
                      .filter((email) => email.length > 0);

        if (finalEmails.length === 0) {
            toast.error("Tidak ada email yang valid ditemukan.");
            return;
        }

        setData("emails", finalEmails);

        setTimeout(() => {
            post(route("campaigns.store"), {
                onSuccess: () => {
                    toast.success("Campaign berhasil dibuat!");
                },
                onError: () => {
                    toast.error("Gagal membuat campaign.");
                },
            });
        }, 0);
    };

    return (
        <div className="flex h-screen overflow-hidden">
            <Head title="Buat Campaign" />
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
            <div className="flex flex-col flex-1 overflow-hidden">
                <Topbar />
                <main className="flex-1 p-8 overflow-y-auto bg-gray-100 dark:bg-gray-900">
                    <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
                        Buat Campaign Baru
                    </h1>

                    <form
                        onSubmit={handleSubmit}
                        className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-6"
                    >
                        {/* Nama Campaign */}
                        <div>
                            <label className="block font-medium text-gray-700 dark:text-gray-200">
                                Nama Campaign
                            </label>
                            <input
                                type="text"
                                className="w-full border p-2 rounded mt-1"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                            />
                            {errors.name && (
                                <div className="text-red-500 text-sm mt-1">
                                    {errors.name}
                                </div>
                            )}
                        </div>

                        {/* Subject Email */}
                        <div>
                            <label className="block font-medium text-gray-700 dark:text-gray-200">
                                Subject
                            </label>
                            <input
                                type="text"
                                className="w-full border p-2 rounded mt-1"
                                value={data.subject}
                                onChange={(e) =>
                                    setData("subject", e.target.value)
                                }
                            />
                            {errors.subject && (
                                <div className="text-red-500 text-sm mt-1">
                                    {errors.subject}
                                </div>
                            )}
                        </div>

                        {/* Email Content */}
                        <div>
                            <label className="block font-medium text-gray-700 dark:text-gray-200 mb-2">
                                Isi Email
                            </label>
                            <Editor
                                apiKey="pyjzhjk91dk9ks2jft1cs0wd0dw2alw1wy0x03qhtj1wrn2d"
                                init={{
                                    height: 300,
                                    menubar: false,
                                    plugins: "link lists",
                                    toolbar:
                                        "undo redo | formatselect | bold italic | alignleft aligncenter alignright | bullist numlist | link",
                                }}
                                value={data.content}
                                onEditorChange={(content) =>
                                    setData("content", content)
                                }
                            />
                            {errors.content && (
                                <div className="text-red-500 text-sm mt-1">
                                    {errors.content}
                                </div>
                            )}
                        </div>

                        {/* Pilihan Input Email */}
                        <div>
                            <label className="block font-medium text-gray-700 dark:text-gray-200 mb-1">
                                Input Penerima
                            </label>
                            <div className="flex gap-4">
                                <label>
                                    <input
                                        type="radio"
                                        name="inputType"
                                        value="manual"
                                        checked={inputType === "manual"}
                                        onChange={() => setInputType("manual")}
                                    />{" "}
                                    Ketik Manual
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="inputType"
                                        value="csv"
                                        checked={inputType === "csv"}
                                        onChange={() => setInputType("csv")}
                                    />{" "}
                                    Upload CSV
                                </label>
                            </div>
                        </div>

                        {/* Manual Email Input */}
                        {inputType === "manual" && (
                            <div>
                                <textarea
                                    className="w-full border p-2 rounded"
                                    rows="5"
                                    placeholder="user1@email.com, user2@email.com"
                                    value={manualEmails}
                                    onChange={(e) =>
                                        setManualEmails(e.target.value)
                                    }
                                />
                                {errors.emails && (
                                    <div className="text-red-500 text-sm mt-1">
                                        {errors.emails}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* CSV Upload */}
                        {inputType === "csv" && (
                            <div>
                                <input
                                    type="file"
                                    accept=".csv,text/csv"
                                    onChange={handleCsvUpload}
                                />
                                <p className="text-sm text-gray-500 mt-2">
                                    Format: 1 email per baris
                                </p>
                                {csvEmails.length > 0 && (
                                    <p className="text-green-600 text-sm mt-1">
                                        {csvEmails.length} email ditemukan
                                    </p>
                                )}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                        >
                            {processing ? "Mengirim..." : "Create Campaign"}
                        </button>
                    </form>
                </main>
            </div>
        </div>
    );
}
