import { NgClass, NgStyle } from '@angular/common';
import { Component, HostBinding, Input } from '@angular/core';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-button',
  imports: [NgClass, SvgIconComponent, NgStyle, RouterModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  standalone: true,
})
export class ButtonComponent {
  @Input() text!: string;
  @Input() icon?: string;
  @Input() iconWidth = 24;
  @Input() iconHeight = 24;
  @Input() extraClass?: string;
  @Input() variant: 'primary' | 'outlined' = 'primary';
  @Input() width = 200;
  @Input() height = 56;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() isDisabled = false;
  @Input() href?: string;

  @HostBinding('class') get hostClasses() {
    return this.extraClass || '';
  }

  get buttonClasses() {
    return {
      button: true,
      'button--primary': this.variant === 'primary',
      'button--outlined': this.variant === 'outlined',
    };
  }
}
