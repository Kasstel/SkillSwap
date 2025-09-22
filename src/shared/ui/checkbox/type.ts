export type CheckboxType = "done" | "remove";

export type CheckboxProps = {
  checkboxType: CheckboxType;
  label: string;
  disabled?: boolean;
  isChecked?: boolean;
  onChange?: (checked: boolean) => void;
};
