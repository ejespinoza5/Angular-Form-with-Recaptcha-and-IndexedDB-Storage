import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {debounceTime} from "rxjs";
import {DatabaseService} from "../services/database.service";
import {RecaptchaModule} from "ng-recaptcha";

@Component({
  selector: 'app-form-group',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RecaptchaModule],
  templateUrl: './form-group.component.html',
  styleUrl: './form-group.component.css'
})
export class FormGroupComponent implements OnInit {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private databaseService: DatabaseService) {
    this.buildForm();
    this.form?.valueChanges.pipe(debounceTime(500)).subscribe(value => {
      console.log(value);
    });
  }

  ngOnInit(): void {

  }

  private buildForm() {
    this.form = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      category: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      text: new FormControl("", [Validators.required, Validators.maxLength(200)])
    });
  }

  save(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const datosFormularios = this.form.value;
      console.log(datosFormularios);
      this.databaseService.saveFormData(datosFormularios);
    } else {
      this.form.markAllAsTouched();
    }
  }

  get textField() {
    return this.form.get('text');
  }

  handleCaptchaResponse(captchaResponse: string | null) {
    if (captchaResponse) {
      console.log(`Resolved captcha with response: ${captchaResponse}`);
    }
  }




}
