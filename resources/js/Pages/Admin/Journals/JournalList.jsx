import React, { useEffect, useState, useCallback } from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Chip,
    Tooltip,
    Input,
    Select,
    SelectItem,
    Button,
    Spinner,
} from "@heroui/react";
import { EyeIcon, EditIcon, DeleteIcon, PlusIcon } from "@/Components/Icons";
import AddJournal from "@/Components/Admin/Journal/AddJournal";
import EditJournal from "@/Components/Admin/Journal/EditJournal";
import ConfirmDialog from "@/Components/ConfirmDialog";
import JournalDetail from "@/Components/Admin/Journal/JournalDetail";
import toast from "react-hot-toast";
import PrimaryButton from "@/Components/UI/PrimaryButton";

const columns = [
    { name: "NO", key: "no" },
    { name: "COVER", key: "cover" },
    { name: "TITLE", key: "title" },
    { name: "ACCEPTANCE RATE", key: "acceptance_rate" },
    { name: "DECISION DAYS", key: "decision_days" },
    { name: "IMPACT FACTOR", key: "impact_factor" },
    { name: "STATUS", key: "is_active" },
    { name: "UNGGULAN", key: "is_featured" },
    { name: "ACTIONS", key: "actions" },
];

const statusColorMap = {
    true: "success",
    false: "danger",
};

export default function JournalList() {
    const [journals, setJournals] = useState([]);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [showAddModal, setShowAddModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [selectedJournal, setSelectedJournal] = useState(null);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const handleAddSuccess = () => {
        fetchJournals();
    };

    const fetchJournals = () => {
        setLoading(true);
        fetch("/api/journals")
            .then((res) => res.json())
            .then((resData) => {
                const rawData = resData.data || [];
                const withNo = rawData.map((item, idx) => ({
                    ...item,
                    no: idx + 1,
                }));
                setJournals(withNo);
            })
            .catch((err) => {
                console.error("Gagal fetch data jurnal:", err);
                setJournals([]);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchJournals();
    }, []);

    const filteredJournals = journals.filter((journal) => {
        const matchesSearch = (journal.title?.id || "")
            .toLowerCase()
            .includes(search.toLowerCase());
        const matchesStatus =
            statusFilter === "all" ||
            (statusFilter === "published" && journal.is_active) ||
            (statusFilter === "draft" && !journal.is_active);
        return matchesSearch && matchesStatus;
    });

    const totalPages = Math.ceil(filteredJournals.length / itemsPerPage);
    const paginatedJournals = filteredJournals.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    useEffect(() => {
        setCurrentPage(1);
    }, [search, statusFilter]);

    const handleEdit = (id) => {
        setSelectedId(id);
        setEditModalOpen(true);
    };

    const handleDelete = async () => {
        if (!selectedJournal) return;

        try {
            const res = await fetch(`/api/journals/${selectedJournal.id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                toast.success("Jurnal berhasil dihapus");
                fetchJournals();
            } else {
                toast.error("Gagal menghapus jurnal");
            }
        } catch (error) {
            toast.error("Terjadi kesalahan saat menghapus jurnal");
            console.error(error);
        } finally {
            setSelectedJournal(null);
        }
    };

    const handleShowDetail = (journal) => {
        setSelectedJournal(journal);
        setIsDetailOpen(true);
    };

    const renderCell = useCallback((journal, columnKey) => {
        switch (columnKey) {
            case "no":
                return journal.no;
            case "cover":
                return (
                    <img
                        src={
                            journal.cover
                                ? `/${journal.cover}`
                                : "https://placehold.co/250x400?text=No+Image"
                        }
                        alt="cover"
                        className="w-12 h-12 object-cover rounded"
                    />
                );
            case "title":
                return (
                    <div className="text-sm font-semibold">
                        {journal.title?.id || "-"}
                    </div>
                );
            case "acceptance_rate":
                return journal.acceptance_rate
                    ? `${journal.acceptance_rate}%`
                    : "-";
            case "decision_days":
                return journal.decision_days ?? "-";
            case "impact_factor":
                return journal.impact_factor ?? "-";
            case "is_featured":
                return (
                    <Chip
                        className="capitalize"
                        color={journal.is_featured ? "warning" : "default"}
                        size="sm"
                        variant="flat"
                    >
                        {journal.is_featured ? "Unggulan" : "Biasa"}
                    </Chip>
                );
            case "is_active":
                return (
                    <Chip
                        className="capitalize"
                        color={statusColorMap[journal.is_active]}
                        size="sm"
                        variant="flat"
                    >
                        {journal.is_active ? "Published" : "Draft"}
                    </Chip>
                );
            case "actions":
                return (
                    <div className="flex items-center gap-2">
                        <Tooltip content="Detail">
                            <span
                                onClick={() => handleShowDetail(journal)}
                                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                            >
                                <EyeIcon />
                            </span>
                        </Tooltip>

                        <Tooltip content="Edit jurnal">
                            <button
                                onClick={() => handleEdit(journal.id)}
                                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                            >
                                <EditIcon />
                            </button>
                        </Tooltip>

                        <Tooltip color="danger" content="Hapus jurnal">
                            <button
                                onClick={() => {
                                    setSelectedJournal(journal);
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
                return journal[columnKey];
        }
    }, []);

    return (
        <div className="p-4 space-y-4">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <Input
                    isClearable
                    type="text"
                    placeholder="Cari jurnal..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full md:w-1/3"
                />

                <div className="flex items-center gap-3 w-full md:w-auto">
                    <Select
                        className="w-36"
                        aria-label="Filter Status"
                        selectedKeys={[statusFilter]}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <SelectItem key="all" value="all">
                            Semua Status
                        </SelectItem>
                        <SelectItem key="published" value="published">
                            Published
                        </SelectItem>
                        <SelectItem key="draft" value="draft">
                            Draft
                        </SelectItem>
                    </Select>

                    <PrimaryButton
                        color="primary"
                        endContent={<PlusIcon />}
                        onPress={() => setShowAddModal(true)}
                    >
                        Tambah
                    </PrimaryButton>
                </div>
            </div>

            <Table aria-label="Tabel Jurnal">
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
                    items={loading ? [] : paginatedJournals}
                    isLoading={loading}
                    loadingContent={<Spinner />}
                    emptyContent={!loading && "Tidak ada data jurnal."}
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
                        onClick={() =>
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

            <AddJournal
                show={showAddModal}
                onClose={() => setShowAddModal(false)}
                onSuccess={handleAddSuccess}
            />

            <EditJournal
                show={editModalOpen}
                journalId={selectedId}
                onClose={() => setEditModalOpen(false)}
                onSuccess={() => fetchJournals()}
            />

            <JournalDetail
                isOpen={isDetailOpen}
                onClose={() => setIsDetailOpen(false)}
                journal={selectedJournal}
            />

            <ConfirmDialog
                isOpen={showConfirmDialog}
                onClose={() => setShowConfirmDialog(false)}
                onConfirm={handleDelete}
                title="Hapus Jurnal"
                message={`Apakah kamu yakin ingin menghapus jurnal "${selectedJournal?.title?.id}"? Ini tidak bisa dikembalikan.`}
            />
        </div>
    );
}
