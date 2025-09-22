import styles from "./photo-switcher.module.css";
import Left from "@assets/icons/chevron-right.svg?react";
import Right from "@assets/icons/chevron-right.svg?react";
import clsx from "clsx";
import { useEffect, useState } from "react";
import skillsData from "@public/db/skills.json";

type PhotoSwitcherProps = {
  skillId?: string;
};

export const PhotoSwitcherUI = ({ skillId }: PhotoSwitcherProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState<string[]>([]);

  // Под грузка изображение по ID
  useEffect(() => {
    const skill = skillsData.skills.find((s) => s.id === skillId);

    if (skill) {
      setImages(skill.images);
      setCurrentIndex(0);
    }
  }, [skillId]);

  // Переключатель влево
  const prevImages = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  // Переключатель вправо
  const nextImages = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // Если изображение не найдено
  if (images.length === 0) return <div>Изображения не найдены</div>;

  return (
    <div className={styles.wrapper}>
      <div className={styles.mainImages}>
        <button
          className={clsx(styles.arrow, styles.left)}
          onClick={prevImages}
        >
          <Left className={styles.icon} />
        </button>
        <img
          src={images[currentIndex].replace("..", "")}
          alt={`images-${currentIndex}`}
        />
        <button
          className={clsx(styles.arrow, styles.right)}
          onClick={nextImages}
        >
          <Right className={styles.icon} />
        </button>
      </div>

      <div className={styles.sideImages}>
        {/* показываем первые 3 изображения в миниатюрах*/}
        {images
          .filter((_, i) => i !== currentIndex)
          .slice(0, 3)
          .map((image, i) => (
            <img
              src={image.replace("..", "")}
              alt={`image-${image}`}
              className={styles.side}
              key={i}
            />
          ))}

        {/* показываем +N, если больше 3 изображений */}
        {images.length > 3 && (
          <div className={styles.more}>
            <span>+ {images.length - 3}</span>
          </div>
        )}
      </div>
    </div>
  );
};
