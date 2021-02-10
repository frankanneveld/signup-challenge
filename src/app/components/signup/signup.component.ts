import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '@services/api.service';
import { SignUp } from '@models/signup.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  /**
   * Declaration for the form to be controlled, email validation is a more common regular expression than the
   * build in validator from Angular it self
   */
  public form: FormGroup = new FormGroup({
    firstname: new FormControl('', [Validators.required]),
    lastname:  new FormControl('', [Validators.required]),
    email:     new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    password:  new FormControl('', [Validators.required, this.passwordValidator])
  });

  constructor(private readonly apiService: ApiService) {}

  /**
   * Gets the email directly from the form
   */
  public get email(): FormControl {
    return this.form.get('email') as FormControl;
  }

  /**
   * Gets the password directly from the form
   */
  public get password(): FormControl {
    return this.form.get('password') as FormControl;
  }

  /**
   * A custom password validator with requirements :
   * - must include upper and lowercase characters
   * - cannot include first and lastname
   * - must be at least 8 characters long
   * @param control
   */
  private passwordValidator(control: AbstractControl): { [key: string]: boolean } | null {
    if (control.value?.length < 8
      || control.value === control.parent?.get('firstname').value
      || control.value === control.parent?.get('lastname').value
      || !/[a-z]/.test(control.value)
      || !/[A-Z]/.test(control.value)) {
      return { valid: false };
    }
    return null;
  }

  /**
   * Submit form to the api-service and reset the form
   */
  public submitForm() {
    const {firstname, lastname, email}: SignUp = this.form.value;
    this.apiService.post({firstname, lastname, email}).subscribe( () => this.form.reset());
  }

}
