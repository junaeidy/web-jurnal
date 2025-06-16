import React from "react";
import { Link, usePage } from "@inertiajs/react";

export default function Footer() {
    const { translations } = usePage().props;
    const footer = translations.footer;

    return (
        <footer className="bg-[#1f1f1f] text-white pt-12 pb-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Kolom 1: Informasi Jurnal */}
                <div>
                    <h3 className="text-2xl font-bold mb-4 text-[#cfb53b]">
                        {footer.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        {footer.description}
                    </p>
                </div>

                {/* Kolom 2: Navigasi Cepat */}
                <div>
                    <h3 className="text-xl font-semibold mb-4 text-[#cfb53b]">
                        {footer.navigation}
                    </h3>
                    <ul className="space-y-2">
                        {[
                            { href: "/", label: "Home" },
                            { href: "/events", label: "Events" },
                            { href: "/team", label: "Team" },
                            { href: "/about-us", label: "About Us" },
                            { href: "/journal", label: "Find Journal" },
                        ].map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className="text-gray-400 hover:text-[#50c878] transition duration-300"
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Kolom 3: Kontak Kami */}
                <div>
                    <h3 className="text-xl font-semibold mb-4 text-[#cfb53b]">
                        {footer.contact}
                    </h3>
                    <p className="text-gray-400 text-sm mb-2">{footer.email}</p>
                    <p className="text-gray-400 text-sm mb-2">{footer.phone}</p>
                    <p className="text-gray-400 text-sm">{footer.address}</p>
                    <div className="flex space-x-4 mt-6">
                        <a
                            href="#"
                            className="text-gray-400 hover:text-[#50c878] transition duration-300"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={28}
                                height={28}
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="icon icon-tabler icons-tabler-outline icon-tabler-brand-facebook"
                            >
                                <path
                                    stroke="none"
                                    d="M0 0h24v24H0z"
                                    fill="none"
                                />
                                <path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3" />
                            </svg>
                        </a>
                        <a
                            href="https://www.instagram.com/adrakarimahubbi/"
                            className="text-gray-400 hover:text-[#50c878] transition duration-300"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={28}
                                height={28}
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="icon icon-tabler icons-tabler-outline icon-tabler-brand-instagram"
                            >
                                <path
                                    stroke="none"
                                    d="M0 0h24v24H0z"
                                    fill="none"
                                />
                                <path d="M4 8a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z" />
                                <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
                                <path d="M16.5 7.5v.01" />
                            </svg>
                        </a>
                        <a
                            href="https://www.youtube.com/@adrakarimahubbi"
                            className="text-gray-400 hover:text-[#50c878] transition duration-300"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={28}
                                height={28}
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="icon icon-tabler icons-tabler-outline icon-tabler-brand-youtube"
                            >
                                <path
                                    stroke="none"
                                    d="M0 0h24v24H0z"
                                    fill="none"
                                />
                                <path d="M2 8a4 4 0 0 1 4 -4h12a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-12a4 4 0 0 1 -4 -4v-8z" />
                                <path d="M10 9l5 3l-5 3z" />
                            </svg>
                        </a>
                        <a
                            href="https://www.tiktok.com/@adrakarimahubbi"
                            className="text-gray-400 hover:text-[#50c878] transition duration-300"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={28}
                                height={28}
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="icon icon-tabler icons-tabler-outline icon-tabler-brand-tiktok"
                            >
                                <path
                                    stroke="none"
                                    d="M0 0h24v24H0z"
                                    fill="none"
                                />
                                <path d="M21 7.917v4.034a9.948 9.948 0 0 1 -5 -1.951v4.5a6.5 6.5 0 1 1 -8 -6.326v4.326a2.5 2.5 0 1 0 4 2v-11.5h4.083a6.005 6.005 0 0 0 4.917 4.917z" />
                            </svg>
                        </a>
                        <a
                            href="#"
                            className="text-gray-400 hover:text-[#50c878] transition duration-300"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={28}
                                height={28}
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="icon icon-tabler icons-tabler-outline icon-tabler-brand-twitter"
                            >
                                <path
                                    stroke="none"
                                    d="M0 0h24v24H0z"
                                    fill="none"
                                />
                                <path d="M22 4.01c-1 .49 -1.98 .689 -3 .99c-1.121 -1.265 -2.783 -1.335 -4.38 -.737s-2.643 2.06 -2.62 3.737v1c-3.245 .083 -6.135 -1.395 -8 -4c0 0 -4.182 7.433 4 11c-1.872 1.247 -3.739 2.088 -6 2c3.308 1.803 6.913 2.423 10.034 1.517c3.58 -1.04 6.522 -3.723 7.651 -7.742a13.84 13.84 0 0 0 .497 -3.753c0 -.249 1.51 -2.772 1.818 -4.013z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>

            {/* Footer bawah */}
            <div className="mt-10 pt-6 border-t border-gray-700 text-center text-gray-500 text-sm px-4">
                &copy; {new Date().getFullYear()} {footer.title}.{" "}
                {footer.copyright}
            </div>
        </footer>
    );
}
