import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiClientService  } from 'src/app/services/api-client.service';
import { UtilityService  } from 'src/app/services/utility.service';

@Component({
  selector: 'app-therapist',
  templateUrl: './therapist.component.html',
  styleUrls: ['./therapist.component.scss']
})
export class TherapistComponent implements OnInit {

  therapistID: string = '';

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
      if (params.therapist_id !== undefined) {
        this.therapistID = params.therapist_id;
      }
      this.getTherapist();
    });
  }

  getTherapist(): any {
    if (this.therapistID.length == 0) {
      return;
    }
    this.loader = true;
    this.utilityService.checkUserLogin();
    this.apiClient.getTherapist(this.therapistID).subscribe((response: any) => {
      if (response !== null && response.meta.status === '440') {
        this.utilityService.refreshToken();
        this.utilityService.wait(3000);
        this.getTherapist();
        return;
      }
      this.loader = false;
      if (response !== null && response.meta.status === '200') {
        if (response.therapists.length == 0) {
          return;
        }
        this.firstName = response.therapists[0].first_name;
        this.lastName = response.therapists[0].last_name;
        this.phone = response.therapists[0].phone;
        this.email = response.therapists[0].email;
        this.gender = response.therapists[0].gender;
        this.price = response.therapists[0].price;
        this.price3 = response.therapists[0].price_3;
        this.price5 = response.therapists[0].price_5;
        this.education = response.therapists[0].education;
        this.experience = response.therapists[0].experience;
        this.about = response.therapists[0].about;
        this.payoutPercentage = response.therapists[0].payout_percentage;
        this.payeeName = response.therapists[0].payee_name;
        this.bankAccountNo = response.therapists[0].bank_account_no;
        this.ifsc = response.therapists[0].ifsc;
        this.branchName = response.therapists[0].branch_name;
        this.bankName = response.therapists[0].bank_name;
        this.bankAccountType = response.therapists[0].bank_account_type;
        this.pan = response.therapists[0].pan;
        this.status = response.therapists[0].status;
      }
    });
  }

  updateTherapist(): any {
    this.loader = true;
    this.utilityService.checkUserLogin();
    this.apiClient.updateTherapist(this.therapistID, this.firstName, this.lastName, this.phone, this.email, this.gender, this.price, this.price3, this.price5, this.education, this.experience, this.about, this.payoutPercentage, this.payeeName, this.bankAccountNo, this.ifsc, this.branchName, this.bankName, this.bankAccountType, this.pan, this.status).subscribe((response: any) => {
      if (response !== null && response.meta.status === '440') {
        this.utilityService.refreshToken();
        this.utilityService.wait(3000);
        this.updateTherapist();
        return;
      }
      this.loader = false;
      if (response !== null && response.meta.status === '200') {
        this.router.navigate(['/therapists']);
      }
    });
  }

}
