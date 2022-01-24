import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiClientService  } from 'src/app/services/api-client.service';
import { UtilityService  } from 'src/app/services/utility.service';

@Component({
  selector: 'app-counsellor',
  templateUrl: './counsellor.component.html',
  styleUrls: ['./counsellor.component.scss']
})
export class CounsellorComponent implements OnInit {

  counsellorID: string = '';

  firstName: string = '';
  lastName: string = '';
  phone: string = '';
  email: string = '';
  gender: string = '';
  price: string = '';
  price3: string = '';
  price5: string = '';
  education: string = '';
  experience: string = '';
  about: string = '';
  payoutPercentage: string = '';
  payeeName: string = '';
  bankAccountNo: string = '';
  ifsc: string = '';
  branchName: string = '';
  bankName: string = '';
  bankAccountType: string = '';
  pan: string = '';
  status: string = '';

  loader = true;

  constructor(private router: Router, private route: ActivatedRoute, private apiClient: ApiClientService, private utilityService: UtilityService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params.counsellor_id !== undefined) {
        this.counsellorID = params.counsellor_id;
      }
      this.getCounsellor();
    });
  }

  getCounsellor(): any {
    if (this.counsellorID.length == 0) {
      return;
    }
    this.loader = true;
    this.utilityService.checkUserLogin();
    this.apiClient.getCounsellor(this.counsellorID).subscribe((response: any) => {
      if (response !== null && response.meta.status === '440') {
        this.utilityService.refreshToken();
        this.utilityService.wait(3000);
        this.getCounsellor();
        return;
      }
      this.loader = false;
      if (response !== null && response.meta.status === '200') {
        if (response.counsellors.length == 0) {
          return;
        }
        this.firstName = response.counsellors[0].first_name;
        this.lastName = response.counsellors[0].last_name;
        this.phone = response.counsellors[0].phone;
        this.email = response.counsellors[0].email;
        this.gender = response.counsellors[0].gender;
        this.price = response.counsellors[0].price;
        this.price3 = response.counsellors[0].price_3;
        this.price5 = response.counsellors[0].price_5;
        this.education = response.counsellors[0].education;
        this.experience = response.counsellors[0].experience;
        this.about = response.counsellors[0].about;
        this.payoutPercentage = response.counsellors[0].payout_percentage;
        this.payeeName = response.counsellors[0].payee_name;
        this.bankAccountNo = response.counsellors[0].bank_account_no;
        this.ifsc = response.counsellors[0].ifsc;
        this.branchName = response.counsellors[0].branch_name;
        this.bankName = response.counsellors[0].bank_name;
        this.bankAccountType = response.counsellors[0].bank_account_type;
        this.pan = response.counsellors[0].pan;
        this.status = response.counsellors[0].status;
      }
    });
  }

  updateCounsellor(): any {
    this.loader = true;
    this.utilityService.checkUserLogin();
    this.apiClient.updateCounsellor(this.counsellorID, this.firstName, this.lastName, this.phone, this.email, this.gender, this.price, this.price3, this.price5, this.education, this.experience, this.about, this.payoutPercentage, this.payeeName, this.bankAccountNo, this.ifsc, this.branchName, this.bankName, this.bankAccountType, this.pan, this.status).subscribe((response: any) => {
      if (response !== null && response.meta.status === '440') {
        this.utilityService.refreshToken();
        this.utilityService.wait(3000);
        this.updateCounsellor();
        return;
      }
      this.loader = false;
      if (response !== null && response.meta.status === '200') {
        this.router.navigate(['/counsellors']);
      }
    });
  }

}
