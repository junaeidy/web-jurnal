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
import { EditIcon, DeleteIcon, PlusIcon } from "@/Components/Icons";
import AddActivity from "@/Components/Admin/Event/AddActivity";
import EditActivity from "@/Components/Admin/Event/EditActivity";
import ConfirmDialog from "@/Components/ConfirmDialog";
import toast from "react-hot-toast";
import PrimaryButton from "@/Components/UI/PrimaryButton";

const columns = [
    { name: "NO", key: "no" },
    { name: "POSTER", key: "image" },
    { name: "JUDUL", key: "title" },
    { name: "TANGGAL", key: "date" },
    { name: "LOKASI", key: "location" },
    { name: "STATUS", key: "is_active" },
    { name: "AKSI", key: "actions" },
];

const statusColorMap = {
    true: "success",
    false: "danger",
};

export default function KegiatanList() {
    const [activities, setActivities] = useState([]);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [showAddModal, setShowAddModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [selectedActivity, setSelectedActivity] = useState(null);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const fetchActivities = () => {
        setLoading(true);
        fetch("/api/events")
            .then((res) => res.json())
            .then((data) => {
                const withNo = data.map((item, idx) => ({
                    ...item,
                    no: idx + 1,
                }));
                setActivities(withNo);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchActivities();
    }, []);

    const filteredActivities = activities.filter((act) => {
        const matchesSearch = (act.title || "")
            .toLowerCase()
            .includes(search.toLowerCase());
        const matchesStatus =
            statusFilter === "all" ||
            (statusFilter === "active" && act.is_active) ||
            (statusFilter === "inactive" && !act.is_active);
        return matchesSearch && matchesStatus;
    });

    const totalPages = Math.ceil(filteredActivities.length / itemsPerPage);
    const paginatedActivities = filteredActivities.slice(
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
        if (!selectedActivity) return;

        try {
            const res = await fetch(`/api/events/${selectedActivity.id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                toast.success("Kegiatan berhasil dihapus");
                fetchActivities();
            } else {
                toast.error("Gagal menghapus kegiatan");
            }
        } catch (error) {
            toast.error("Terjadi kesalahan saat menghapus");
        } finally {
            setSelectedActivity(null);
        }
    };

    const renderCell = useCallback((item, columnKey) => {
        switch (columnKey) {
            case "no":
                return item.no;
            case "image":
                return (
                    <img
                        src={
                            item.image
                                ? `/storage/${item.image}`
                                : "https://placehold.co/100x100?text=No+Image"
                        }
                        alt="Poster"
                        className="w-14 h-14 object-cover rounded"
                    />
                );
            case "title":
                return <div className="font-medium">{item.title}</div>;
            case "date":
                return item.event_date || "-";
            case "location":
                return item.location || "-";
            case "is_active":
                return (
                    <Chip
                        color={statusColorMap[Boolean(item.is_active)]}
                        size="sm"
                        variant="flat"
                    >
                        {item.is_active ? "Active" : "Inactive"}
                    </Chip>
                );
            case "actions":
                return (
                    <div className="flex items-center gap-2">
                        <Tooltip content="Edit">
                            <button
                                onClick={() => handleEdit(item.id)}
                                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                            >
                                <EditIcon />
                            </button>
                        </Tooltip>
                        <Tooltip color="danger" content="Hapus">
                            <button
                                onClick={() => {
                                    setSelectedActivity(item);
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
                return item[columnKey];
        }
    }, []);

    return (
        <div className="p-4 space-y-4">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <Input
                    isClearable
                    type="text"
                    placeholder="Cari judul kegiatan..."
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
                        <SelectItem key="active" value="active">
                            Aktif
                        </SelectItem>
                        <SelectItem key="inactive" value="inactive">
                            Tidak Aktif
                        </SelectItem>
                    </Select>

                    <PrimaryButton
                        endContent={<PlusIcon />}
                        onPress={() => setShowAddModal(true)}
                    >
                        Tambah
                    </PrimaryButton>
                </div>
            </div>

            <Table aria-label="Tabel Kegiatan">
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
                    items={loading ? [] : paginatedActivities}
                    isLoading={loading}
                    loadingContent={<Spinner />}
                    emptyContent={!loading && "Tidak ada kegiatan ditemukan."}
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
                        onClick={() =>
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

            <AddActivity
                show={showAddModal}
                onClose={() => setShowAddModal(false)}
                onSuccess={fetchActivities}
            />

            <EditActivity
                show={editModalOpen}
                activityId={selectedId}
                onClose={() => setEditModalOpen(false)}
                onSuccess={fetchActivities}
            />

            <ConfirmDialog
                isOpen={showConfirmDialog}
                onClose={() => setShowConfirmDialog(false)}
                onConfirm={handleDelete}
                title="Hapus Kegiatan"
                message={`Yakin ingin menghapus "${selectedActivity?.title}"? Tindakan ini tidak dapat dibatalkan.`}
            />
        </div>
    );
}
