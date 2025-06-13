import React from "react";
import { Link, usePage } from "@inertiajs/react";

export default function Navbar({ user }) {
    const { url } = usePage();

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/journal", label: "Jurnal" },
        { href: "/kegiatan", label: "Kegiatan" },
        { href: "/team", label: "Team" },
        { href: "/about-us", label: "About Us" },
    ];

    const isActive = (href) => {
        return url == href || url.startsWith(href + "/");
    };

    return (
        <nav className="fixed w-full z-50 bg-background/80 backdrop-blur-md shadow-md">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between h-16">
                {/* Logo */}
                <div className="text-xl font-bold text-blue-600">
                    <Link href="/">Jurnal Kami</Link>
                </div>

                {/* Navigasi Utama */}
                <div className="flex-grow flex justify-center space-x-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`font-medium transition-colors duration-300 ${
                                isActive(link.href)
                                    ? "text-blue-600 font-semibold underline underline-offset-4"
                                    : "text-gray-600 hover:text-blue-600"
                            }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* Tombol Login / Dashboard */}
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
