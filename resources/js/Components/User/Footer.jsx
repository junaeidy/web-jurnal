import React from "react";
import { Link } from "@inertiajs/react";
import { Facebook, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-[#1f1f1f] text-white pt-12 pb-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Kolom 1: Informasi Jurnal */}
                <div>
                    <h3 className="text-2xl font-bold mb-4 text-[#cfb53b]">Adra Karima Hubbi</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        Platform publikasi ilmiah terkemuka yang berdedikasi
                        untuk menyebarkan riset inovatif dan pengetahuan terbaru
                        dari berbagai disiplin ilmu.
                    </p>
                </div>

                {/* Kolom 2: Navigasi Cepat */}
                <div>
                    <h3 className="text-xl font-semibold mb-4 text-[#cfb53b]">
                        Navigasi Cepat
                    </h3>
                    <ul className="space-y-2">
                        {[
                            { href: "/", label: "Home" },
                            { href: "/events", label: "Kegiatan" },
                            { href: "/team", label: "Team" },
                            { href: "/about-us", label: "About Us" },
                            { href: "/journal", label: "Temukan Jurnal" },
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
                    <h3 className="text-xl font-semibold mb-4 text-[#cfb53b]">Hubungi Kami</h3>
                    <p className="text-gray-400 text-sm mb-2">
                        Email: info@adrakarimahubbi.com
                    </p>
                    <p className="text-gray-400 text-sm mb-2">
                        Telepon: +62 812-3456-7890
                    </p>
                    <p className="text-gray-400 text-sm">
                        Alamat: Jl. Contoh No. 123, Kota Anda, Indonesia
                    </p>
                    <div className="flex space-x-4 mt-6">
                        <a
                            href="#"
                            className="text-gray-400 hover:text-[#50c878] transition duration-300"
                        >
                            <Facebook size={20} />
                        </a>
                        <a
                            href="#"
                            className="text-gray-400 hover:text-[#50c878] transition duration-300"
                        >
                            <Instagram size={20} />
                        </a>
                        <a
                            href="#"
                            className="text-gray-400 hover:text-[#50c878] transition duration-300"
                        >
                            <Linkedin size={20} />
                        </a>
                    </div>
                </div>
            </div>

            {/* Footer bawah */}
            <div className="mt-10 pt-6 border-t border-gray-700 text-center text-gray-500 text-sm px-4">
                &copy; {new Date().getFullYear()} Adra Karima Hubbi. All rights
                reserved.
            </div>
        </footer>
    );
}
