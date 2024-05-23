import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dark-mode',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './dark-mode.component.html',
  styleUrl: './dark-mode.component.css',
})
export class DarkModeComponent implements OnInit {
  isDarkTheme: boolean =
    localStorage.getItem('color-theme') === 'dark' ||
    (!('color-theme' in localStorage) &&
      window.matchMedia('(prefers-color-scheme: dark)').matches);
  constructor() {}

  ngOnInit(): void {
    if (
      localStorage.getItem('color-theme') === 'dark' ||
      (!('color-theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      this.isDarkTheme = true;
    } else {
      this.isDarkTheme = false;
    }
  }

  toggleTheme(): void {
    this.isDarkTheme = !this.isDarkTheme;

    if (!this.isDarkTheme) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('color-theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('color-theme', 'dark');
    }
  }
}
