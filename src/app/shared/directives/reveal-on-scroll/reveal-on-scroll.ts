import {
  Directive,
  ElementRef,
  HostBinding,
  inject,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';

@Directive({
  selector: '[appRevealOnScroll]',
  standalone: true,
})
export class RevealOnScroll implements OnInit, OnDestroy {
  @Input() name?: string = '';
  @Input() threshold?: number = 0.3;
  @Input() delayTime = 0;
  @Input() index = 0;
  @Input() itemsPerRow = 1;
  private _isVisible = false;

  @HostBinding('class') get hostClasses(): string {
    return this._isVisible ? `${this.name ?? ''}--active` : '';
  }

  @HostBinding('style.animationDelay') get delay() {
    if (this.delayTime) {
      return `${(this.index % this.itemsPerRow) * this.delayTime}s`;
    }
    return '0s';
  }

  private observer!: IntersectionObserver;
  private el = inject(ElementRef);

  ngOnInit(): void {
    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !this._isVisible) {
          this._isVisible = true;
          this.observer.disconnect();
        }
      },
      { threshold: this.threshold }
    );

    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer.disconnect();
  }
}
