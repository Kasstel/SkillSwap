import React, { type FC } from "react";
import style from "./search-input.module.css";
import Search from "@assets/icons/search.svg?react";
import Cross from "@assets/icons/cross.svg?react";

interface SearchInputUIProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchInputUI: FC<SearchInputUIProps> = ({ value, onChange }) => {
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };
  return (
    <div className={style.wrapper}>
      <div className={style.inputWrapper}>
        <Search className={style.icon} />
        <input
          type="search"
          placeholder="Искать навык"
          value={value}
          onChange={handleOnChange}
          className={style.input}
        />
      </div>

      {value && (
        <button className={style.button} onClick={() => onChange("")}>
          <Cross className={style.icon} />
        </button>
      )}
    </div>
  );
};
