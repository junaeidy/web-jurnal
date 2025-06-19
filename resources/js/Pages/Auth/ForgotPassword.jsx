import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <>
            <Head title="Forgot Password" />
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden flex">
                    {/* Kiri: Quote sama seperti login */}
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

                    {/* Kanan: Form Reset Password */}
                    <div className="w-1/2 p-10 flex flex-col justify-center">
                        {/* Header */}
                        <div className="mb-6 text-center">
                            <h2 className="text-2xl font-bold text-gray-800">Lupa Password?</h2>
                            <p className="text-gray-600 text-sm mt-1">
                                Masukkan email Anda dan kami akan kirimkan tautan untuk mengatur ulang password.
                            </p>
                        </div>

                        {status && (
                            <div className="mb-4 text-sm text-green-600 text-center font-medium">
                                {status}
                            </div>
                        )}

                        <form onSubmit={submit} className="space-y-6">
                            <div>
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    onChange={(e) => setData('email', e.target.value)}
                                />
                                <InputError message={errors.email} className="mt-2" />
                            </div>

                            <PrimaryButton
                                className="w-full bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-500"
                                disabled={processing}
                            >
                                Kirim Link Reset Password
                            </PrimaryButton>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
