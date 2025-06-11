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
import AddTeamMember from "@/Components/Admin/Team/AddTeamMember";
import EditTeamMember from "@/Components/Admin/Team/EditTeamMember";
import ConfirmDialog from "@/Components/ConfirmDialog";
// import TeamMemberDetail from "@/Components/Admin/Team/TeamMemberDetail";
import toast from "react-hot-toast";

const columns = [
    { name: "NO", key: "no" },
    { name: "FOTO", key: "photo" },
    { name: "NAMA", key: "name" },
    { name: "JABATAN", key: "position" },
    { name: "EMAIL", key: "email" },
    { name: "KONTAK", key: "contact" },
    { name: "STATUS", key: "is_active" },
    { name: "AKSI", key: "actions" },
];

const statusColorMap = {
    true: "success",
    false: "danger",
};

export default function TeamList() {
    const [members, setMembers] = useState([]);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [showAddModal, setShowAddModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [selectedMember, setSelectedMember] = useState(null);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [isDetailOpen, setIsDetailOpen] = useState(false);

    const fetchMembers = () => {
        setLoading(true);
        fetch("/api/teams")
            .then((res) => res.json())
            .then((data) => {
                const withNo = data.map((item, idx) => ({
                    ...item,
                    no: idx + 1,
                }));
                setMembers(withNo);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchMembers();
    }, []);

    const filteredMembers = members.filter((member) => {
        const matchesSearch = (member.name || "")
            .toLowerCase()
            .includes(search.toLowerCase());
        const matchesStatus =
            statusFilter === "all" ||
            (statusFilter === "active" && member.is_active) ||
            (statusFilter === "inactive" && !member.is_active);
        return matchesSearch && matchesStatus;
    });

    const handleEdit = (id) => {
        setSelectedId(id);
        setEditModalOpen(true);
    };

    const handleDelete = async () => {
        if (!selectedMember) return;

        try {
            const res = await fetch(`/api/teams/${selectedMember.id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                toast.success("Anggota tim berhasil dihapus");
                fetchMembers();
            } else {
                toast.error("Gagal menghapus anggota tim");
            }
        } catch (error) {
            toast.error("Terjadi kesalahan saat menghapus");
        } finally {
            setSelectedMember(null);
        }
    };

    const handleShowDetail = (member) => {
        setSelectedMember(member);
        setIsDetailOpen(true);
    };

    const renderCell = useCallback((member, columnKey) => {
        switch (columnKey) {
            case "no":
                return member.no;
            case "photo":
                return (
                    <img
                        src={
                            member.photo
                                ? `/${member.photo}`
                                : "https://placehold.co/100x100?text=No+Image"
                        }
                        alt="Foto"
                        className="w-12 h-12 object-cover rounded-full"
                    />
                );
            case "name":
                return <div className="font-medium">{member.name}</div>;
            case "position":
                return member.position;
            case "email":
                return member.email || "-";
            case "contact":
                return member.contact || "-";
            case "is_active":
                return (
                    <Chip
                        color={statusColorMap[member.is_active]}
                        size="sm"
                        variant="flat"
                    >
                        {member.is_active ? "Aktif" : "Tidak Aktif"}
                    </Chip>
                );
            case "actions":
                return (
                    <div className="flex items-center gap-2">
                        <Tooltip content="Detail">
                            <span
                                onClick={() => handleShowDetail(member)}
                                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                            >
                                <EyeIcon />
                            </span>
                        </Tooltip>
                        <Tooltip content="Edit">
                            <button
                                onClick={() => handleEdit(member.id)}
                                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                            >
                                <EditIcon />
                            </button>
                        </Tooltip>
                        <Tooltip color="danger" content="Hapus">
                            <button
                                onClick={() => {
                                    setSelectedMember(member);
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
                return member[columnKey];
        }
    }, []);

    return (
        <div className="p-4 space-y-4">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <Input
                    isClearable
                    type="text"
                    placeholder="Cari nama anggota..."
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

            <Table aria-label="Tabel Tim">
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
                    items={loading ? [] : filteredMembers}
                    isLoading={loading}
                    loadingContent={<Spinner />}
                    emptyContent={!loading && "Tidak ada anggota tim ditemukan."}
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

            <AddTeamMember
                show={showAddModal}
                onClose={() => setShowAddModal(false)}
                onSuccess={fetchMembers}
            />

            <EditTeamMember
                show={editModalOpen}
                memberId={selectedId}
                onClose={() => setEditModalOpen(false)}
                onSuccess={fetchMembers}
            />

            {/* <TeamMemberDetail
                isOpen={isDetailOpen}
                onClose={() => setIsDetailOpen(false)}
                member={selectedMember}
            /> */}

            <ConfirmDialog
                isOpen={showConfirmDialog}
                onClose={() => setShowConfirmDialog(false)}
                onConfirm={handleDelete}
                title="Hapus Anggota"
                message={`Yakin ingin menghapus "${selectedMember?.name}"? Tindakan ini tidak dapat dibatalkan.`}
            />
        </div>
    );
}
