import { NgClass, NgStyle } from '@angular/common';
import { Component, HostBinding, Input } from '@angular/core';
import { SvgIcon } from '../svg-icon/svg-icon';

@Component({
  selector: 'app-button',
  imports: [NgClass, SvgIcon, NgStyle],
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class Button {
  @Input() text!: string;
  @Input() icon?: string;
  @Input() iconWidth: number = 24;
  @Input() iconHeight: number = 24;
  @Input() extraClass?: string;
  @Input() variant: 'primary' | 'outlined' = 'primary';
  @Input() width: number = 200;
  @Input() height: number = 56;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() isDisabled: boolean = false;

  @HostBinding('class') get hostClasses() {
    return this.extraClass || '';
  }

  get buttonClasses() {
    return {
      button: true,
      'primary-button': this.variant === 'primary',
      'outlined-button': this.variant === 'outlined',
    };
  }
}
