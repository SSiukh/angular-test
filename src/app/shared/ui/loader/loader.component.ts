import { Component, Input } from '@angular/core';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-loader',
  imports: [SvgIconComponent, NgClass],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
})
export class LoaderComponent {
  @Input() isLoading = false;
  @Input() background = '#fff';
}
