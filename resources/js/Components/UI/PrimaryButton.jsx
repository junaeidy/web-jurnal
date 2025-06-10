import { Button } from "@heroui/react";

export default function PrimaryButton({ children, loading = false, className = '', ...props }) {
  return (
    <Button
      isLoading={loading}
      color="primary"
      className={className}
      {...props}
    >
      {children}
    </Button>
  );
}