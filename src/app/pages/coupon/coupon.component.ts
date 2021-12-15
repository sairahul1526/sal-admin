import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiClientService  } from 'src/app/services/api-client.service';
import { UtilityService  } from 'src/app/services/utility.service';
import * as moment from 'moment';

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.scss']
})
export class CouponComponent implements OnInit {

  couponID: string = '';

  promoCode: string = '';
  discount: number = 0;
  minimumOrderValue: number = 0;
  maximumDiscountValue: number = 0;
  validForOrder: number = 0;
  type: number = 1;
  orderType: number = 0;
  couponApplicableFor: number = 0;
  personID: string = '';
  startBy: string = '';
  endBy: string = '';
  status: string = '1';
  
  constructor(private router: Router, private route: ActivatedRoute, private apiClient: ApiClientService, private utilityService: UtilityService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params.id !== undefined) {
        this.couponID = params.id;
      }
      this.getCoupon();
    });
  }

  getCoupon() {
    this.utilityService.checkUserLogin();
    this.apiClient.getCoupon(this.couponID).subscribe((response: any) => {
      if (response !== null && response.meta.status === '440') {
        this.utilityService.refreshToken();
        this.utilityService.wait(3000);
        this.getCoupon();
        return;
      }
      if (response !== null && response.meta.status === '200') {
        if (response.coupons.length > 0) {
          const coupon = response.coupons[0]
          this.promoCode = coupon.coupon_code;
          this.discount = Number(coupon.discount);
          this.minimumOrderValue = Number(coupon.minimum_order_value);
          this.maximumDiscountValue = Number(coupon.maximum_discount_value);
          this.validForOrder = Number(coupon.valid_for_order);
          this.type = Number(coupon.type);
          this.orderType = Number(coupon.order_type);
          // couponApplicableFor
          // personID
          if (coupon.client_id.length > 0) {
            this.couponApplicableFor = 3;
            this.personID = coupon.client_id;
          } else if (coupon.counsellor_id.length > 0) {
            this.couponApplicableFor = 1;
            this.personID = coupon.counsellor_id;
          } else if (coupon.therapist_id.length > 0) {
            this.couponApplicableFor = 4;
            this.personID = coupon.therapist_id;
          }
          this.startBy = moment.utc(coupon.start_by).local().format('YYYY-MM-DD');
          this.endBy = moment.utc(coupon.end_by).local().format('YYYY-MM-DD');
          this.status = coupon.status;
        }
      }
    });
  }

  postCoupon() {
    this.utilityService.checkUserLogin();
    let clienID = '';
    let counsellorID = '';
    let therapistID = '';
    switch (Number(this.couponApplicableFor)) {
      case 1:
        counsellorID = this.personID;
        break;
      case 3:
        clienID = this.personID;
        break;
      case 4:
        therapistID = this.personID;
        break;
      default:
        break;
    }
    this.apiClient.postCoupon(this.promoCode, clienID, counsellorID, therapistID, this.discount.toString(), this.minimumOrderValue.toString(), this.maximumDiscountValue.toString(), this.validForOrder.toString(), this.type.toString(), this.orderType.toString(), moment.utc(this.startBy).format(), moment.utc(this.endBy).format()).subscribe((response: any) => {
      if (response !== null && response.meta.status === '440') {
        this.utilityService.refreshToken();
        this.utilityService.wait(3000);
        this.postCoupon();
        return;
      }
      if (response !== null && response.meta.status === '200') {
        this.router.navigate(['/coupons']);
      }
    });
  }

  updateCoupon() {
    this.utilityService.checkUserLogin();
    let clienID = '';
    let counsellorID = '';
    let therapistID = '';
    switch (Number(this.couponApplicableFor)) {
      case 1:
        counsellorID = this.personID;
        break;
      case 3:
        clienID = this.personID;
        break;
      case 4:
        therapistID = this.personID;
        break;
      default:
        break;
    }
    this.apiClient.updateCoupon(this.couponID, this.promoCode, clienID, counsellorID, therapistID, this.discount.toString(), this.minimumOrderValue.toString(), this.maximumDiscountValue.toString(), this.validForOrder.toString(), this.type.toString(), this.orderType.toString(), moment.utc(this.startBy).format(), moment.utc(this.endBy).format(), this.status).subscribe((response: any) => {
      if (response !== null && response.meta.status === '440') {
        this.utilityService.refreshToken();
        this.utilityService.wait(3000);
        this.postCoupon();
        return;
      }
      if (response !== null && response.meta.status === '200') {
        this.router.navigate(['/coupons']);
      }
    });
  }
}
