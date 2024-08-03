import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {FormComponent} from "./form/form.component";
import {FormGroupComponent} from "./form-group/form-group.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FormComponent,FormGroupComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'formularios';
}
