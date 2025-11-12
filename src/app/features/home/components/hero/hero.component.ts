import { Component, inject, OnInit } from '@angular/core';
import { ButtonComponent } from 'app/shared/ui/button/button.component';
import { EventService } from 'app/core/services/event/event.service';
import { ScreenService } from 'app/core/services/screen/screen.service';

@Component({
  selector: 'app-hero',
  imports: [ButtonComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
  standalone: true,
})
export class HeroComponent implements OnInit {
  private eventService = inject(EventService);
  private screenService = inject(ScreenService);
  width!: number;

  ngOnInit() {
    this.screenService.width$.subscribe((width) => {
      this.width = width;
    });
  }

  handlePresentationClick() {
    this.eventService.emitEvent('presentation');
  }
}
