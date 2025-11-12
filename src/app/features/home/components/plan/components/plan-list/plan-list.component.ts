import { Component, Input } from '@angular/core';
import { PlanItemComponent } from '../plan-item/plan-item.component';
import { StageInputData } from '../../types';

@Component({
  selector: 'app-plan-list',
  imports: [PlanItemComponent],
  templateUrl: './plan-list.component.html',
  styleUrl: './plan-list.component.scss',
})
export class PlanListComponent {
  @Input() data!: StageInputData[];
}
