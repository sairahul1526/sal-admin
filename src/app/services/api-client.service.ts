import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiClientService {

  // private REST_API_SERVER = 'http://localhost:5000';
  private REST_API_SERVER = 'https://yvsdncrpod.execute-api.ap-south-1.amazonaws.com/prod';

  private LOGIN = '/admin/login';
  private REFRESH_TOKEN = '/admin/refresh-token';

  private CONTENT_CATEGORY = '/content-category';
  private APPOINTMENT = '/admin/appointment';
  private CONTENT = '/admin/content';
  private CONTENT_UPLOAD = '/content/upload';
  private COUPON = '/admin/coupon';
  private QUOTE = '/admin/quote';
  private REPORT = '/admin/report';
  private MOOD = '/mood';

  private retryCount = 3;

  constructor(private httpClient: HttpClient) { }

  getHeaders(): HttpHeaders {
    return new HttpHeaders({'Authorization': 'Bearer ' + sessionStorage.getItem('access_token')});
  }

  login(username: string, password: string): any {
    const headers = this.getHeaders();
      const params = new HttpParams().set('username', username).set('password', password);
    return this.httpClient.get(this.REST_API_SERVER + this.LOGIN, { params: params, headers: headers }).pipe(retry(this.retryCount));
  }

  refreshToken(): any {
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('refresh_token')});
    const params = new HttpParams().set('admin_id', localStorage.getItem('admin_id') + '');
    
    return this.httpClient.get(this.REST_API_SERVER + this.REFRESH_TOKEN, {
      headers: headers,
      params: params,
    }).pipe(retry(this.retryCount));
  }

  getQuotes(page: string, moodID: string): any {
    const headers = this.getHeaders();
    const params = new HttpParams()
    .set('page', page)
    .set('mood_id', moodID);
    return this.httpClient.get(this.REST_API_SERVER + this.QUOTE, { params: params, headers: headers }).pipe(retry(this.retryCount));
  }

  postQuote(quote: string, moodID: string): any {
    const headers = this.getHeaders();
    return this.httpClient.post(this.REST_API_SERVER + this.QUOTE, {
      quote: quote,
      mood_id: moodID,
    }, { headers }).pipe(retry(this.retryCount));
  }

  deleteQuote(id: string): any {
    const headers = this.getHeaders();
    const params = new HttpParams()
      .set('id', id);
    return this.httpClient.delete(this.REST_API_SERVER + this.QUOTE, { params: params, headers: headers }).pipe(retry(this.retryCount));
  }

  getCoupons(page: string, active: string): any {
    const headers = this.getHeaders();
    const params = new HttpParams()
    .set('page', page)
    .set('active', active);
    return this.httpClient.get(this.REST_API_SERVER + this.COUPON, { params: params, headers: headers }).pipe(retry(this.retryCount));
  }

  getCoupon(id: string): any {
    const headers = this.getHeaders();
    const params = new HttpParams()
    .set('id', id);
    return this.httpClient.get(this.REST_API_SERVER + this.COUPON, { params: params, headers: headers }).pipe(retry(this.retryCount));
  }

  postCoupon(couponCode: string, clientID: string, counsellorID: string, therapistID: string,
    discount: string, minimumOrderValue: string, maximumDiscountValue: string, validForOrder: string,
    type: string, orderType: string, startBy: string, endBy: string): any {
    const headers = this.getHeaders();
    return this.httpClient.post(this.REST_API_SERVER + this.COUPON, {
      coupon_code: couponCode,
      client_id: clientID,
      counsellor_id: counsellorID,
      therapist_id: therapistID,
      discount: discount,
      minimum_order_value: minimumOrderValue,
      maximum_discount_value: maximumDiscountValue,
      valid_for_order: validForOrder,
      type: type,
      order_type: orderType,
      start_by: startBy,
      end_by: endBy,
    }, { headers }).pipe(retry(this.retryCount));
  }

  updateCoupon(id: string, couponCode: string, clientID: string, counsellorID: string, therapistID: string,
    discount: string, minimumOrderValue: string, maximumDiscountValue: string, validForOrder: string,
    type: string, orderType: string, startBy: string, endBy: string, status: string): any {
    const headers = this.getHeaders();
    const params = new HttpParams()
    .set('id', id);
    return this.httpClient.put(this.REST_API_SERVER + this.COUPON, {
      coupon_code: couponCode,
      client_id: clientID,
      counsellor_id: counsellorID,
      therapist_id: therapistID,
      discount: discount,
      minimum_order_value: minimumOrderValue,
      maximum_discount_value: maximumDiscountValue,
      valid_for_order: validForOrder,
      type: type,
      order_type: orderType,
      start_by: startBy,
      end_by: endBy,
      status: status,
    }, { params: params, headers: headers }).pipe(retry(this.retryCount));
  }
  
  getMoods(): any {
    return this.httpClient.get(this.REST_API_SERVER + this.MOOD).pipe(retry(this.retryCount));
  }

  getContentCateories(): any {
    return this.httpClient.get(this.REST_API_SERVER + this.CONTENT_CATEGORY).pipe(retry(this.retryCount));
  }

  getReportURL(id: string, startBy: string, endBy: string): string {
    return this.REST_API_SERVER + this.REPORT + "?id="+id+"&start_by="+startBy+"&end_by="+endBy+"&access_token="+sessionStorage.getItem('access_token');
  }

  getContents(page: string, moodID: string, categoryID: string, type: string, counsellorID: string, training: string, status: string): any {
    const headers = this.getHeaders();
    const params = new HttpParams()
    .set('page', page)
    .set('mood_id', moodID)
    .set('category_id', categoryID)
    .set('type', type)
    .set('counsellor_id', counsellorID)
    .set('training', training)
    .set('status', status);
    return this.httpClient.get(this.REST_API_SERVER + this.CONTENT, { params: params, headers: headers }).pipe(retry(this.retryCount));
  }

  getContent(contentID: string): any {
    const headers = this.getHeaders();
    const params = new HttpParams()
    .set('content_id', contentID);
    return this.httpClient.get(this.REST_API_SERVER + this.CONTENT, { params: params, headers: headers }).pipe(retry(this.retryCount));
  }

  postContent(counsellorID: string, title: string, description: string, photo: string, backgroundPhoto: string,
    content: string,type: string, redirection: string, categoryID: string, training: string, moodID: string): any {
    const headers = this.getHeaders();
    return this.httpClient.post(this.REST_API_SERVER + this.CONTENT, {
      counsellor_id: counsellorID,
      title: title,
      description: description,
      photo: photo,
      background_photo: backgroundPhoto,
      content: content,
      type: type,
      redirection: redirection,
      category_id: categoryID,
      training: training,
      mood_id: moodID,
    }, { headers }).pipe(retry(this.retryCount));
  }

  updateContent(contentID: string, counsellorID: string, title: string, description: string, photo: string, backgroundPhoto: string,
    content: string,type: string, redirection: string, categoryID: string, training: string, moodID: string, status: string): any {
    const headers = this.getHeaders();
    const params = new HttpParams()
    .set('content_id', contentID);
    return this.httpClient.put(this.REST_API_SERVER + this.CONTENT, {
      counsellor_id: counsellorID,
      title: title,
      description: description,
      photo: photo,
      background_photo: backgroundPhoto,
      content: content,
      type: type,
      redirection: redirection,
      category_id: categoryID,
      training: training,
      mood_id: moodID,
      status: status,
    }, { params: params, headers: headers }).pipe(retry(this.retryCount));
  }

  uploadContent(file: File): any {
    const formData = new FormData();
    formData.append('file', file);

    return this.httpClient.post(this.REST_API_SERVER + this.CONTENT_UPLOAD, formData);
  }

  getAppointments(page: string, state: string, clientID: string, counsellorID: string): any {
    const headers = this.getHeaders();
    const params = new HttpParams()
    .set('page', page)
    .set('state', state)
    .set('client_id', clientID)
    .set('counsellor_id', counsellorID);
    return this.httpClient.get(this.REST_API_SERVER + this.APPOINTMENT, { params: params, headers: headers }).pipe(retry(this.retryCount));
  }
}
