import { Component, HostListener, OnInit } from '@angular/core';
import { Button } from '../../shared/components/button/button';
import { Logo } from '../../shared/components/logo/logo';

@Component({
  selector: 'app-header',
  imports: [Button, Logo],
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
  standalone: true,
})
export class Header implements OnInit {
  width!: number;

  ngOnInit() {
    this.width = screen.width;
  }

  @HostListener('window:resize')
  onResize() {
    this.width = screen.width;
  }
}
