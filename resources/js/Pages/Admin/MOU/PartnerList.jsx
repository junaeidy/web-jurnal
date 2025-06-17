import React, { useEffect, useState, useCallback } from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Input,
    Button,
    Spinner,
    Tooltip,
} from "@heroui/react";
import { EditIcon, DeleteIcon, PlusIcon } from "@/Components/Icons";
import AddPartner from "@/Components/Admin/MOU/AddPartner";
import EditPartner from "@/Components/Admin/MOU/EditPartner";
import ConfirmDialog from "@/Components/ConfirmDialog";
import axios from "axios";
import toast from "react-hot-toast";

const columns = [
    { name: "NO", key: "no" },
    { name: "NAMA", key: "name" },
    { name: "LOGO PARTNER", key: "logo" },
    { name: "LINK", key: "link" },
    { name: "TANGGAL BUAT", key: "created_at" },
    { name: "TANGGAL DIUBAH", key: "updated_at" },
    { name: "AKSI", key: "actions" },
];

const formatDateTime = (value) => {
    if (!value) return "-";
    const date = new Date(value);
    return date.toLocaleString("id-ID", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
    });
};

export default function PartnerList() {
    const [partners, setPartners] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedPartner, setSelectedPartner] = useState(null);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const fetchPartners = async () => {
        setLoading(true);
        try {
            const res = await axios.get("/api/partners");
            const withNo = res.data.map((item, idx) => ({
                ...item,
                no: idx + 1,
            }));
            setPartners(withNo);
        } catch {
            toast.error("Gagal memuat data partner");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPartners();
    }, []);

    const filteredPartners = partners.filter((p) =>
        (p.name || "").toLowerCase().includes(search.toLowerCase())
    );

    const totalPages = Math.ceil(filteredPartners.length / itemsPerPage);
    const paginatedPartners = filteredPartners.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    useEffect(() => {
        setCurrentPage(1);
    }, [search]);

    const handleEdit = (partner) => {
        setSelectedPartner(partner);
        setEditModalOpen(true);
    };

    const handleDelete = async () => {
        if (!selectedPartner) return;

        try {
            await axios.delete(`/api/partners/${selectedPartner.id}`);
            toast.success("Partner berhasil dihapus");
            fetchPartners();
        } catch {
            toast.error("Gagal menghapus partner");
        } finally {
            setSelectedPartner(null);
        }
    };

    const renderCell = useCallback((partner, columnKey) => {
        switch (columnKey) {
            case "no":
                return partner.no;
            case "name":
                return <div className="font-medium">{partner.name}</div>;
            case "logo":
                return partner.logo_url ? (
                    <img
                        src={partner.logo_url}
                        alt="logo"
                        className="h-10 object-contain rounded"
                    />
                ) : (
                    "-"
                );
            case "link":
                return partner.link ? (
                    <a
                        href={partner.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                    >
                        {partner.link}
                    </a>
                ) : (
                    <span className="text-gray-400 italic">Tidak ada</span>
                );
            case "created_at":
            case "updated_at":
                return <span>{formatDateTime(partner[columnKey])}</span>;
            case "actions":
                return (
                    <div className="flex items-center gap-2">
                        <Tooltip content="Edit">
                            <button
                                onClick={() => handleEdit(partner)}
                                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                            >
                                <EditIcon />
                            </button>
                        </Tooltip>
                        <Tooltip color="danger" content="Hapus">
                            <button
                                onClick={() => {
                                    setSelectedPartner(partner);
                                    setShowConfirmDialog(true);
                                }}
                                className="text-lg text-danger cursor-pointer active:opacity-50"
                            >
                                <DeleteIcon />
                            </button>
                        </Tooltip>
                    </div>
                );
            default:
                return partner[columnKey];
        }
    }, []);

    return (
        <div className="p-4 space-y-4">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <Input
                    isClearable
                    type="text"
                    placeholder="Cari partner..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full md:w-1/3"
                />
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <Button
                        color="primary"
                        endContent={<PlusIcon />}
                        onPress={() => setShowAddModal(true)}
                    >
                        Tambah
                    </Button>
                </div>
            </div>

            <Table aria-label="Tabel Partner">
                <TableHeader columns={columns}>
                    {(column) => (
                        <TableColumn
                            key={column.key}
                            align={
                                column.key === "actions" ? "center" : "start"
                            }
                        >
                            {column.name}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody
                    items={loading ? [] : paginatedPartners}
                    isLoading={loading}
                    loadingContent={<Spinner />}
                    emptyContent={!loading && "Tidak ada partner ditemukan."}
                >
                    {(item) => (
                        <TableRow key={item.id}>
                            {(columnKey) => (
                                <TableCell>
                                    {renderCell(item, columnKey)}
                                </TableCell>
                            )}
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            <div className="flex justify-between items-center mt-4">
                <span className="text-sm text-gray-600">
                    Halaman {currentPage} dari {totalPages}
                </span>
                <div className="flex gap-2">
                    <Button
                        size="sm"
                        variant="flat"
                        onPress={() =>
                            setCurrentPage((prev) => Math.max(prev - 1, 1))
                        }
                        disabled={currentPage === 1}
                    >
                        Sebelumnya
                    </Button>
                    <Button
                        size="sm"
                        variant="flat"
                        onPress={() =>
                            setCurrentPage((prev) =>
                                Math.min(prev + 1, totalPages)
                            )
                        }
                        disabled={currentPage === totalPages}
                    >
                        Selanjutnya
                    </Button>
                </div>
            </div>

            <AddPartner
                show={showAddModal}
                onClose={() => setShowAddModal(false)}
                onSuccess={fetchPartners}
            />

            <EditPartner
                show={editModalOpen}
                partner={selectedPartner}
                onClose={() => setEditModalOpen(false)}
                onSuccess={fetchPartners}
            />

            <ConfirmDialog
                isOpen={showConfirmDialog}
                onClose={() => setShowConfirmDialog(false)}
                onConfirm={handleDelete}
                title="Hapus Partner"
                message={`Yakin ingin menghapus partner "${selectedPartner?.name}"?`}
            />
        </div>
    );
}
