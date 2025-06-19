import PrimaryButton from "@/Components/PrimaryButton";
import { Head, Link, useForm } from "@inertiajs/react";

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();
        post(route("verification.send"));
    };

    return (
        <>
            <Head title="Email Verification" />
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden flex">
                    {/* Kiri: Quote */}
                    <div className="w-1/2 bg-[#2A7C4C] text-white flex items-center justify-center p-10">
                        <div className="text-center max-w-md">
                            <h2 className="text-2xl font-semibold mb-4 leading-snug">
                                “Produktivitas dimulai dari satu langkah kecil:
                                <br /> masuk dan mulai berkarya.”
                            </h2>
                            <p className="text-sm text-white/80">
                                – Sistem Anda, Lebih Baik Setiap Hari
                            </p>
                        </div>
                    </div>

                    {/* Kanan: Verifikasi Email */}
                    <div className="w-1/2 p-10 flex flex-col justify-center">
                        <div className="mb-6 text-center">
                            <h2 className="text-2xl font-bold text-gray-800">
                                Verifikasi Email
                            </h2>
                            <p className="text-gray-600 text-sm mt-1">
                                Terima kasih telah mendaftar! Silakan verifikasi
                                alamat email Anda melalui tautan yang telah kami
                                kirim. Jika belum menerima emailnya, kami akan
                                kirim ulang.
                            </p>
                        </div>

                        {status === "verification-link-sent" && (
                            <div className="mb-4 text-sm font-medium text-green-600 text-center">
                                Tautan verifikasi baru telah dikirim ke alamat
                                email Anda.
                            </div>
                        )}

                        <form onSubmit={submit} className="space-y-6">
                            <PrimaryButton
                                disabled={processing}
                                className="w-full bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-500"
                            >
                                Kirim Ulang Email Verifikasi
                            </PrimaryButton>

                            <Link
                                href={route("logout")}
                                method="post"
                                as="button"
                                className="block w-full text-center mt-2 text-sm text-gray-600 underline hover:text-gray-900"
                            >
                                Keluar
                            </Link>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
