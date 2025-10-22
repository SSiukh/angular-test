import { Component, HostListener, OnInit } from '@angular/core';
import { StageInputData } from '../../shared/interfaces';
import { Stage } from '../../shared/components/stage/stage';
import { ScreenService } from '../../core/services/screen/screen';

@Component({
  selector: 'app-plan',
  imports: [Stage],
  templateUrl: './plan.html',
  styleUrl: './plan.css',
})
export class Plan implements OnInit {
  width!: number;
  data: StageInputData[] = [];

  constructor(private screenService: ScreenService) {}

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
