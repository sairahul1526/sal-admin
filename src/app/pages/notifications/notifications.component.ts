import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiClientService  } from 'src/app/services/api-client.service';
import { faAngleRight, faAngleLeft, faPen } from '@fortawesome/free-solid-svg-icons';
import { UtilityService  } from 'src/app/services/utility.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  faAngleRight = faAngleRight;
  faAngleLeft = faAngleLeft;
  faPen = faPen;

  response: any;
  page = 1;
  type: string = '';
  notificationType: string = '';
  userType: string = '';
  
  loader = true;
  
  constructor(private route: ActivatedRoute, private apiClient: ApiClientService, private utilityService: UtilityService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params.page !== undefined) {
        this.page = Number(params.page);
      }
      if (params.type !== undefined) {
        this.type = params.type;
      }
      if (params.notification_type !== undefined) {
        this.notificationType = params.notification_type;
      }
      if (params.user_type !== undefined) {
        this.userType = params.user_type;
      }
      this.getNotifications(this.page);
    });
  }


  getNotifications(page: number) {
    this.loader = true;
    this.utilityService.checkUserLogin();
    this.page = page;
    this.apiClient.getNotifications(page.toString(), this.type, this.userType, this.notificationType).subscribe((response: any) => {
      if (response !== null && response.meta.status === '440') {
        this.utilityService.refreshToken();
        this.utilityService.wait(3000);
        this.getNotifications(page);
        return;
      }
      this.loader = false;
      this.response = response;
      if (response !== null && response.meta.status === '200') {
      }
    });
  }
}
