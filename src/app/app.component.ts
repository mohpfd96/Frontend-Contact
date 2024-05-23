import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DarkModeComponent } from './components/dark-mode/dark-mode.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DarkModeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Contact-Manager';
}
