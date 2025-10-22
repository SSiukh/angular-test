import { Component, Input } from '@angular/core';
import { StageInputData } from '../../interfaces';
import { RevealOnScroll } from '../../directives/reveal-on-scroll/reveal-on-scroll';

@Component({
  selector: 'app-stage',
  imports: [RevealOnScroll],
  templateUrl: './stage.html',
  styleUrl: './stage.css',
})
export class Stage {
  @Input() id!: number;
  @Input() data!: StageInputData;
}
