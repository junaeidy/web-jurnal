import React, { useEffect, useState } from "react";
import axios from "axios";
import { usePage } from "@inertiajs/react";

export default function PartnerSection({ onLoadComplete, isLoading }) {
    const [partners, setPartners] = useState([]);
    const { translations } = usePage().props;
    const partner = translations?.partner || {};

    useEffect(() => {
        const fetchPartners = async () => {
            try {
                const res = await axios.get("/api/partners");
                setPartners(res.data);
            } catch (error) {
                console.error("Gagal memuat data partner", error);
            } finally {
                onLoadComplete?.();
            }
        };

        fetchPartners();
    }, []);

    if (isLoading || partners.length === 0) return null;

    return (
        <section
            className="bg-gray-50 py-6 overflow-hidden mb-10"
            data-aos="fade-up"
        >
            <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-center text-3xl md:text-4xl font-bold text-gray-800 mb-12">
                    {partner.title}
                </h2>
                <div className="relative w-full overflow-hidden">
                    <div className="whitespace-nowrap animate-marquee flex items-center gap-12">
                        {partners.concat(partners).map((partner, idx) => (
                            <a
                                key={`${partner.id}-${idx}`}
                                href={partner.link || "#"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-shrink-0"
                            >
                                <img
                                    src={partner.logo_url}
                                    alt={partner.name}
                                    className="h-20 w-auto object-contain"
                                />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
