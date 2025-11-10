import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgStyle } from '@angular/common';
import { SvgIconComponent } from 'app/shared/ui/svg-icon/svg-icon.component';
import { SocialNetworksData } from './types/social-networks-data.interface';
import { ContantBlockData } from './types/contact-block-data.interface';
import { RevealOnScroll } from 'app/shared/directives/reveal-on-scroll/reveal-on-scroll';
import { ScreenService } from 'app/core/services/screen/screen.service';
import { ContactBlockComponent } from './components/contact-block/contact-block.component';

@Component({
  selector: 'app-contacts',
  imports: [ContactBlockComponent, NgStyle, SvgIconComponent, RevealOnScroll],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css',
  standalone: true,
})
export class ContactsComponent implements OnInit {
  @ViewChild('email') hintTemplate!: TemplateRef<any> | null;
  @ViewChild('chat') chatTemplate!: TemplateRef<any> | null;
  @ViewChild('phone') phoneTemplate!: TemplateRef<any> | null;
  width!: number;
  blocksData: ContantBlockData[] = [];

  constructor(private cdr: ChangeDetectorRef, private screenService: ScreenService) {}

  ngOnInit() {
    this.screenService.width$.subscribe((width) => {
      this.width = width;
      this.updateBlocksData();
    });
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
