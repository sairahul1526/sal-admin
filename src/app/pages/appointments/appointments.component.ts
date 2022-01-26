import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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

  loader = true;

  refundAmount = 0;
  
  constructor(private router: Router, private route: ActivatedRoute, private apiClient: ApiClientService, private utilityService: UtilityService) { }

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
    this.loader = true;
    this.utilityService.checkUserLogin();
    this.page = page;
    this.apiClient.getAppointments(this.page.toString(), this.state, this.clientID, this.counsellorID).subscribe((response: any) => {
      if (response !== null && response.meta.status === '440') {
        this.utilityService.refreshToken();
        this.utilityService.wait(3000);
        this.getAppointments(page);
        return;
      }
      this.loader = false;
      this.response = response;
      if (response !== null && response.meta.status === '200') {
      }
    });
  }

  refundAppointment(appointmentID: string, refundAmount: string) {
    this.loader = true;
    this.utilityService.checkUserLogin();
    this.apiClient.refundAppointment(appointmentID, refundAmount).subscribe((response: any) => {
      if (response !== null && response.meta.status === '440') {
        this.utilityService.refreshToken();
        this.utilityService.wait(3000);
        this.refundAppointment(appointmentID, refundAmount);
        return;
      }
      this.loader = false;
      if (response !== null) {
        alert(response.meta.message)
      }
    });
  }

  convertSlot(slot: string) {
    switch (slot) {
      case '0':
        return '2022-01-22 00:00';

      case '1':
        return '2022-01-22 00:30';

      case '2':
        return '2022-01-22 01:00';

      case '3':
        return '2022-01-22 01:30';

      case '4':
        return '2022-01-22 02:00';

      case '5':
        return '2022-01-22 02:30';

      case '6':
        return '2022-01-22 03:00';

      case '7':
        return '2022-01-22 03:30';

      case '8':
        return '2022-01-22 04:00';

      case '9':
        return '2022-01-22 04:30';

      case '10':
        return '2022-01-22 05:00';

      case '11':
        return '2022-01-22 05:30';

      case '12':
        return '2022-01-22 06:00';

      case '13':
        return '2022-01-22 06:30';

      case '14':
        return '2022-01-22 07:00';

      case '15':
        return '2022-01-22 07:30';

      case '16':
        return '2022-01-22 08:00';

      case '17':
        return '2022-01-22 08:30';

      case '18':
        return '2022-01-22 09:00';

      case '19':
        return '2022-01-22 09:30';

      case '20':
        return '2022-01-22 10:00';

      case '21':
        return '2022-01-22 10:30';

      case '22':
        return '2022-01-22 11:00';

      case '23':
        return '2022-01-22 11:30';

      case '24':
        return '2022-01-22 12:00';

      case '25':
        return '2022-01-22 12:30';

      case '26':
        return '2022-01-22 13:00';

      case '27':
        return '2022-01-22 13:30';

      case '28':
        return '2022-01-22 14:00';

      case '29':
        return '2022-01-22 14:30';

      case '30':
        return '2022-01-22 15:00';
    
      case '31':
        return '2022-01-22 15:30';

      case '32':
        return '2022-01-22 16:00';

      case '33':
        return '2022-01-22 16:30';

      case '34':
        return '2022-01-22 17:00';

      case '35':
        return '2022-01-22 17:30';

      case '36':
        return '2022-01-22 18:00';

      case '37':
        return '2022-01-22 18:30';

      case '38':
        return '2022-01-22 19:00';

      case '39':
        return '2022-01-22 19:30';

      case '40':
        return '2022-01-22 20:00';

      case '41':
        return '2022-01-22 20:30';

      case '42':
        return '2022-01-22 21:00';

      case '43':
        return '2022-01-22 21:30';

      case '44':
        return '2022-01-22 22:00';

      case '45':
        return '2022-01-22 22:30';

      case '46':
        return '2022-01-22 23:00';

      case '47':
        return '2022-01-22 23:30';

      default:
        return '2022-01-22 ';
    }
  }
}
