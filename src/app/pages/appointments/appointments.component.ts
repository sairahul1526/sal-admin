import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiClientService  } from 'src/app/services/api-client.service';
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { UtilityService  } from 'src/app/services/utility.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent implements OnInit {
  faAngleRight = faAngleRight;
  faAngleLeft = faAngleLeft;

  state: string = '';
  clientID: string = '';
  counsellorID: string = '';
  response: any;
  page = 1;
  
  constructor(private route: ActivatedRoute, private apiClient: ApiClientService, private utilityService: UtilityService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params.page !== undefined) {
        this.page = Number(params.page);
      }
      if (params.state !== undefined) {
        this.state = params.state;
      }
      if (params.client_id !== undefined) {
        this.clientID = params.client_id;
      }
      if (params.counsellor_id !== undefined) {
        this.counsellorID = params.counsellor_id;
      }
      this.getAppointments(this.page);
    });
  }

  getAppointments(page: number) {
    this.utilityService.checkUserLogin();
    this.page = page;
    this.apiClient.getAppointments(this.page.toString(), this.state, this.clientID, this.counsellorID).subscribe((response: any) => {
      if (response !== null && response.meta.status === '440') {
        this.utilityService.refreshToken();
        this.utilityService.wait(3000);
        this.getAppointments(page);
        return;
      }
      this.response = response;
      if (response !== null && response.meta.status === '200') {
      }
    });
  }
}
