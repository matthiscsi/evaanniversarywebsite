export const CORRECT_PIN = "467946";
export const PIN_LENGTH = 6;

export function isValidPin(enteredPin: string): boolean {
  return enteredPin === CORRECT_PIN;
}
