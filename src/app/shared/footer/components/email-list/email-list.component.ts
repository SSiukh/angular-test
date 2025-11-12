import { Component } from '@angular/core';
import { Link } from 'app/shared/footer/types';
import { EmailItemComponent } from '../email-item/email-item.component';
import { EMAILS } from './datasets';

@Component({
  selector: 'app-email-list',
  imports: [EmailItemComponent],
  templateUrl: './email-list.component.html',
  styleUrl: './email-list.component.scss',
})
export class EmailListComponent {
  emails: Link[] = EMAILS;
}
