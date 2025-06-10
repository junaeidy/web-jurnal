const submissions = [
    {
        id: "1",
        name: "Budi Hartono",
        date: "2025-05-17",
        status: "Tidak Aktif",
        cover: "📄",
    },
    {
        id: "2",
        name: "Sari Lestari",
        date: "2025-05-16",
        status: "Aktif",
        cover: "🌴",
    },
    {
        id: "3",
        name: "Andi Saputra",
        date: "2025-05-15",
        status: "Tidak Aktif",
        cover: "💼",
    },
    {
        id: "4",
        name: "Dewi Rahma",
        date: "2025-05-14",
        status: "Aktif",
        cover: "🌴",
    },
    {
        id: "5",
        name: "Dwi Hartono",
        date: "2025-05-14",
        status: "Tidak Aktif",
        cover: "🌴",
    },
];

export default function RecentJournals() {
    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow w-full">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                    Jurnal Terbaru
                </h2>
              <a href="#" className="text-blue-600 hover:underline">
                Lihat Semua
              </a>
            </div>
            <table className="w-full text-sm text-left">
                <thead className="text-gray-400 border-b dark:text-gray-300">
                    <tr>
                        <th></th>
                        <th>No</th>
                        <th>Gambar Jurnal</th>
                        <th>Nama Jurnal</th>
                        <th>Tanggal Publikasi</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {submissions.map((item, index) => (
                        <tr
                            key={item.id}
                            className={`border-b dark:border-gray-700 ${
                                index % 2 === 1
                                    ? "bg-gray-50 dark:bg-gray-700"
                                    : ""
                            }`}
                        >
                            <td>
                                <input type="checkbox" />
                            </td>
                            <td className="py-2">{item.id}</td>
                            <td>{item.cover}</td>
                            <td className="flex items-center py-2">
                                {item.name}
                            </td>
                            <td>{item.date}</td>
                            <td>
                                <span
                                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                                        item.status === "Aktif"
                                            ? "bg-green-100 text-green-600"
                                            : item.status === "Tidak Aktif"
                                            ? "bg-red-100 text-red-600"
                                            : "bg-yellow-100 text-yellow-600"
                                    }`}
                                >
                                    {item.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex justify-between items-center mt-4 text-sm text-gray-500 dark:text-gray-300">
                
            </div>
        </div>
    );
}
