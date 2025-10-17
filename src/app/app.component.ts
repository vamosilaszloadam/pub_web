import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import { DrinkComponent } from './drink/drink.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    // RouterOutlet, 
    DrinkComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'web';
}
