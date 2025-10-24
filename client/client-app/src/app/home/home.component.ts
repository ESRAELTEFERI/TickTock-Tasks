import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // for routerLink in template

@Component({
  selector: 'app-home',
  standalone: true, // marks it as standalone
  imports: [RouterModule], // allows using routerLink in template
  templateUrl: './home.component.html',
})
export class HomeComponent {}
