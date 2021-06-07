import { ValidatorFn, AbstractControl } from "@angular/forms";


export function emailValidator(emailPattern: RegExp): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
        const emailValid = emailPattern.test(control.value);
        return !emailValid ? { 'emailNotValid': { value : control.value }} : null;
    };
}