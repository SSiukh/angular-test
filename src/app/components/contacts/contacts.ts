import {
  ChangeDetectorRef,
  Component,
  HostListener,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ContactBlock } from '../../shared/components/contact-block/contact-block';
import { NgStyle } from '@angular/common';
import { SvgIcon } from '../../shared/components/svg-icon/svg-icon';
import { SocialNetworksData } from './interfaces/social-networks-data.interface';
import { ContantBlockData } from '../../shared/interfaces/contact-block-data.interface';
import { RevealOnScroll } from '../../shared/directives/reveal-on-scroll/reveal-on-scroll';

@Component({
  selector: 'app-contacts',
  imports: [ContactBlock, NgStyle, SvgIcon, RevealOnScroll],
  templateUrl: './contacts.html',
  styleUrl: './contacts.css',
})
export class Contacts implements OnInit {
  @ViewChild('email') hintTemplate!: TemplateRef<any> | null;
  @ViewChild('chat') chatTemplate!: TemplateRef<any> | null;
  @ViewChild('phone') phoneTemplate!: TemplateRef<any> | null;
  width!: number;
  blocksData: ContantBlockData[] = [];

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.width = screen.width;
    this.updateBlocksData();
  }

  @HostListener('window:resize')
  onResize() {
    this.width = screen.width;
    this.updateBlocksData();
  }

  updateBlocksData() {
    this.blocksData = [
      {
        emoji: 'fist',
        title: 'Зіткнулися з корупцією?',
        hint: 'Пишіть нам',
        template: this.hintTemplate,
      },
      {
        emoji: 'message',
        title: this.width >= 1200 ? 'Напишіть у<br>чат-бот' : 'Напишіть у чат-бот',
        hint: 'Оберіть месенджер',
        template: this.chatTemplate,
      },
      {
        emoji: 'phone',
        title:
          this.width >= 1200 ? 'Зателефонуйте<br>на гарячу лінію' : 'Зателефонуйте на гарячу лінію',
        hint: 'Працює з 09:00 до 18:00',
        template: this.phoneTemplate,
      },
    ];
  }

  socialNetworks: SocialNetworksData[] = [
    { name: 'viber', iconWidth: 35.1, iconHeight: 35.97, link: 'https://vb.me/diia' },
    {
      name: 'telegram',
      color: '#34ACE0',
      iconWidth: 35.94,
      iconHeight: 29.79,
      link: 'https://t.me/mintsyfra',
    },
    {
      name: 'facebook-logo',
      iconWidth: 33,
      iconHeight: 33,
      link: 'href="https://www.facebook.com/mintsyfra/"',
    },
  ];

  ngAfterViewInit() {
    this.blocksData[0].template = this.hintTemplate;
    this.blocksData[1].template = this.chatTemplate;
    this.blocksData[2].template = this.phoneTemplate;

    this.cdr.detectChanges();
  }
}
