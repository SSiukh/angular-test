import { Component } from '@angular/core';
import { Link } from 'app/shared/footer/types';
import { MessengerItemComponent } from '../messenger-item/messenger-item.component';
import { MESSENGERS } from './datasets';

@Component({
  selector: 'app-messenger-list',
  imports: [MessengerItemComponent],
  templateUrl: './messenger-list.component.html',
  styleUrl: './messenger-list.component.scss',
})
export class MessengerListComponent {
  messengers: Link[] = MESSENGERS;
}
