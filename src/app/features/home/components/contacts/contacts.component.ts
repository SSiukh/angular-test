import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { SocialNetworksData } from './types/social-networks-data.interface';
import { ContantBlockData } from './types/contact-block-data.interface';
import { ScreenService } from 'app/core/services/screen/screen.service';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { SocialListComponent } from './components/social-list/social-list.component';
import { SOCIAL_NETWORKS } from './datasets/social-networks.constant';

@Component({
  selector: 'app-contacts',
  imports: [ContactListComponent, SocialListComponent],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss',
  standalone: true,
})
export class ContactsComponent implements OnInit, AfterViewInit {
  @ViewChild('email') hintTemplate!: TemplateRef<unknown> | null;
  @ViewChild('chat') chatTemplate!: TemplateRef<unknown> | null;
  @ViewChild('phone') phoneTemplate!: TemplateRef<unknown> | null;

  private cdr = inject(ChangeDetectorRef);
  private screenService = inject(ScreenService);

  width!: number;
  blocksData: ContantBlockData[] = [];

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

  socialNetworks: SocialNetworksData[] = SOCIAL_NETWORKS;

  ngAfterViewInit() {
    this.blocksData[0].template = this.hintTemplate;
    this.blocksData[1].template = this.chatTemplate;
    this.blocksData[2].template = this.phoneTemplate;

    this.cdr.detectChanges();
  }
}
