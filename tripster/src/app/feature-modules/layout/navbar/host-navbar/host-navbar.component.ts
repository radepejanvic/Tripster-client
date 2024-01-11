import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-host-navbar',
  templateUrl: './host-navbar.component.html',
  styleUrl: './host-navbar.component.css'
})
export class HostNavbarComponent {
  @Input() notifications: number;
}
