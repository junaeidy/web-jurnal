import { useEffect, useState } from "react";
import axios from "axios";

export default function ListTeam({ onLoaded }) {
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        axios
            .get("/api/teams")
            .then((res) => {
                const activeTeams = res.data.filter(
                    (member) => member.is_active === 1
                );
                setTeams(activeTeams);
            })
            .catch((err) => console.error("Gagal mengambil data tim:", err))
            .finally(() => {
                if (onLoaded) onLoaded();
            });
    }, []);

    if (teams.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <img
                    src="/images/not-found.svg"
                    alt="Not Found"
                    className="w-60 mb-6"
                />
                <p className="text-gray-500 text-lg">
                    Belum ada anggota tim ditampilkan.
                </p>
            </div>
        );
    }

    return (
        <section className="max-w-6xl mx-auto px-4 py-12">
            <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">
                Tim Kami
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
                Kami adalah tim yang berdedikasi untuk mendukung kemajuan ilmu
                pengetahuan dan inovasi.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {teams.map((member) => (
                    <div
                        key={member.id}
                        className="bg-white rounded-xl shadow-md p-6 text-center transform transition duration-300 hover:shadow-2xl hover:-translate-y-1"
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
                        {member.description && (
                            <p className="text-sm text-gray-600 mb-2">
                                {member.description}
                            </p>
                        )}
                        {(member.email || member.contact) && (
                            <div className="text-sm text-gray-500 mt-2 space-y-1">
                                {member.email && <p>Email: {member.email}</p>}
                                {member.contact && (
                                    <p>Kontak: {member.contact}</p>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}
