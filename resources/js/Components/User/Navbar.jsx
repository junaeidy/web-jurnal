import React, { useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";

export default function Navbar({ user }) {
    const { url } = usePage();
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/journal", label: "Jurnal" },
        { href: "/events", label: "Kegiatan" },
        { href: "/team", label: "Team" },
        { href: "/about-us", label: "About Us" },
    ];

    const isActive = (href) => {
        return url === href || url.startsWith(href + "/");
    };

    return (
        <nav className="fixed w-full z-50 bg-[#fdfaf2]/90 backdrop-blur-md shadow-md">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between h-16">
                {/* Logo */}
                <div className="text-xl font-bold" style={{ color: "#50c878" }}>
                    <Link href="/" className="flex items-center space-x-3">
                        <img
                            src="/images/Logo-1.png"
                            alt="Logo"
                            className="w-14 h-12"
                        />
                        <div className="flex flex-col leading-tight">
                            <span className="text-sm font-semibold" style={{ color: "#50c878" }}>
                                Adra Karima Hubbi
                            </span>
                            <span className="text-xs font-medium" style={{ color: "#cfb53b" }}>
                                Research and Publisher
                            </span>
                        </div>
                    </Link>
                </div>

                {/* Tombol hamburger di mobile */}
                <div className="lg:hidden">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-gray-700 focus:outline-none"
                        aria-label="Toggle Menu"
                    >
                        {isOpen ? (
                            <XMarkIcon className="w-6 h-6" />
                        ) : (
                            <Bars3Icon className="w-6 h-6" />
                        )}
                    </button>
                </div>

                {/* Navigasi Utama */}
                <div className="hidden lg:flex flex-grow justify-center space-x-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`font-medium transition-colors duration-300 ${
                                isActive(link.href)
                                    ? "text-[#50c878] font-semibold underline underline-offset-4"
                                    : "text-gray-600 hover:text-[#50c878]"
                            }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* Tombol Login / Dashboard */}
                <div className="hidden lg:block">
                    {user ? (
                        <Link
                            href="/dashboard"
                            className="bg-[#50c878] text-white px-5 py-2 rounded-lg hover:bg-[#3fa767] transition duration-300"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <Link
                            href="/login"
                            className="bg-[#50c878] text-white px-5 py-2 rounded-lg hover:bg-[#3fa767] transition duration-300"
                        >
                            Login
                        </Link>
                    )}
                </div>
            </div>

            {/* Menu Dropdown Mobile */}
            <div
                className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
                }`}
            >
                <div className="px-4 pb-4 flex flex-col space-y-2">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`block py-2 font-medium transition-colors duration-300 ${
                                isActive(link.href)
                                    ? "text-[#50c878] font-semibold underline underline-offset-4"
                                    : "text-gray-600 hover:text-[#50c878]"
                            }`}
                            onClick={() => setIsOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}

                    <div className="mt-2">
                        {user ? (
                            <Link
                                href="/dashboard"
                                className="block w-full bg-[#50c878] text-white px-4 py-2 rounded-lg text-center hover:bg-[#3fa767] transition"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <Link
                                href="/login"
                                className="block w-full bg-[#50c878] text-white px-4 py-2 rounded-lg text-center hover:bg-[#3fa767] transition"
                            >
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
