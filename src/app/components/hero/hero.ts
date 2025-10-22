import { Component, HostListener, OnInit } from '@angular/core';
import { Button } from '../../shared/components/button/button';
import { EventService } from '../../core/services/event/event';

@Component({
  selector: 'app-hero',
  imports: [Button],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
  standalone: true,
})
export class Hero implements OnInit {
  width!: number;

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.width = screen.width;
  }

  handlePresentationClick() {
    this.eventService.emitEvent('presentation');
  }

  @HostListener('window:resize')
  onResize() {
    this.width = screen.width;
  }
}
