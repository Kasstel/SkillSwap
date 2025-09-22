import React, { useState } from "react";
import styles from "./drag-and-drop.module.css";
import { Icon } from "./icon.tsx";

interface DragAndDropUIProps {
  onFileChange?: (file: File | null) => void;
}

export const DragAndDropUI: React.FC<DragAndDropUIProps> = ({
  onFileChange,
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState<boolean>(false);

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFiles([selectedFile]);
      if (onFileChange) onFileChange(selectedFile);
    }
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleLive = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      setFiles([droppedFile]);
      if (onFileChange) onFileChange(droppedFile);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div
        className={`${styles.form} ${dragActive ? styles.drag : ""}`}
        onDragEnter={handleDrag}
        onDragLeave={handleLive}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <span className={styles.title}>
          Перетащите или выберите изображения навыка
        </span>
        <label className={styles.label}>
          <Icon className={styles.icon} />
          <input
            type="file"
            className={styles.input}
            multiple={false}
            onChange={handleFilesChange}
          />
          <span className={styles.text}>Выбрать изображение</span>
        </label>

        <div className={styles.file}>
          {files.length > 0 && (
            <ul className={styles.fileList}>
              {files.map(({ name }, id) => (
                <li key={id} className={styles.title}>
                  {name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
