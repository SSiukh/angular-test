import { Component, signal } from '@angular/core';
import { HeaderComponent } from 'app/shared/header/header.component';
import { FooterComponent } from 'app/shared/footer/footer.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected readonly title = signal('landing-app');
}
