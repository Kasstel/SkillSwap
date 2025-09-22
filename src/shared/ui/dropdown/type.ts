export type DropdownOption = {
  value: string;
  label: string;
};

export type DropdownType = "select" | "multiselect" | "input";

export type DropdownProps = {
  type?: DropdownType;
  options: DropdownOption[];
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  placeholder?: string;
  className?: string;
  error?: boolean;
  helperText?: string;
};
