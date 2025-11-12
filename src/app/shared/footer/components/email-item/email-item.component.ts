import { Component, Input } from '@angular/core';
import { Link } from 'app/shared/footer/types';

@Component({
  selector: 'li[app-email-item]',
  imports: [],
  templateUrl: './email-item.component.html',
  styleUrl: './email-item.component.scss',
})
export class EmailItemComponent {
  @Input() email!: Link;
}
