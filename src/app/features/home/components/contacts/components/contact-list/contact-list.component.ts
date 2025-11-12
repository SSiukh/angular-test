import { Component, Input } from '@angular/core';
import { ContantBlockData } from 'app/features/home/components/contacts/types';
import { ContactItemComponent } from '../contact-item/contact-item.component';
import { RevealOnScroll } from 'app/shared/directives/reveal-on-scroll/reveal-on-scroll';

@Component({
  selector: 'app-contact-list',
  imports: [ContactItemComponent, RevealOnScroll],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.scss',
})
export class ContactListComponent {
  @Input() blocksData: ContantBlockData[] = [];
}
