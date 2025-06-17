import { useEffect, useState } from "react";
import axios from "axios";
import Modal from "@/Components/UI/Modal";
import { usePage } from "@inertiajs/react";

export default function ListTeam({ onLoaded }) {
    const [teams, setTeams] = useState([]);
    const [selectedMember, setSelectedMember] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { translations } = usePage().props;
    const teamT = translations?.team || {};

    useEffect(() => {
        axios
            .get("/api/teams")
            .then((res) => {
                const activeTeams = res.data.filter(
                    (member) => member.is_active == 1
                );
                setTeams(activeTeams);
            })
            .catch((err) => console.error("Gagal mengambil data tim:", err))
            .finally(() => {
                if (onLoaded) onLoaded();
            });
    }, []);

    const openModal = (member) => {
        setSelectedMember(member);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedMember(null);
        setIsModalOpen(false);
    };

    if (teams.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <img
                    src="/images/not-found.svg"
                    alt="Not Found"
                    className="w-60 mb-6"
                />
                <p className="text-gray-500 text-lg">
                    No team members are displayed yet.
                </p>
            </div>
        );
    }

    return (
        <section className="max-w-6xl mx-auto px-4 py-12">
            <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">
                {teamT?.find_title}
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
                {teamT?.list_description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {teams.map((member) => (
                    <div
                        key={member.id}
                        onClick={() => openModal(member)}
                        className="bg-white rounded-xl shadow-md p-6 text-center transform transition duration-300 hover:shadow-2xl hover:-translate-y-1 cursor-pointer"
                    >
                        <img
                            src={
                                member.photo
                                    ? `/${member.photo}`
                                    : "https://placehold.co/200x200?text=No+Image"
                            }
                            alt={member.name}
                            className="w-32 h-32 mx-auto rounded-full object-cover mb-4"
                        />
                        <h3 className="text-xl font-semibold text-gray-800">
                            {member.name}
                        </h3>
                        <p className="text-blue-600 font-medium mb-2">
                            {member.position}
                        </p>
                    </div>
                ))}
            </div>

            <Modal show={isModalOpen} onClose={closeModal} maxWidth="md">
                {selectedMember && (
                    <div className="p-6 max-h-[80vh] overflow-y-auto">
                        <div className="text-center">
                            <img
                                src={
                                    selectedMember.photo
                                        ? `/${selectedMember.photo}`
                                        : "https://placehold.co/200x200?text=No+Image"
                                }
                                alt={selectedMember.name}
                                className="w-32 h-32 mx-auto rounded-full object-cover mb-4"
                            />
                            <h2 className="text-2xl font-bold text-gray-800 mb-1">
                                {selectedMember.name}
                            </h2>
                            <p className="text-blue-600 font-medium mb-3">
                                {selectedMember.position}
                            </p>

                            {selectedMember.description && (
                                <p className="text-gray-700 text-sm leading-relaxed mb-4 text-justify">
                                    {selectedMember.description}
                                </p>
                            )}

                            <div className="text-sm text-gray-500 space-y-1">
                                {selectedMember.email && (
                                    <p>Email: {selectedMember.email}</p>
                                )}
                                {selectedMember.contact && (
                                    <p>Contact: {selectedMember.contact}</p>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </Modal>
        </section>
    );
}
