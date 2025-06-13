import React from "react";
import { Link } from "@inertiajs/react";
import { Facebook, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-12">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Kolom 1: Informasi Jurnal */}
                <div>
                    <h3 className="text-2xl font-bold mb-4">Jurnal Kami</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        Platform publikasi ilmiah terkemuka yang berdedikasi
                        untuk menyebarkan riset inovatif dan pengetahuan terbaru
                        dari berbagai disiplin ilmu.
                    </p>
                </div>

                {/* Kolom 2: Navigasi Cepat */}
                <div>
                    <h3 className="text-xl font-semibold mb-4">
                        Navigasi Cepat
                    </h3>
                    <ul className="space-y-2">
                        <li>
                            <Link
                                href="/"
                                className="text-gray-400 hover:text-blue-400 transition duration-300"
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/kegiatan"
                                className="text-gray-400 hover:text-blue-400 transition duration-300"
                            >
                                Kegiatan
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/team"
                                className="text-gray-400 hover:text-blue-400 transition duration-300"
                            >
                                Team
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/about-us"
                                className="text-gray-400 hover:text-blue-400 transition duration-300"
                            >
                                About Us
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/journal"
                                className="text-gray-400 hover:text-blue-400 transition duration-300"
                            >
                                Temukan Jurnal
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Kolom 3: Kontak Kami */}
                <div>
                    <h3 className="text-xl font-semibold mb-4">Hubungi Kami</h3>
                    <p className="text-gray-400 text-sm mb-2">
                        Email: info@jurnalkami.com
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
                            className="text-gray-400 hover:text-blue-400 transition duration-300"
                        >
                            <Facebook />
                        </a>
                        <a
                            href="#"
                            className="text-gray-400 hover:text-blue-400 transition duration-300"
                        >
                            <Instagram />
                        </a>
                        <a
                            href="#"
                            className="text-gray-400 hover:text-blue-400 transition duration-300"
                        >
                            <Linkedin />
                        </a>
                    </div>
                </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-500 text-sm">
                &copy; {new Date().getFullYear()} Jurnal Kami. All rights
                reserved.
            </div>
        </footer>
    );
}
