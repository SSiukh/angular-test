import { Component } from '@angular/core';
import { LogoComponent } from '../ui/logo/logo.component';
import { MessengerListComponent } from './components/messenger-list/messenger-list.component';
import { EmailListComponent } from './components/email-list/email-list.component';

@Component({
  selector: 'app-footer',
  imports: [LogoComponent, MessengerListComponent, EmailListComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {}
