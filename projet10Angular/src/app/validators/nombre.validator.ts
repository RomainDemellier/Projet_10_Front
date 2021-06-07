import { AbstractControl } from '@angular/forms';

export function onlyNumbers(control: AbstractControl): { [key: string]: any } | null {
    const testOnlyNumbers = /^[1-9]\d*$/.test(control.value);
    return testOnlyNumbers ? null : { 'onlyNumbers': { value: control.value }};
}