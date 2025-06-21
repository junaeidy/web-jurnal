import React, { useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";

export default function Navbar({ user }) {
    const { url, props } = usePage();
    const [isOpen, setIsOpen] = useState(false);

    const { translations } = usePage().props;
    const t = translations.navbar;

    const locale = props.locale || "en";
    const navLinks = [
        { href: "/", label: t.home },
        { href: "/journal", label: t.journal },
        { href: "/events", label: t.events },
        { href: "/team", label: t.team },
        { href: "/about-us", label: t.about_us },
    ];

    const isActive = (href) => url === href || url.startsWith(href + "/");

    return (
        <nav className="fixed w-full z-50 bg-white/90 backdrop-blur shadow-sm">
            <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                {/* Logo & Brand */}
                <Link href="/" className="flex items-center gap-3">
                    <img src="/images/Logo-1.png" alt="Logo" className="h-10 w-10" />
                    <span className="text-lg font-semibold text-[#2A7C4C]">
                        Denisya Smart Consulting
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex gap-10 items-center">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`relative text-sm font-medium transition-all after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:scale-x-0 after:bg-[#2A7C4C] after:origin-left after:transition-transform hover:after:scale-x-100 ${
                                isActive(link.href)
                                    ? "text-[#2A7C4C] after:scale-x-100 font-semibold"
                                    : "text-gray-700 hover:text-[#2A7C4C]"
                            }`}
                        >
                            {link.label}
                        </Link>
                    ))}

                    {/* Locale Switcher */}
                    <div className="flex gap-2 items-center text-sm">
                        <Link
                            href="/lang/en"
                            className={`hover:text-[#2A7C4C] ${
                                locale === "en" ? "font-bold underline" : ""
                            }`}
                        >
                            EN
                        </Link>
                        <span className="text-gray-400">|</span>
                        <Link
                            href="/lang/id"
                            className={`hover:text-[#2A7C4C] ${
                                locale === "id" ? "font-bold underline" : ""
                            }`}
                        >
                            ID
                        </Link>
                    </div>

                    {/* Auth Button */}
                    {user ? (
                        <Link
                            href="/dashboard"
                            className="bg-[#2A7C4C] text-white px-4 py-2 rounded-full text-sm hover:bg-[#226c40] transition"
                        >
                            {t.dashboard}
                        </Link>
                    ) : (
                        <Link
                            href="/login"
                            className="bg-[#2A7C4C] text-white px-4 py-2 rounded-full text-sm hover:bg-[#226c40] transition"
                        >
                            {t.login}
                        </Link>
                    )}
                </div>

                {/* Hamburger Mobile */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="lg:hidden text-gray-700 focus:outline-none"
                    aria-label="Toggle Menu"
                >
                    {isOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
                </button>
            </div>

            {/* Mobile Dropdown */}
            <div
                className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? "max-h-[500px]" : "max-h-0"
                }`}
            >
                <div className="px-4 pb-4 flex flex-col gap-4 text-sm">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className={`py-2 border-b transition ${
                                isActive(link.href)
                                    ? "text-[#2A7C4C] font-semibold"
                                    : "text-gray-700 hover:text-[#2A7C4C]"
                            }`}
                        >
                            {link.label}
                        </Link>
                    ))}

                    {/* Auth Buttons */}
                    {user ? (
                        <Link
                            href="/dashboard"
                            className="block w-full text-center bg-[#2A7C4C] text-white py-2 rounded-lg hover:bg-[#226c40] transition"
                        >
                            {t.dashboard}
                        </Link>
                    ) : (
                        <Link
                            href="/login"
                            className="block w-full text-center bg-[#2A7C4C] text-white py-2 rounded-lg hover:bg-[#226c40] transition"
                        >
                            {t.login}
                        </Link>
                    )}

                    {/* Language */}
                    <div className="flex justify-center gap-4 mt-2">
                        <Link
                            href="/lang/en"
                            className={`hover:text-[#2A7C4C] ${
                                locale === "en" ? "font-bold underline" : ""
                            }`}
                        >
                            EN
                        </Link>
                        <Link
                            href="/lang/id"
                            className={`hover:text-[#2A7C4C] ${
                                locale === "id" ? "font-bold underline" : ""
                            }`}
                        >
                            ID
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
