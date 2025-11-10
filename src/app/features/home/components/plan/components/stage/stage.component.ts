import { Component, Input } from '@angular/core';
import { StageInputData } from 'app/features/home/components/plan/types';
import { RevealOnScroll } from 'app/shared/directives/reveal-on-scroll/reveal-on-scroll';

@Component({
  selector: 'app-stage',
  imports: [RevealOnScroll],
  templateUrl: './stage.component.html',
  styleUrl: './stage.component.css',
  standalone: true,
})
export class StageComponent {
  @Input() id!: number;
  @Input() data!: StageInputData;
}
