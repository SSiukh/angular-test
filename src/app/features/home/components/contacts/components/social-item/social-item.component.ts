import { NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SvgIconComponent } from 'app/shared/ui/svg-icon/svg-icon.component';
import { SocialNetworksData } from '../../types';

@Component({
  selector: 'li[app-social-item]',
  imports: [SvgIconComponent, NgStyle],
  templateUrl: './social-item.component.html',
  styleUrl: './social-item.component.scss',
})
export class SocialItemComponent {
  @Input() item!: SocialNetworksData;
}
