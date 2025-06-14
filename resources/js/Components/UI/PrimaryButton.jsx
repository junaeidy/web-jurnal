import { Button } from "@heroui/react";

export default function PrimaryButton({ children, loading = false, className = '', ...props }) {
  return (
    <Button
      isLoading={loading}
      className={`bg-[#50c878] hover:bg-[#3fa767] text-white font-medium rounded-lg px-4 py-2 transition duration-300 ${className}`}
      {...props}
    >
      {children}
    </Button>
  );
}
