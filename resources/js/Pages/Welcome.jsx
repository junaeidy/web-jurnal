import React from "react";
import { Head } from "@inertiajs/react";
import Navbar from "@/Components/User/Navbar";
import HeroSection from "@/Components/User/HeroSection";
import AboutSection from "@/Components/User/AboutSection";
import FeaturedJournalsSection from "@/Components/User/FeaturedJournalsSection";
import Footer from "@/Components/User/Footer";

export default function Home({ auth }) {
    return (
        <>
            <Head title="Home" />
            <Navbar user={auth.user} />
            <HeroSection />
            <AboutSection />
            <FeaturedJournalsSection />
            <Footer />
        </>
    );
}
