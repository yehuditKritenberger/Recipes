import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
const passwordRegEx =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[~!@#$%^&*()_+-={}|;:'",<.>/?])(?=.*\S).{8,}$/;
const passwordPatternValidator = (): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    return control.value && !control.value.match(passwordRegEx)
      ? {
          invalidPassword: true,
        }
      : null;
  };
};
export const passwordValidator = passwordPatternValidator();