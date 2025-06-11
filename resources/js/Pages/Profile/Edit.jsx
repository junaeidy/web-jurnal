import Sidebar from "@/Components/layouts/Sidebar";
import Topbar from "@/Components/layouts/Topbar";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import { Head } from "@inertiajs/react";
import { useState } from "react";

export default function Edit({ mustVerifyEmail, status }) {
    const [activeTab, setActiveTab] = useState("Profile");

    return (
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
            <Head title="Profile" />
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
            <div className="flex-1 flex flex-col">
                <Topbar />
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
        </div>
    );
}
