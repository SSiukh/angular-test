import { Component } from '@angular/core';
import { PlanComponent } from './components/plan/plan.component';
import { HeroComponent } from './components/hero/hero.component';
import { PresentationComponent } from './components/presentation/presentation.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { SubscriptionComponent } from './components/subscription/subscription.component';

@Component({
  selector: 'app-home',
  imports: [
    PlanComponent,
    HeroComponent,
    PresentationComponent,
    ContactsComponent,
    SubscriptionComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
})
export class HomeComponent {}
