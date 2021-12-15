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
      title: 'Quotes Reports'
    },
    {
      id: '2',
      title: 'Onboarding Report'
    }
  ];
  
  constructor(private apiClient: ApiClientService, private utilityService: UtilityService) { }

  ngOnInit(): void {
  }

  downloadReport() {
    this.utilityService.checkUserLogin();
    window.open(this.apiClient.getReportURL(this.selectedReportID, this.startBy, this.endBy), "_blank");
  }
}
