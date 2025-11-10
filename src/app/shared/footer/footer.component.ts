import { Component } from '@angular/core';
import { LogoComponent } from '../ui/logo/logo.component';
import { SvgIconComponent } from '../ui/svg-icon/svg-icon.component';

@Component({
  selector: 'app-footer',
  imports: [LogoComponent, SvgIconComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  messengers = [
    {
      name: 'facebook',
      link: 'https://www.facebook.com/diia.gov.ua',
    },
    {
      name: 'twitter',
      link: 'https://x.com/diiagovua',
    },
    {
      name: 'telegram',
      link: 'https://t.me/diia_gov',
    },
    {
      name: 'instagram',
      link: 'https://instagram.com/diia.gov.ua',
    },
    {
      name: 'youtube',
      link: 'https://www.youtube.com/@Diia',
    },
    {
      name: 'message',
      link: 'tel:+380971628529',
    },
  ];
}
