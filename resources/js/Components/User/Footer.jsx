import React from "react";
import { Link, usePage } from "@inertiajs/react";

export default function Footer() {
    const { translations } = usePage().props;
    const footer = translations.footer;

    return (
        <footer className="bg-gradient-to-t from-[#121212] to-[#1f1f1f] text-white py-12 mt-20 border-t border-[#2e2e2e]">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
                {/* Kolom 1: Info */}
                <div data-aos="fade-up">
                    <h3 className="text-2xl font-bold mb-4 text-[#50c878]">
                        {footer.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        {footer.description}
                    </p>
                </div>

                {/* Kolom 2: Navigasi */}
                <div data-aos="fade-up" data-aos-delay="100">
                    <h4 className="text-xl font-semibold mb-4 text-[#50c878]">
                        {footer.navigation}
                    </h4>
                    <ul className="space-y-2 text-sm">
                        {[{ href: "/", label: "Home" },
                          { href: "/events", label: "Events" },
                          { href: "/team", label: "Team" },
                          { href: "/about-us", label: "About Us" },
                          { href: "/journal", label: "Find Journal" },
                        ].map(link => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className="text-gray-400 hover:text-[#50c878] transition"
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Kolom 3: Kontak */}
                <div data-aos="fade-up" data-aos-delay="200">
                    <h4 className="text-xl font-semibold mb-4 text-[#50c878]">
                        {footer.contact}
                    </h4>
                    <div className="text-sm text-gray-400 space-y-2">
                        <p>{footer.email}</p>
                        <p>{footer.phone}</p>
                        <p>{footer.address}</p>
                    </div>
                    <div className="flex gap-4 mt-6">
                        {[
                            { href: "#", icon: "brand-facebook" },
                            { href: "https://www.instagram.com/adrakarimahubbi/", icon: "brand-instagram" },
                            { href: "https://www.youtube.com/@adrakarimahubbi", icon: "brand-youtube" },
                            { href: "https://www.tiktok.com/@adrakarimahubbi", icon: "brand-tiktok" },
                            { href: "#", icon: "brand-twitter" },
                        ].map((social, idx) => (
                            <a
                                key={idx}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-[#50c878] transition"
                            >
                                <i className={`tabler-icon tabler-${social.icon} text-xl`}></i>
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            <div className="mt-12 border-t border-[#333] pt-6 text-center text-gray-500 text-sm px-4">
                &copy; {new Date().getFullYear()} {footer.title}. {footer.copyright}
            </div>
        </footer>
    );
}
