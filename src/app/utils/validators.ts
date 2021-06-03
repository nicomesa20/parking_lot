import { AbstractControl } from '@angular/forms'

export class CustomValidators {

    static matchPassword(control: AbstractControl) {
        const password = control.get('password').value
        const confirmPassword = control.get('confirm_password').value
        if (password === confirmPassword) {
            return null
        }
        return {match_password: true}
    }
}