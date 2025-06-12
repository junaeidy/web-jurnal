import React from 'react';

export default function HeroSection() {
    return (
        <section
            className="relative h-screen bg-cover bg-center flex items-center justify-center text-center"
            style={{ backgroundImage: "url('https://images.pexels.com/photos/30503506/pexels-photo-30503506/free-photo-of-sundown-fishing-at-still-bay-south-africa.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')" }}
        >
            <div className="absolute inset-0 bg-black opacity-60"></div>
            <div className="relative z-10 text-white px-4">
                <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-4 animate__animated animate__fadeInDown">
                    Jurnal Inovasi dan Pengetahuan Terkini
                </h1>
                <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto animate__animated animate__fadeInUp">
                    Menyajikan riset mendalam, artikel berkualitas, dan wawasan terbaru dari berbagai disiplin ilmu.
                </p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg transform hover:scale-105 transition duration-300 animate__animated animate__zoomIn">
                    Telusuri Jurnal
                </button>
            </div>
        </section>
    );
}