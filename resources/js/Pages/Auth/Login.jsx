import Checkbox from '@/Components/UI/Checkbox';
import InputError from '@/Components/UI/InputError';
import InputLabel from '@/Components/UI/InputLabel';
import PrimaryButton from '@/Components/UI/PrimaryButton';
import TextInput from '@/Components/UI/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import ApplicationLogo from '@/Components/UI/ApplicationLogo';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="Log in" />

            <div className="min-h-screen flex flex-col md:flex-row">
                {/* Left side - image/branding */}
                <div
                    className="hidden md:flex flex-1 items-center justify-center bg-cover bg-center p-8"
                    style={{
                        backgroundImage:
                            'url(https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)',
                    }}
                >
                    <div className="text-white text-center max-w-lg bg-black/40 p-6 rounded-xl">
                        <h1 className="text-4xl font-bold mb-4">Selamat Datang Kembali</h1>
                        <p className="text-lg leading-relaxed">
                            Silakan masuk ke dashboard admin
                        </p>
                    </div>
                </div>

                {/* Right side - login form */}
                <div className="flex-1 flex items-center justify-center bg-white dark:bg-gray-900">
                    <div className="w-full max-w-md p-8">
                        {/* Logo + heading */}
                        <div className="flex flex-col items-center mb-8">
                            <ApplicationLogo className="h-[120px] w-[120px]" />
                            <h2 className="text-2xl font-semibold mt-4 text-gray-800 dark:text-gray-100">
                                Masuk ke akun Anda
                            </h2>
                        </div>

                        {status && (
                            <div className="mb-4 text-sm font-medium text-green-600">{status}</div>
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
                                    isFocused
                                    onChange={(e) => setData('email', e.target.value)}
                                />
                                <InputError message={errors.email} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="password" value="Password" />
                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="mt-1 block w-full"
                                    autoComplete="current-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                />
                                <InputError message={errors.password} className="mt-2" />
                            </div>

                            <div className="flex items-center justify-between">
                                <label className="flex items-center">
                                    <Checkbox
                                        name="remember"
                                        checked={data.remember}
                                        onChange={(e) => setData('remember', e.target.checked)}
                                    />
                                    <span className="ms-2 text-sm text-gray-600 dark:text-gray-400">
                                        Remember me
                                    </span>
                                </label>

                                {canResetPassword && (
                                    <Link
                                        href={route('password.request')}
                                        className="text-sm text-indigo-600 hover:underline"
                                    >
                                        Forgot password?
                                    </Link>
                                )}
                            </div>

                            <div>
                                <PrimaryButton
                                    type="submit"
                                    className="w-full justify-center"
                                    disabled={processing}
                                >
                                    {processing ? 'Logging in...' : 'Log in'}
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}