import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiClientService  } from 'src/app/services/api-client.service';
import { faAngleRight, faAngleLeft, faPen } from '@fortawesome/free-solid-svg-icons';
import { UtilityService  } from 'src/app/services/utility.service';

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.scss']
})
export class CouponsComponent implements OnInit {
  faAngleRight = faAngleRight;
  faAngleLeft = faAngleLeft;
  faPen = faPen;

  response: any;
  page = 1;
  active: string = '';
  
  constructor(private route: ActivatedRoute, private apiClient: ApiClientService, private utilityService: UtilityService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params.page !== undefined) {
        this.page = Number(params.page);
      }
      if (params.active !== undefined) {
        this.active = params.active;
      }
      this.getCoupons(this.page);
    });
  }


  getCoupons(page: number) {
    this.utilityService.checkUserLogin();
    this.page = page;
    this.apiClient.getCoupons(page.toString(), this.active).subscribe((response: any) => {
      if (response !== null && response.meta.status === '440') {
        this.utilityService.refreshToken();
        this.utilityService.wait(3000);
        this.getCoupons(page);
        return;
      }
      this.response = response;
      if (response !== null && response.meta.status === '200') {
      }
    });
  }
}
