import { Component, inject, OnInit } from '@angular/core';
import { ButtonComponent } from '../ui/button/button.component';
import { LogoComponent } from '../ui/logo/logo.component';
import { ScreenService } from 'app/core/services/screen/screen.service';

@Component({
  selector: 'app-header',
  imports: [ButtonComponent, LogoComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
})
export class HeaderComponent implements OnInit {
  width!: number;
  private screenService = inject(ScreenService);

  ngOnInit() {
    this.screenService.width$.subscribe((width) => {
      this.width = width;
    });
  }
}
