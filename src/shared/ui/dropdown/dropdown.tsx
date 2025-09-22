import React, { useState, useRef, useEffect } from "react";
import { type DropdownProps } from "./type";
import clsx from "clsx";
import styles from "./dropdown.module.css";
import { Checkbox } from "../checkbox/checkbox";

import Cross from "@assets/icons/cross.svg?react";
import ChevronDown from "@assets/icons/chevron-down.svg?react";
import ChevronUp from "@assets/icons/chevron-up.svg?react";

export const Dropdown: React.FC<DropdownProps> = ({
  type = "select",
  options,
  value,
  onChange,
  placeholder = "Выберите...",
  className,
  error,
  helperText,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value) {
      const newValues = Array.isArray(value) ? value : [value];
      setSelectedValues(newValues);
    } else {
      setSelectedValues([]);
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchQuery("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (optionValue: string) => {
    if (type === "multiselect") {
      const newValues = selectedValues.includes(optionValue)
        ? selectedValues.filter((v) => v !== optionValue)
        : [...selectedValues, optionValue];

      setSelectedValues(newValues);
      onChange?.(newValues);
    } else {
      const newValue = selectedValues[0] === optionValue ? "" : optionValue;
      setSelectedValues(newValue ? [newValue] : []);
      onChange?.(newValue);
      setIsOpen(false);
      if (type === "input") {
        setSearchQuery(
          newValue
            ? options.find((o) => o.value === newValue)?.label || ""
            : "",
        );
      }
    }
  };

  const clearSelection = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedValues([]);
    onChange?.(type === "multiselect" ? [] : "");
    setSearchQuery("");
  };

  const getDisplayText = () => {
    if (selectedValues.length === 0) return placeholder;
    if (type === "multiselect") {
      const selectedLabels = selectedValues.map(
        (value) => options.find((o) => o.value === value)?.label || value,
      );
      return selectedLabels.join(", ");
    }
    return (
      options.find((o) => o.value === selectedValues[0])?.label || placeholder
    );
  };

  const renderInput = () => {
    const inputClass = clsx(styles.searchInput, {
      [styles.placeholder]: selectedValues.length === 0,
      [styles.selected]: selectedValues.length > 0,
    });

    if (type === "input") {
      return (
        <input
          type="text"
          placeholder={placeholder}
          value={isOpen ? searchQuery : getDisplayText()}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={inputClass}
          autoFocus={isOpen}
          onClick={(e) => {
            e.stopPropagation();
            if (!isOpen) {
              setIsOpen(true);
              if (selectedValues.length > 0) {
                console.log(getDisplayText());
                setSearchQuery(getDisplayText());
              }
            }
          }}
          readOnly={!isOpen}
        />
      );
    }
    return (
      <div className={inputClass} onClick={toggleDropdown}>
        {getDisplayText()}
      </div>
    );
  };

  const renderIcon = () => {
    if ((searchQuery.length > 0 || selectedValues.length > 0) && isOpen) {
      return (
        <button
          className={styles.clearButton}
          onClick={clearSelection}
          type="button"
        >
          <Cross className={styles.icon} />
        </button>
      );
    }
    return isOpen ? (
      <ChevronUp className={styles.icon} onClick={toggleDropdown} />
    ) : (
      <ChevronDown className={styles.icon} onClick={toggleDropdown} />
    );
  };

  const renderOptions = () => {
    if (filteredOptions.length === 0) {
      return <div className={styles.notFound}>Ничего не найдено</div>;
    }

    return filteredOptions.map((option) => (
      <li
        key={option.value}
        className={clsx(styles.selectItem, {
          [styles.selected]: selectedValues.includes(option.value),
        })}
        onClick={() => handleSelect(option.value)}
      >
        {type === "multiselect" && (
          <Checkbox
            checkboxType="done"
            label=""
            isChecked={selectedValues.includes(option.value)}
            onChange={() => {
              handleSelect(option.value);
            }}
          />
        )}
        <span>{option.label}</span>
      </li>
    ));
  };

  return (
    <div className={clsx(styles.searchSelect, className)} ref={dropdownRef}>
      <div
        className={`${styles.content} ${error ? styles.error : ""}`}
        style={{ zIndex: isOpen ? 10 : undefined }}
      >
        <div
          className={styles.controls}
          style={{
            borderBlockEnd: isOpen ? "1px solid #E4E8DF" : undefined,
          }}
        >
          {renderInput()}
          {renderIcon()}
        </div>

        {isOpen && <ul className={styles.selectMenu}>{renderOptions()}</ul>}
      </div>
      {helperText && (
        <span
          className={`${styles.helperText} ${error ? styles.errorText : ""}`}
        >
          {helperText}
        </span>
      )}
    </div>
  );
};
