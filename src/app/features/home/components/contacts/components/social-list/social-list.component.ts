import { Component, Input } from '@angular/core';
import { SocialItemComponent } from '../social-item/social-item.component';
import { SocialNetworksData } from 'app/features/home/components/contacts/types';

@Component({
  selector: 'app-social-list',
  imports: [SocialItemComponent],
  templateUrl: './social-list.component.html',
  styleUrl: './social-list.component.scss',
})
export class SocialListComponent {
  @Input() socialNetworks: SocialNetworksData[] = [];
}
