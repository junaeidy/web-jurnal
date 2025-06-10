import { Checkbox } from "@heroui/react";

export default function CustomCheckbox({ className = '', ...props }) {
  return (
    <Checkbox
      className={className}
      {...props}
    />
  );
}