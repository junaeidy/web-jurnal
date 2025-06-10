import { Button } from "@heroui/react";

export default function DangerButton({ className = '', disabled, children, ...props }) {
  return (
    <Button
      color="danger"
      disabled={disabled}
      className={className}
      {...props}
    >
      {children}
    </Button>
  );
}