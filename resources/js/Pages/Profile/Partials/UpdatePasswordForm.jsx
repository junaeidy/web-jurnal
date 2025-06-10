import InputError from '@/Components/UI/InputError';
import InputLabel from '@/Components/UI/InputLabel';
import PrimaryButton from '@/Components/UI/PrimaryButton';
import TextInput from '@/Components/UI/TextInput';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

export default function UpdatePasswordForm({ className = '' }) {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    const renderPasswordField = (id, label, value, setValue, show, toggle, inputRef) => (
        <div className="relative">
            <InputLabel htmlFor={id} value={label} />

            <TextInput
                id={id}
                ref={inputRef}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                type={show ? 'text' : 'password'}
                className="mt-1 block w-full pr-10"
                autoComplete="off"
            />

            <button
                type="button"
                onClick={toggle}
                className="absolute right-3 top-[38px] text-gray-500 hover:text-gray-700"
            >
                {show ? (
                    <EyeSlashIcon className="h-5 w-5" />
                ) : (
                    <EyeIcon className="h-5 w-5" />
                )}
            </button>
        </div>
    );

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Update Password
                </h2>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Ensure your account is using a long, random password to stay secure.
                </p>
            </header>

            <form onSubmit={updatePassword} className="mt-6 space-y-6">
                <div>
                    {renderPasswordField(
                        'current_password',
                        'Current Password',
                        data.current_password,
                        (val) => setData('current_password', val),
                        showCurrentPassword,
                        () => setShowCurrentPassword(!showCurrentPassword),
                        currentPasswordInput
                    )}
                    <InputError message={errors.current_password} className="mt-2" />
                </div>

                <div>
                    {renderPasswordField(
                        'password',
                        'New Password',
                        data.password,
                        (val) => setData('password', val),
                        showPassword,
                        () => setShowPassword(!showPassword),
                        passwordInput
                    )}
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div>
                    {renderPasswordField(
                        'password_confirmation',
                        'Confirm Password',
                        data.password_confirmation,
                        (val) => setData('password_confirmation', val),
                        showPasswordConfirmation,
                        () => setShowPasswordConfirmation(!showPasswordConfirmation),
                        null
                    )}
                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton type="submit" disabled={processing}>Save</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Saved.
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}