import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";

export default function JournalDetail({ isOpen, onClose, journal }) {
    if (!journal) return null;

    const statusStyle = journal.is_active
        ? {
              text: "Aktif",
              icon: <CheckCircleIcon className="h-5 w-5 text-green-500" />,
              bg: "bg-green-100 text-green-700",
          }
        : {
              text: "Tidak",
              icon: <XCircleIcon className="h-5 w-5 text-red-500" />,
              bg: "bg-red-100 text-red-700",
          };

    const truncate = (str, length = 35) => {
        return str.length > length ? str.substring(0, length) + "..." : str;
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-6 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-2xl transition-all">
                                <Dialog.Title className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">
                                    Detail Jurnal
                                </Dialog.Title>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm text-gray-700">
                                    <div>
                                        <div className="font-semibold text-gray-500">
                                            Judul
                                        </div>
                                        <div>{journal.title}</div>
                                    </div>
                                    <div>
                                        <div className="font-semibold text-gray-500">
                                            Penulis
                                        </div>
                                        <div>{journal.authors}</div>
                                    </div>
                                    <div>
                                        <div className="font-semibold text-gray-500">
                                            Kategori
                                        </div>
                                        <div>
                                            {journal.category?.name ?? "-"}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-semibold text-gray-500">
                                            Tahun Terbit
                                        </div>
                                        <div>
                                            {journal.published_year ?? "-"}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-semibold text-gray-500">
                                            Link
                                        </div>
                                        <a
                                            href={journal.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 underline break-all"
                                        >
                                            {truncate(journal.link)}
                                        </a>
                                    </div>
                                    <div>
                                        <div className="font-semibold text-gray-500">
                                            Acceptance Rate
                                        </div>
                                        <div>
                                            {journal.acceptance_rate ?? "-"}%
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-semibold text-gray-500">
                                            Decision Days
                                        </div>
                                        <div>
                                            {journal.decision_days ?? "-"} hari
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-semibold text-gray-500">
                                            Impact Factor
                                        </div>
                                        <div>
                                            {journal.impact_factor ?? "-"}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-semibold text-gray-500">
                                            Unggulan
                                        </div>
                                        <div
                                            className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${statusStyle.bg}`}
                                        >
                                            {statusStyle.icon}
                                            <span className="ml-1">
                                                {statusStyle.text}
                                            </span>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-semibold text-gray-500">
                                            Status
                                        </div>
                                        <div
                                            className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${statusStyle.bg}`}
                                        >
                                            {statusStyle.icon}
                                            <span className="ml-1">
                                                {statusStyle.text}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <div className="font-semibold text-gray-500 mb-1">
                                            Deskripsi
                                        </div>
                                        <div className="bg-gray-100 rounded p-3 text-gray-700">
                                            {journal.description || "-"}
                                        </div>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <div className="font-semibold text-gray-500 mb-2">
                                            Cover
                                        </div>
                                        {journal.cover ? (
                                            <img
                                                src={`/${journal.cover}`}
                                                alt="Cover"
                                                className="w-full max-w-xs rounded-lg shadow border"
                                            />
                                        ) : (
                                            <div className="text-gray-400 italic">
                                                Tidak ada gambar
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="mt-6 text-right">
                                    <button
                                        onClick={onClose}
                                        className="inline-flex items-center px-4 py-2 bg-gray-700 text-white text-sm rounded-lg hover:bg-gray-800 transition"
                                    >
                                        Tutup
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
