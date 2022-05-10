import { Component, OnInit } from '@angular/core';
import { ApiClientService  } from 'src/app/services/api-client.service';
import { UtilityService  } from 'src/app/services/utility.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  selectedReportID: string = '';
  startBy: string = '';
  endBy: string = '';
  reports = [
    {
      id: '1',
      title: 'Appointment Reports'
    },
    {
      id: '2',
      title: 'Sales Reports'
    },
    {
      id: '3',
      title: 'Booking Report'
    },
    {
      id: '4',
      title: 'SAL Cafe Report'
    },
    {
      id: '5',
      title: 'Finance Report'
    },
    {
      id: '6',
      title: 'Payout Report'
    },
    {
      id: '7',
      title: 'Promo Code Report'
    },
    {
      id: '8',
      title: 'Push Notification Report'
    },
    {
      id: '10',
      title: 'Onboarding Report'
    }
  ];
  
  response: any;
  loader = false;

  constructor(private apiClient: ApiClientService, private utilityService: UtilityService) { }

  ngOnInit(): void {
  }


  getReports() {
    this.loader = true;
    this.utilityService.checkUserLogin();
    this.apiClient.getReports(this.selectedReportID, this.startBy, this.endBy).subscribe((response: any) => {
      if (response !== null && response.meta.status === '440') {
        this.utilityService.refreshToken();
        this.utilityService.wait(3000);
        this.getReports();
        return;
      }
      this.loader = false;
      this.response = response;
      if (response !== null && response.meta.status === '200') {
      }
    });
  }

  downloadReport() {
    window.open(this.apiClient.getReportURL(this.selectedReportID, this.startBy, this.endBy), "_blank");
  }
}
