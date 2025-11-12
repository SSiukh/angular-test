import { Component, Input } from '@angular/core';
import { StageInputData } from 'app/features/home/components/plan/types';
import { RevealOnScroll } from 'app/shared/directives/reveal-on-scroll/reveal-on-scroll';

@Component({
  selector: 'li[app-plan-item]',
  imports: [RevealOnScroll],
  templateUrl: './plan-item.component.html',
  styleUrl: './plan-item.component.scss',
  standalone: true,
})
export class PlanItemComponent {
  @Input() id!: number;
  @Input() data!: StageInputData;
}
