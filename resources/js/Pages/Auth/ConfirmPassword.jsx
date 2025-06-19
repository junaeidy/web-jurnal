import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, useForm } from "@inertiajs/react";

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("password.confirm"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <>
            <Head title="Confirm Password" />
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

                    {/* Kanan: Form Confirm Password */}
                    <div className="w-1/2 p-10 flex flex-col justify-center">
                        {/* Judul */}
                        <div className="mb-6 text-center">
                            <h2 className="text-2xl font-bold text-gray-800">
                                Konfirmasi Password
                            </h2>
                            <p className="text-gray-600 text-sm mt-1">
                                Ini adalah area aman aplikasi. Harap masukkan
                                password Anda untuk melanjutkan.
                            </p>
                        </div>

                        <form onSubmit={submit} className="space-y-6">
                            <div>
                                <InputLabel
                                    htmlFor="password"
                                    value="Password"
                                />
                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.password}
                                    className="mt-2"
                                />
                            </div>

                            <PrimaryButton
                                className="w-full bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-500"
                                disabled={processing}
                            >
                                Konfirmasi
                            </PrimaryButton>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
