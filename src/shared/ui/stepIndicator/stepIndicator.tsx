import React from "react";
import styles from "./stepIndicator.module.css";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  totalSteps,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.titleText}>
        Шаг {currentStep} из {totalSteps}
      </div>
      <div className={styles.progressBar}>
        {Array.from({ length: totalSteps }, (_, index) => (
          <div
            key={index}
            className={`${styles.stepBlock} ${index < currentStep ? styles.active : ""}`}
          />
        ))}
      </div>
    </div>
  );
};
