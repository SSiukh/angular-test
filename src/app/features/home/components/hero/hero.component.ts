import { Component, OnInit } from '@angular/core';
import { ButtonComponent } from 'app/shared/ui/button/button.component';
import { EventService } from 'app/core/services/event/event.service';
import { ScreenService } from 'app/core/services/screen/screen.service';

@Component({
  selector: 'app-hero',
  imports: [ButtonComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
  standalone: true,
})
export class HeroComponent implements OnInit {
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
