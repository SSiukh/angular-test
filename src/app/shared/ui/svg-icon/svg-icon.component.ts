import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-svg-icon',
  templateUrl: './svg-icon.component.html',
  standalone: true,
})
export class SvgIconComponent {
  @Input() icon!: string;
  @Input() svgWidth: number = 24;
  @Input() svgHeight: number = 24;
}
