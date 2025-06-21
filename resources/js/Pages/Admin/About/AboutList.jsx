import React, { useEffect, useState, useCallback } from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Tooltip,
    Input,
    Button,
    Spinner,
} from "@heroui/react";
import { EditIcon, DeleteIcon, PlusIcon, EyeIcon } from "@/Components/Icons";
import AddAbout from "@/Components/Admin/About/AddAbout";
import EditAbout from "@/Components/Admin/About/EditAbout";
import ConfirmDialog from "@/Components/ConfirmDialog";
import toast from "react-hot-toast";
import PrimaryButton from "@/Components/UI/PrimaryButton";

const columns = [
    { name: "NO", key: "no" },
    { name: "JUDUL", key: "title" },
    { name: "GAMBAR", key: "image" },
    { name: "VIDEO", key: "video" },
    { name: "LINK", key: "link" },
    { name: "AKSI", key: "actions" },
];

export default function AboutList() {
    const [items, setItems] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const fetchData = () => {
        setLoading(true);
        fetch("/api/abouts")
            .then((res) => res.json())
            .then((data) => {
                const withNo = data.map((item, idx) => ({
                    ...item,
                    no: idx + 1,
                    video: item.video_url,
                    link: item.extra_link,
                }));
                setItems(withNo);
            })
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchData();
    }, []);

    const filteredItems = items.filter((item) =>
        item.title?.toLowerCase().includes(search.toLowerCase())
    );

    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
    const paginatedItems = filteredItems.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    useEffect(() => {
        setCurrentPage(1);
    }, [search]);

    const handleEdit = (item) => {
        setSelectedItem(item);
        setEditModalOpen(true);
    };

    const handleDelete = async () => {
        if (!selectedItem) return;

        try {
            const res = await fetch(`/api/abouts/${selectedItem.id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                toast.success("Data berhasil dihapus");
                fetchData();
            } else {
                toast.error("Gagal menghapus data");
            }
        } catch (error) {
            toast.error("Terjadi kesalahan saat menghapus");
        } finally {
            setSelectedItem(null);
            setShowConfirmDialog(false);
        }
    };

    const renderCell = useCallback((item, columnKey) => {
        switch (columnKey) {
            case "no":
                return item.no;
            case "title":
                return <div className="font-medium">{item.title}</div>;
            case "image":
                return (
                    <img
                        src={
                            item.image
                                ? `/storage/${item.image}`
                                : "https://placehold.co/100x100?text=No+Image"
                        }
                        alt="Banner"
                        className="w-16 h-16 object-cover rounded"
                    />
                );
            case "video":
                return item.video || "-";
            case "link":
                return item.link || "-";
            case "actions":
                return (
                    <div className="flex items-center gap-2">
                        <Tooltip content="Edit">
                            <button
                                onClick={() => handleEdit(item)}
                                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                            >
                                <EditIcon />
                            </button>
                        </Tooltip>
                        <Tooltip color="danger" content="Hapus">
                            <button
                                onClick={() => {
                                    setSelectedItem(item);
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
                    placeholder="Cari judul..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full md:w-1/3"
                />

                <PrimaryButton
                    endContent={<PlusIcon />}
                    onPress={() => setShowAddModal(true)}
                >
                    Tambah
                </PrimaryButton>
            </div>

            <Table aria-label="Tabel About">
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
                    items={loading ? [] : paginatedItems}
                    isLoading={loading}
                    loadingContent={<Spinner />}
                    emptyContent={!loading && "Tidak ada data ditemukan."}
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

            <AddAbout
                show={showAddModal}
                onClose={() => setShowAddModal(false)}
                onSuccess={fetchData}
            />

            <EditAbout
                show={editModalOpen}
                about={selectedItem}
                onClose={() => {
                    setEditModalOpen(false);
                    setSelectedItem(null);
                }}
                onSuccess={fetchData}
            />

            <ConfirmDialog
                isOpen={showConfirmDialog}
                onClose={() => setShowConfirmDialog(false)}
                onConfirm={handleDelete}
                title="Hapus Data"
                message={`Yakin ingin menghapus data "${selectedItem?.title}"? Tindakan ini tidak dapat dibatalkan.`}
            />
        </div>
    );
}
