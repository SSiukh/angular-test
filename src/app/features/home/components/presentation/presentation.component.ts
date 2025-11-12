import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { SvgIconComponent } from 'app/shared/ui/svg-icon/svg-icon.component';
import { NgClass } from '@angular/common';
import { EventService } from 'app/core/services/event/event.service';
import { Subscription } from 'rxjs';
import { ScreenService } from 'app/core/services/screen/screen.service';

@Component({
  selector: 'app-presentation',
  imports: [SvgIconComponent, NgClass],
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.scss'],
})
export class PresentationComponent implements AfterViewChecked, OnInit, AfterViewInit, OnDestroy {
  private eventService = inject(EventService);
  private screenService = inject(ScreenService);

  @ViewChild('video') video!: ElementRef<HTMLVideoElement>;
  @ViewChild('presentationSection') section!: ElementRef;
  isPlaying = false;
  private videoPlayed = false;
  private subscription!: Subscription;
  width!: number;

  ngOnInit() {
    this.screenService.width$.subscribe((width) => {
      this.width = width;
    });
  }

  startVideo() {
    this.isPlaying = true;
  }

  ngAfterViewChecked(): void {
    if (this.isPlaying && this.video && !this.videoPlayed) {
      this.video.nativeElement.play();
      this.videoPlayed = true;
    }
  }

  onVideoEnded() {
    this.isPlaying = false;
    this.videoPlayed = false;
  }

  ngAfterViewInit() {
    this.subscription = this.eventService.event$.subscribe((id: string) => {
      if (id === 'presentation') {
        this.section.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        this.isPlaying = true;
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
