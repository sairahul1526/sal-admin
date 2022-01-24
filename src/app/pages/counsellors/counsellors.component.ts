import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiClientService  } from 'src/app/services/api-client.service';
import { faPen, faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { UtilityService  } from 'src/app/services/utility.service';

@Component({
  selector: 'app-counsellors',
  templateUrl: './counsellors.component.html',
  styleUrls: ['./counsellors.component.scss']
})
export class CounsellorsComponent implements OnInit {
  faPen = faPen;
  faAngleRight = faAngleRight;
  faAngleLeft = faAngleLeft;

  name = '';
  phone = '';
  email = '';
  status = '';

  response: any;
  page = 1;
  
  loader = true;
  
  constructor(private route: ActivatedRoute, private apiClient: ApiClientService, private utilityService: UtilityService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params.page !== undefined) {
        this.page = Number(params.page);
      }
      if (params.name !== undefined) {
        this.name = params.name;
      }
      if (params.phone !== undefined) {
        this.phone = params.phone;
      }
      if (params.email !== undefined) {
        this.email = params.email;
      }
      if (params.status !== undefined) {
        this.status = params.status;
      }
      this.getCounsellors(this.page);
    });
  }

  getCounsellors(page: number) {
    this.loader = true;
    this.utilityService.checkUserLogin();
    this.page = page;
    this.apiClient.getCounsellors(this.page.toString(), this.name, this.phone, this.email, this.status).subscribe((response: any) => {
      if (response !== null && response.meta.status === '440') {
        this.utilityService.refreshToken();
        this.utilityService.wait(3000);
        this.getCounsellors(page);
        return;
      }
      this.loader = false;
      this.response = response;
      if (response !== null && response.meta.status === '200') {
      }
    });
  }

}
