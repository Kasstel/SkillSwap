/**
 * Функция для правильного склонения слова "год" в зависимости от возраста
 * @param age - возраст в годах
 * @returns строка с возрастом и правильным склонением
 */
export const getAgeWithDeclension = (age: number): string => {
  const lastDigit = age % 10;
  const lastTwoDigits = age % 100;

  // Исключения: 11, 12, 13, 14 лет
  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    return `${age} лет`;
  }

  // Для остальных случаев смотрим на последнюю цифру
  switch (lastDigit) {
    case 1:
      return `${age} год`;
    case 2:
    case 3:
    case 4:
      return `${age} года`;
    default:
      return `${age} лет`;
  }
};
