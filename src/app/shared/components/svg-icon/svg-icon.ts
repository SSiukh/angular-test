import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-svg-icon',
  templateUrl: './svg-icon.html',
  standalone: true,
})
export class SvgIcon {
  @Input() icon!: string;
  @Input() svgWidth: number = 24;
  @Input() svgHeight: number = 24;
}
