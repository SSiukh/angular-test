import { Component, HostListener, OnInit } from '@angular/core';
import { Button } from '../../shared/components/button/button';
import { EventService } from '../../core/services/event/event';
import { ScreenService } from '../../core/services/screen/screen';

@Component({
  selector: 'app-hero',
  imports: [Button],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
  standalone: true,
})
export class Hero implements OnInit {
  width!: number;

  constructor(private eventService: EventService, private screenService: ScreenService) {}

  ngOnInit() {
    this.screenService.width$.subscribe((width) => {
      this.width = width;
    });
  }

  handlePresentationClick() {
    this.eventService.emitEvent('presentation');
  }
}
