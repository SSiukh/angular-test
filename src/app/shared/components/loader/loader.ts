import { Component, Input } from '@angular/core';
import { SvgIcon } from '../svg-icon/svg-icon';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-loader',
  imports: [SvgIcon, NgClass],
  templateUrl: './loader.html',
  styleUrl: './loader.css',
})
export class Loader {
  @Input() isLoading: boolean = false;
  @Input() background: string = '#fff';
}
