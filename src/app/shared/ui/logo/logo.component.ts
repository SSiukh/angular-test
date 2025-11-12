import { Component, Input } from '@angular/core';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';
import { NgStyle, NgClass } from '@angular/common';

@Component({
  selector: 'app-logo',
  imports: [SvgIconComponent, NgStyle, NgClass],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.scss',
  standalone: true,
})
export class LogoComponent {
  @Input() marginTop?: string;
  @Input() color = '#000000';
  @Input() isMobile = false;
}
