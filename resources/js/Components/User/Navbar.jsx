import React from "react";
import { Link } from "@inertiajs/react";

export default function Navbar({ user }) {
    return (
        <nav className="fixed w-full z-50 bg-background/80 backdrop-blur-md shadow-md">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between h-16">
                {/* Logo atau Nama Jurnal */}
                <div className="text-xl font-bold text-blue-600">
                    <Link href="/">Jurnal Kami</Link>
                </div>

                {/* Navigasi Utama */}
                <div className="flex-grow flex justify-center space-x-8">
                    <Link
                        href="/"
                        className="text-gray-600 hover:text-blue-600 font-medium"
                    >
                        Home
                    </Link>
                    <Link
                        href="/jurnal"
                        className="text-gray-600 hover:text-blue-600 font-medium"
                    >
                        Jurnal
                    </Link>
                    <Link
                        href="/kegiatan"
                        className="text-gray-600 hover:text-blue-600 font-medium"
                    >
                        Kegiatan
                    </Link>
                    <Link
                        href="/team"
                        className="text-gray-600 hover:text-blue-600 font-medium"
                    >
                        Team
                    </Link>
                    <Link
                        href="/about-us"
                        className="text-gray-600 hover:text-blue-600 font-medium"
                    >
                        About Us
                    </Link>
                </div>

                {/* Tombol Login/Dashboard */}
                <div>
                    {user ? (
                        <Link
                            href="/dashboard"
                            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <Link
                            href="/login"
                            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                        >
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}
