import { Component } from '@angular/core';

@Component({
  selector: 'app-user-type-status-filter',
  templateUrl: './user-type-status-filter.component.html',
  styleUrl: './user-type-status-filter.component.css'
})
export class UserTypeStatusFilterComponent {
  userTypes: string[] = ['Guset','Host'];
  userStatus: string[] = ['Active','Reported','Suspended']
}
