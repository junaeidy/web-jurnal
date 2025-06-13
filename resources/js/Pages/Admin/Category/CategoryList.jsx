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
import AddCategory from "@/Components/Admin/Category/AddCategory";
import EditCategory from "@/Components/Admin/Category/EditCategory";
import ConfirmDialog from "@/Components/ConfirmDialog";
import axios from "axios";
import toast from "react-hot-toast";

const columns = [
    { name: "NO", key: "no" },
    { name: "NAMA", key: "name" },
    { name: "STATUS", key: "is_active" },
    { name: "AKSI", key: "actions" },
];

const statusColorMap = {
    true: "success",
    false: "danger",
};

export default function CategoryList() {
    const [categories, setCategories] = useState([]);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [loading, setLoading] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const res = await axios.get("/api/categories");
            const withNo = res.data.map((item, idx) => ({
                ...item,
                no: idx + 1,
            }));
            setCategories(withNo);
        } catch {
            toast.error("Gagal memuat data kategori");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const filteredCategories = categories.filter((cat) => {
        const matchesSearch = (cat.name || "").toLowerCase().includes(search.toLowerCase());
        const matchesStatus =
            statusFilter === "all" ||
            (statusFilter === "active" && cat.is_active) ||
            (statusFilter === "inactive" && !cat.is_active);
        return matchesSearch && matchesStatus;
    });

    const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
    const paginatedCategories = filteredCategories.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    useEffect(() => {
        setCurrentPage(1);
    }, [search, statusFilter]);

    const handleEdit = (category) => {
        setSelectedCategory(category);
        setEditModalOpen(true);
    };

    const handleDelete = async () => {
        if (!selectedCategory) return;

        try {
            await axios.delete(`/api/categories/${selectedCategory.id}`);
            toast.success("Kategori berhasil dihapus");
            fetchCategories();
        } catch {
            toast.error("Gagal menghapus kategori");
        } finally {
            setSelectedCategory(null);
        }
    };

    const renderCell = useCallback((cat, columnKey) => {
        switch (columnKey) {
            case "no":
                return cat.no;
            case "name":
                return <div className="font-medium">{cat.name}</div>;
            case "is_active":
                return (
                    <Chip
                        className="capitalize"
                        color={statusColorMap[Boolean(cat.is_active)]}
                        size="sm"
                        variant="flat"
                    >
                        {cat.is_active ? "Aktif" : "Tidak Aktif"}
                    </Chip>
                );
            case "actions":
                return (
                    <div className="flex items-center gap-2">
                        <Tooltip content="Edit">
                            <button
                                onClick={() => handleEdit(cat)}
                                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                            >
                                <EditIcon />
                            </button>
                        </Tooltip>
                        <Tooltip color="danger" content="Hapus">
                            <button
                                onClick={() => {
                                    setSelectedCategory(cat);
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
                return cat[columnKey];
        }
    }, []);

    return (
        <div className="p-4 space-y-4">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <Input
                    isClearable
                    type="text"
                    placeholder="Cari kategori..."
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

                    <Button
                        color="primary"
                        endContent={<PlusIcon />}
                        onPress={() => setShowAddModal(true)}
                    >
                        Tambah
                    </Button>
                </div>
            </div>

            <Table aria-label="Tabel Kategori">
                <TableHeader columns={columns}>
                    {(column) => (
                        <TableColumn
                            key={column.key}
                            align={column.key === "actions" ? "center" : "start"}
                        >
                            {column.name}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody
                    items={loading ? [] : paginatedCategories}
                    isLoading={loading}
                    loadingContent={<Spinner />}
                    emptyContent={!loading && "Tidak ada kategori ditemukan."}
                >
                    {(item) => (
                        <TableRow key={item.id}>
                            {(columnKey) => (
                                <TableCell>{renderCell(item, columnKey)}</TableCell>
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
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                    >
                        Sebelumnya
                    </Button>
                    <Button
                        size="sm"
                        variant="flat"
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                    >
                        Selanjutnya
                    </Button>
                </div>
            </div>

            <AddCategory
                show={showAddModal}
                onClose={() => setShowAddModal(false)}
                onSuccess={fetchCategories}
            />

            <EditCategory
                show={editModalOpen}
                category={selectedCategory}
                onClose={() => setEditModalOpen(false)}
                onSuccess={fetchCategories}
            />

            <ConfirmDialog
                isOpen={showConfirmDialog}
                onClose={() => setShowConfirmDialog(false)}
                onConfirm={handleDelete}
                title="Hapus Kategori"
                message={`Yakin ingin menghapus kategori "${selectedCategory?.name}"?`}
            />
        </div>
    );
}
