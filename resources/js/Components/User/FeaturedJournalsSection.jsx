import React from "react";

const featuredJournals = [
    {
        id: 1,
        title: "Perkembangan Artificial Intelligence dalam Pendidikan",
        author: "Dr. Budi Santoso",
        image: "https://images.pexels.com/photos/3025005/pexels-photo-3025005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        description:
            "Analisis mendalam tentang dampak AI terhadap metode pengajaran dan pembelajaran di era digital.",
    },
    {
        id: 2,
        title: "Inovasi Pertanian Berkelanjutan di Iklim Tropis",
        author: "Prof. Siti Aminah",
        image: "https://images.pexels.com/photos/3025005/pexels-photo-3025005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        description:
            "Studi kasus mengenai penerapan teknologi hijau untuk meningkatkan produktivitas pertanian secara lestari.",
    },
    {
        id: 3,
        title: "Psikologi Sosial: Dinamika Kelompok dan Perilaku Massa",
        author: "Dra. Ria Lestari",
        image: "https://images.pexels.com/photos/3025005/pexels-photo-3025005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        description:
            "Eksplorasi konsep-konsep dasar psikologi sosial dan pengaruhnya terhadap interaksi manusia.",
    },
    {
        id: 4,
        title: "Ekonomi Kreatif dan Peran UMKM di Era Digital",
        author: "Ir. Joko Susanto",
        image: "https://images.pexels.com/photos/3025005/pexels-photo-3025005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        description:
            "Mengkaji potensi ekonomi kreatif dan strategi UMKM untuk bersaing di pasar global digital.",
    },
    {
        id: 5,
        title: "Manajemen Lingkungan dan Konservasi Sumber Daya Alam",
        author: "Dr. Lestari Wijaya",
        image: "https://images.pexels.com/photos/3025005/pexels-photo-3025005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        description:
            "Pembahasan mendalam tentang praktik terbaik manajemen lingkungan dan konservasi keanekaragaman hayati.",
    },
];

export default function FeaturedJournalsSection() {
    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-4xl font-bold text-gray-800 mb-12">
                    Jurnal Unggulan Kami
                </h2>

                {/* Perubahan di sini: tambahkan xl:grid-cols-5 */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                    {featuredJournals.map((journal) => (
                        <div
                            key={journal.id}
                            className="bg-white rounded-lg shadow-xl overflow-hidden transform hover:scale-105 transition duration-300 border border-gray-200"
                        >
                            <img
                                src={journal.image}
                                alt={journal.title}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4 text-left">
                                {" "}
                                {/* Sesuaikan padding jika perlu */}
                                <h3 className="text-lg font-semibold text-gray-800 mb-2 leading-snug">
                                    {journal.title}
                                </h3>
                                <p className="text-gray-600 text-xs mb-3">
                                    {" "}
                                    {/* Ukuran teks lebih kecil */}
                                    Oleh:{" "}
                                    <span className="font-medium text-blue-600">
                                        {journal.author}
                                    </span>
                                </p>
                                <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                                    {" "}
                                    {/* Ukuran teks lebih kecil */}
                                    {journal.description}
                                </p>
                                <a
                                    href={`/jurnal/${journal.id}`}
                                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-1.5 px-4 rounded-lg text-xs transition duration-300"
                                >
                                    Baca Selengkapnya
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12">
                    <a
                        href="/jurnal"
                        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 transform hover:scale-105"
                    >
                        Lihat Semua Jurnal
                    </a>
                </div>
            </div>
        </section>
    );
}
