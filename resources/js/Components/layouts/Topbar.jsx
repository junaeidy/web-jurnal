import { useEffect, useRef, useState } from "react";
import { BellIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Transition } from "@headlessui/react";
import Dropdown from "@/Components/UI/Dropdown";
import { usePage } from "@inertiajs/react";

export default function Topbar() {
    const user = usePage().props.auth.user;

    return (
        <div className="flex items-center justify-between bg-white p-4 shadow-sm sticky top-0 z-10">
            {/* Search */}
            <div className="relative w-full max-w-md">
                <input
                    type="text"
                    placeholder="Search"
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
            </div>

            {/* Right: Notification + Profile */}
            <div className="flex items-center gap-1 ms-4 relative">
                <span className="text-sm text-gray-700">Selamat datang,</span>

                <Dropdown>
                    <Dropdown.Trigger>
                        <button className="text-sm font-medium text-gray-800 hover:underline focus:outline-none">
                            {user.name}
                        </button>
                    </Dropdown.Trigger>
                    <Dropdown.Content>
                        <Dropdown.Link href={route("profile.edit")}>
                            Profile
                        </Dropdown.Link>
                        <Dropdown.Link
                            href={route("logout")}
                            method="post"
                            as="button"
                        >
                            Log Out
                        </Dropdown.Link>
                    </Dropdown.Content>
                </Dropdown>
            </div>
        </div>
    );
}
