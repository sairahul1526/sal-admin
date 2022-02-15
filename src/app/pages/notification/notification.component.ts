import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiClientService  } from 'src/app/services/api-client.service';
import { UtilityService  } from 'src/app/services/utility.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  title: string = '';
  body: string = '';
  userIDs: string = '';
  type: string = '1';
  notificationType: string = '1';
  userType: string = '3';
  
  loader = false;

  constructor(private router: Router, private apiClient: ApiClientService, private utilityService: UtilityService) { }

  ngOnInit(): void {
  }

  postNotification() {
    this.loader = true;
    this.utilityService.checkUserLogin();
    this.apiClient.postNotification(this.title, this.body, this.notificationType, this.type == '1' ? '' : this.userIDs, this.type, this.userType).subscribe((response: any) => {
      if (response !== null && response.meta.status === '440') {
        this.utilityService.refreshToken();
        this.utilityService.wait(3000);
        this.postNotification();
        return;
      }
      this.loader = false;
      if (response !== null && response.meta.status === '200') {
        this.router.navigate(['/notifications']);
      }
    });
  }
}
