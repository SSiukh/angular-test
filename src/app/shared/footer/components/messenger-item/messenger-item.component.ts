import { Component, Input } from '@angular/core';
import { SvgIconComponent } from 'app/shared/ui/svg-icon/svg-icon.component';
import { Link } from 'app/shared/footer/types';

@Component({
  selector: 'li[app-messenger-item]',
  imports: [SvgIconComponent],
  templateUrl: './messenger-item.component.html',
  styleUrl: './messenger-item.component.scss',
})
export class MessengerItemComponent {
  @Input() messenger!: Link;
}
