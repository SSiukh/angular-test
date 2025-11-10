import { Component, Input } from '@angular/core';
import { ContantBlockData } from 'app/features/home/components/contacts/types';
import { NgClass, NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-contact-block',
  imports: [NgTemplateOutlet, NgClass],
  templateUrl: './contact-block.component.html',
  styleUrl: './contact-block.component.css',
})
export class ContactBlockComponent {
  @Input() data!: ContantBlockData;
}
