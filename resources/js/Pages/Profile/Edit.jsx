import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Edit({ mustVerifyEmail, status }) {

    return (
        <div>
            <AuthenticatedLayout>
            <Head title="Profile" />
            <div className="flex-1 flex flex-col">
                <main className="flex-1 overflow-y-auto p-6">
                    <div className="space-y-6 max-w-4xl mx-auto">
                        <div className="bg-white p-6 rounded-xl shadow dark:bg-gray-800">
                            <UpdateProfileInformationForm
                                mustVerifyEmail={mustVerifyEmail}
                                status={status}
                                className="max-w-xl"
                            />
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow dark:bg-gray-800">
                            <UpdatePasswordForm className="max-w-xl" />
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow dark:bg-gray-800">
                            <DeleteUserForm className="max-w-xl" />
                        </div>
                    </div>
                </main>
            </div>
            </AuthenticatedLayout>
        </div>
    );
}
