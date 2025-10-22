import { Component, HostListener, OnInit } from '@angular/core';
import { Button } from '../../shared/components/button/button';
import { Logo } from '../../shared/components/logo/logo';
import { ScreenService } from '../../core/services/screen/screen';

@Component({
  selector: 'app-header',
  imports: [Button, Logo],
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
  standalone: true,
})
export class Header implements OnInit {
  width!: number;

  constructor(private screenService: ScreenService) {}

  ngOnInit() {
    this.screenService.width$.subscribe((width) => {
      this.width = width;
    });
  }
}
