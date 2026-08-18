export const CORRECT_PIN = "4679";
export const PIN_LENGTH = 4;

export function isValidPin(enteredPin: string): boolean {
  return enteredPin === CORRECT_PIN;
}
