import Checkbox from '@/Components/UI/Checkbox';
import InputError from '@/Components/UI/InputError';
import InputLabel from '@/Components/UI/InputLabel';
import PrimaryButton from '@/Components/UI/PrimaryButton';
import TextInput from '@/Components/UI/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import ApplicationLogo from '@/Components/UI/ApplicationLogo';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <>
            <Head title="Log in" />
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden flex">
                    {/* Kiri: Logo dengan background hijau brand */}
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

                    {/* Kanan: Teks sambutan + Form */}
                    <div className="w-1/2 p-10 flex flex-col justify-center">
                        {/* Teks sambutan */}
                        <div className="mb-6 text-center">
                            <h2 className="text-2xl font-bold text-gray-800">
                                Selamat Datang Kembali!
                            </h2>
                            <p className="text-gray-600 text-sm mt-1">
                                Silakan masuk ke akun Anda untuk melanjutkan.
                            </p>
                        </div>

                        {status && (
                            <div className="mb-4 text-sm text-green-600 text-center font-medium">
                                {status}
                            </div>
                        )}

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
                                    isFocused={true}
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
                                    autoComplete="current-password"
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.password}
                                    className="mt-2"
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <label className="flex items-center">
                                    <Checkbox
                                        name="remember"
                                        checked={data.remember}
                                        onChange={(e) =>
                                            setData(
                                                "remember",
                                                e.target.checked
                                            )
                                        }
                                    />
                                    <span className="ms-2 text-sm text-gray-600">
                                        Remember me
                                    </span>
                                </label>

                                {canResetPassword && (
                                    <Link
                                        href={route("password.request")}
                                        className="text-sm text-emerald-600 hover:text-emerald-800"
                                    >
                                        Lupa password?
                                    </Link>
                                )}
                            </div>

                            <PrimaryButton
                                className="w-full"
                                disabled={processing}
                                type="submit"
                            >
                                Log in
                            </PrimaryButton>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}