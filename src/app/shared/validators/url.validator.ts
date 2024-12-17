import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function urlValidator(): ValidatorFn {
  const urlRegex =
    /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(\/[\w-]*)*(\?.*)?(#.*)?$/i;
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) return null; // Dacă e gol, 'required' se va ocupa de el
    return urlRegex.test(value) ? null : { invalidUrl: true };
  };
}
