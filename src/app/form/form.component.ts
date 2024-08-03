import { Component } from '@angular/core';
import {ReactiveFormsModule, FormControl, Validators} from "@angular/forms";
import {debounce, debounceTime} from "rxjs";
import {CommonModule, NgIf} from "@angular/common";

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf,CommonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
//validación basica
  //emailCtrl = new FormControl('', [Validators.required, Validators.email]);
  emailCtrl = new FormControl('', [Validators.required, Validators.email
  , Validators.minLength(5)]);


  //validar en ascincronamente
  constructor() {
    this.emailCtrl.valueChanges
      .pipe(debounceTime(500))
      .subscribe(value => {
      console.log(value);
    });

  }
  getEmail(event: Event) {
    event.preventDefault();
    console.log(this.emailCtrl.value);
    //this.emailCtrl.setValue('');
  }



}
