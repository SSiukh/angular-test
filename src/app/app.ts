import { Component, signal } from '@angular/core';
import { Header } from './components/header/header';
import { Hero } from './components/hero/hero';
import { Plan } from './components/plan/plan';
import { Presentation } from './components/presentation/presentation';
import { Contacts } from './components/contacts/contacts';
import { Footer } from './components/footer/footer';
import { Subscribe } from './components/subscribe/subscribe';

@Component({
  selector: 'app-root',
  imports: [Header, Hero, Plan, Presentation, Contacts, Footer, Subscribe],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('landing-app');
}
