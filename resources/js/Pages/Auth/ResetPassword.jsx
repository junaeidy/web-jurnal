import InputError from "@/Components/UI/InputError";
import PrimaryButton from "@/Components/UI/PrimaryButton";
import TextInput from "@/Components/UI/TextInput";
import { Head, useForm } from "@inertiajs/react";
import InputLabel from "@/Components/UI/InputLabel";

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: "",
        password_confirmation: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("password.store"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <>
            <Head title="Reset Password" />
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden flex">
                    {/* Kiri: Quote inspiratif */}
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

                    {/* Kanan: Form reset password */}
                    <div className="w-1/2 p-10 flex flex-col justify-center">
                        {/* Header */}
                        <div className="mb-6 text-center">
                            <h2 className="text-2xl font-bold text-gray-800">
                                Reset Password
                            </h2>
                            <p className="text-gray-600 text-sm mt-1">
                                Masukkan password baru untuk akun Anda.
                            </p>
                        </div>

                        <form onSubmit={submit} className="space-y-6">
                            <div>
                                <InputLabel htmlFor="email" value="Email" />
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-full"
                                    autoComplete="username"
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.email}
                                    className="mt-2"
                                />
                            </div>

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
                                    autoComplete="new-password"
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

                            <div>
                                <InputLabel
                                    htmlFor="password_confirmation"
                                    value="Confirm Password"
                                />
                                <TextInput
                                    id="password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    className="mt-1 block w-full"
                                    autoComplete="new-password"
                                    onChange={(e) =>
                                        setData(
                                            "password_confirmation",
                                            e.target.value
                                        )
                                    }
                                />
                                <InputError
                                    message={errors.password_confirmation}
                                    className="mt-2"
                                />
                            </div>

                            <PrimaryButton
                                className="w-full bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-500"
                                disabled={processing}
                            >
                                Reset Password
                            </PrimaryButton>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}