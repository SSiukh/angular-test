import { Component } from '@angular/core';
import { Logo } from '../../shared/components/logo/logo';
import { SvgIcon } from '../../shared/components/svg-icon/svg-icon';

@Component({
  selector: 'app-footer',
  imports: [Logo, SvgIcon],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
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
