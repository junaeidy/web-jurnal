import React from 'react';

export default function AboutSection() {
    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-10">
                <div className="md:w-1/2 flex justify-center">
                    <img
                        src="https://images.pexels.com/photos/13367878/pexels-photo-13367878.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                        alt="About Us"
                        className="rounded-lg shadow-lg max-w-full h-auto object-cover"
                    />
                </div>
                <div className="md:w-1/2 text-center md:text-left">
                    <h2 className="text-4xl font-bold text-gray-800 mb-6">Tentang Jurnal Kami</h2>
                    <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                        Jurnal Inovasi dan Pengetahuan Terkini adalah platform publikasi ilmiah yang didedikasikan untuk menyebarkan hasil penelitian terbaru dan inovasi dari berbagai bidang. Kami berkomitmen untuk menjaga standar keilmuan yang tinggi dan memfasilitasi diskusi intelektual yang konstruktif.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                        <a
                            href="/daftar-sekarang"
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300 transform hover:scale-105"
                        >
                            Daftar Sekarang
                        </a>
                        <a
                            href="https://wa.me/6281234567890" // Ganti dengan nomor WhatsApp Anda
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300 transform hover:scale-105"
                        >
                            Hubungi via WhatsApp
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}