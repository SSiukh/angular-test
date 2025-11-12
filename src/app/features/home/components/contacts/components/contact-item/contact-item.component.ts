import { Component, Input } from '@angular/core';
import { ContantBlockData } from 'app/features/home/components/contacts/types';
import { NgClass, NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'li[app-contact-item]',
  imports: [NgTemplateOutlet, NgClass],
  templateUrl: './contact-item.component.html',
  styleUrl: './contact-item.component.scss',
})
export class ContactItemComponent {
  @Input() data!: ContantBlockData;
}
