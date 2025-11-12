import { Component, inject, OnInit } from '@angular/core';
import { StageInputData } from './types';
import { ScreenService } from 'app/core/services/screen/screen.service';
import { PlanListComponent } from './components/plan-list/plan-list.component';

@Component({
  selector: 'app-plan',
  imports: [PlanListComponent],
  templateUrl: './plan.component.html',
  standalone: true,
})
export class PlanComponent implements OnInit {
  private screenService = inject(ScreenService);

  width!: number;
  data: StageInputData[] = [];

  ngOnInit() {
    this.screenService.width$.subscribe((width) => {
      this.width = width;
      this.generateData();
    });
  }

  private generateData() {
    this.data = [
      {
        title: 'Старт',
        content: ['Ліквідація ДАБІ', 'Створення Сервісної служби'],
      },
      {
        title: 'Березень — Травень 2020',
        content: ['Перехідний період', 'Мораторій на інспекційний держконтроль'],
      },
      {
        title: 'Червень 2020',
        content: ['Створення ДІМ', 'Запуск нового реєстру'],
      },
      {
        title: 'Вересень 2020',
        content: ['Державне агентство з питань технічного регулювання у містобудуванні'],
      },
      {
        title: 'Січень 2021',
        content: [this.width < 520 ? 'Запровадження страхування' : 'Запровадження<br>страхування'],
      },
    ];
  }
}
