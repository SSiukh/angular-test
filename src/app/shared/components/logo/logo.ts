import { Component, Input } from '@angular/core';
import { SvgIcon } from '../svg-icon/svg-icon';
import { NgStyle, NgClass } from '@angular/common';

@Component({
  selector: 'app-logo',
  imports: [SvgIcon, NgStyle, NgClass],
  templateUrl: './logo.html',
  styleUrl: './logo.css',
})
export class Logo {
  @Input() marginTop?: string;
  @Input() color: string = '#000000';
  @Input() isMobile: boolean = false;
}
