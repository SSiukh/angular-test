import { Component, Input } from '@angular/core';
import { ContantBlockData } from '../../interfaces';
import { NgClass, NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-contact-block',
  imports: [NgTemplateOutlet, NgClass],
  templateUrl: './contact-block.html',
  styleUrl: './contact-block.css',
})
export class ContactBlock {
  @Input() data!: ContantBlockData;
}
