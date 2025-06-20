import { Button } from "@heroui/react";

export default function PrimaryButton({
    children,
    loading = false,
    className = "",
    ...props
}) {
    return (
        <Button
            isLoading={loading}
            className={`bg-[#2A7C4C] hover:bg-[#256d44] text-white font-semibold py-2 px-4 rounded-md shadow-sm disabled:opacity-60 transition ${className}`}
            {...props}
        >
            {children}
        </Button>
    );
}
