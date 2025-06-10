import InputError from "@/Components/UI/InputError";
import PrimaryButton from "@/Components/UI/PrimaryButton";
import TextInput from "@/Components/UI/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import ApplicationLogo from "@/Components/UI/ApplicationLogo";
import { Head, Link, useForm } from "@inertiajs/react";
import InputLabel from "@/Components/UI/InputLabel";

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("password.email"));
    };

    return (
        <>
            <Head title="Forgot Password" />

            <div className="min-h-screen flex flex-col md:flex-row">
                {/* Left side - illustration / text */}
                <div
                    className="hidden md:flex flex-1 items-center justify-center bg-cover bg-center p-8"
                    style={{
                        backgroundImage:
                            "url(https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)",
                    }}
                >
                    <div className="text-white text-center max-w-md bg-black/40 p-6 rounded-xl">
                        <h1 className="text-4xl font-bold mb-4">
                            Lupa kata sandi Anda?
                        </h1>
                        <p className="text-lg">
                            Jangan khawatir! Masukkan email Anda dan kami akan mengirimkan tautan
untuk menyetel ulang.
                        </p>
                    </div>
                </div>

                {/* Right side - form */}
                <div className="flex-1 flex items-center justify-center bg-white dark:bg-gray-900">
                    <div className="w-full max-w-md p-8">
                        <div className="flex flex-col items-center mb-8">
                            <ApplicationLogo className="h-16 w-16 sm:h-20 sm:w-20" />
                            <h2 className="text-2xl font-semibold mt-4 text-gray-800 dark:text-gray-100">
                                Reset Kata Sandi
                            </h2>
                        </div>

                        {status && (
                            <div className="mb-4 text-sm font-medium text-green-600 dark:text-green-400">
                                {status}
                            </div>
                        )}

                        <form onSubmit={submit} className="space-y-6">
                            <div>
                                <InputLabel value="Email" />
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    autoComplete="email"
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.email}
                                    className="mt-2"
                                />
                            </div>

                            <PrimaryButton
                                type="submit"
                                className="w-full justify-center"
                                disabled={processing}
                            >
                                Kirim Tautan Reset Kata Sandi
                            </PrimaryButton>
                        </form>

                        {/* Link back to login */}
                        <div className="mt-6 text-center">
                            <Link
                                href={route("login")}
                                className="text-sm text-indigo-600 hover:text-indigo-800 underline dark:text-indigo-400 dark:hover:text-indigo-300"
                            >
                                Kembali ke Login
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}