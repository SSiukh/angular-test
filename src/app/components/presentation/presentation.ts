import {
  AfterViewChecked,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { SvgIcon } from '../../shared/components/svg-icon/svg-icon';
import { NgClass } from '@angular/common';
import { EventService } from '../../core/services/event/event';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-presentation',
  imports: [SvgIcon, NgClass],
  templateUrl: './presentation.html',
  styleUrls: ['./presentation.css'],
})
export class Presentation implements AfterViewChecked, OnInit {
  @ViewChild('video') video!: ElementRef<HTMLVideoElement>;
  @ViewChild('presentationSection') section!: ElementRef;
  isPlaying = false;
  private videoPlayed = false;
  private subscription!: Subscription;
  width!: number;

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.width = screen.width;
  }

  @HostListener('window:resize')
  onResize() {
    this.width = screen.width;
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
