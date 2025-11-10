import { Component } from '@angular/core';
import { PlanComponent } from './components/plan/plan.component';
import { HeroComponent } from './components/hero/hero.component';
import { PresentationComponent } from './components/presentation/presentation.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { SubscribeComponent } from './components/subscribe/subscribe.component';

@Component({
  selector: 'app-home',
  imports: [
    PlanComponent,
    HeroComponent,
    PresentationComponent,
    ContactsComponent,
    SubscribeComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  standalone: true,
})
export class HomeComponent {}
