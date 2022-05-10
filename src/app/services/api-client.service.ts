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
  private APPOINTMENT_REFUND = '/admin/appointment/refund';
  private CLIENT = '/admin/client';
  private COUNSELLOR = '/admin/counsellor';
  private EVENT = '/admin/event';
  private EVENT_UPLOAD = '/admin/event/upload';
  private EVENT_BOOK = '/admin/event/book';
  private LISTENER = '/admin/listener';
  private THERAPIST = '/admin/therapist';
  private CONTENT = '/admin/content';
  private CONTENT_UPLOAD = '/admin/content/upload';
  private COUPON = '/admin/coupon';
  private QUOTE = '/admin/quote';
  private REPORT = '/admin/report';
  private NOTIFICATION = '/admin/notification';
  private MOOD = '/mood';
  private TOPIC = '/topic';

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

  getTopics(): any {
    return this.httpClient.get(this.REST_API_SERVER + this.TOPIC).pipe(retry(this.retryCount));
  }

  getContentCateories(): any {
    return this.httpClient.get(this.REST_API_SERVER + this.CONTENT_CATEGORY).pipe(retry(this.retryCount));
  }

  getReportURL(id: string, startBy: string, endBy: string): string {
    return this.REST_API_SERVER + this.REPORT + "?id="+id+"&start_by="+startBy+"&end_by="+endBy+"&access_token="+sessionStorage.getItem('access_token');
  }

  getReports(id: string, startBy: string, endBy: string): any {
    const headers = this.getHeaders();
    const params = new HttpParams()
    .set('id', id)
    .set('start_by', startBy)
    .set('end_by', endBy)
    .set('type', 'json');
    return this.httpClient.get(this.REST_API_SERVER + this.REPORT, { params: params, headers: headers }).pipe(retry(this.retryCount));
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

  getAppointments(page: string, state: string, clientID: string, counsellorID: string, appointmentID: string): any {
    const headers = this.getHeaders();
    const params = new HttpParams()
    .set('page', page)
    .set('state', state)
    .set('client_id', clientID)
    .set('counsellor_id', counsellorID)
    .set('appointment_id', appointmentID);
    return this.httpClient.get(this.REST_API_SERVER + this.APPOINTMENT, { params: params, headers: headers }).pipe(retry(this.retryCount));
  }

  refundAppointment(appointmentID: string, refundAmount: string): any {
    const headers = this.getHeaders();
    const params = new HttpParams()
    .set('appointment_id', appointmentID)
    .set('refund_amount', refundAmount);
    return this.httpClient.put(this.REST_API_SERVER + this.APPOINTMENT_REFUND, {}, { params: params, headers: headers }).pipe(retry(this.retryCount));
  }

  getEvents(page: string, status: string, counsellorID: string, topicID: string): any {
    const headers = this.getHeaders();
    const params = new HttpParams()
    .set('page', page)
    .set('status', status)
    .set('counsellor_id', counsellorID)
    .set('topic_id', topicID);
    return this.httpClient.get(this.REST_API_SERVER + this.EVENT, { params: params, headers: headers }).pipe(retry(this.retryCount));
  }

  getEvent(orderID: string): any {
    const headers = this.getHeaders();
    const params = new HttpParams()
    .set('order_id', orderID);
    return this.httpClient.get(this.REST_API_SERVER + this.EVENT, { params: params, headers: headers }).pipe(retry(this.retryCount));
  }

  getEventsBooked(page: string, eventOrderID: string, userID: string): any {
    const headers = this.getHeaders();
    const params = new HttpParams()
    .set('page', page)
    .set('event_order_id', eventOrderID)
    .set('user_id', userID);
    return this.httpClient.get(this.REST_API_SERVER + this.EVENT_BOOK, { params: params, headers: headers }).pipe(retry(this.retryCount));
  }

  uploadEvent(file: File): any {
    const formData = new FormData();
    formData.append('file', file);

    return this.httpClient.post(this.REST_API_SERVER + this.EVENT_UPLOAD, formData);
  }

  updateEvent(orderID: string, counsellorID: string, title: string, description: string, photo: string, topicID: string,
    date: string, time: string, duration: string, price: string, status: string): any {
    const headers = this.getHeaders();
    const params = new HttpParams()
    .set('order_id', orderID);
    return this.httpClient.put(this.REST_API_SERVER + this.EVENT, {
      counsellor_id: counsellorID,
      title: title,
      description: description,
      photo: photo,
      topic_id: topicID,
      date: date,
      time: time,
      duration: duration,
      price: price,
      status: status,
    }, { params: params, headers: headers }).pipe(retry(this.retryCount));
  }

  getClients(page: string, name: string, phone: string, email: string, status: string): any {
    const headers = this.getHeaders();
    const params = new HttpParams()
    .set('page', page)
    .set('name', name)
    .set('phone', phone)
    .set('email', email)
    .set('status', status);
    return this.httpClient.get(this.REST_API_SERVER + this.CLIENT, { params: params, headers: headers }).pipe(retry(this.retryCount));
  }

  getClient(clientID: string): any {
    const headers = this.getHeaders();
    const params = new HttpParams()
    .set('client_id', clientID);
    return this.httpClient.get(this.REST_API_SERVER + this.CLIENT, { params: params, headers: headers }).pipe(retry(this.retryCount));
  }

  updateClient(clientID: string, firstName: string, lastName: string, phone: string, email: string, dob: string,
    gender: string, status: string): any {
    const headers = this.getHeaders();
    const params = new HttpParams()
    .set('client_id', clientID);
    return this.httpClient.put(this.REST_API_SERVER + this.CLIENT, {
      first_name: firstName,
      last_name: lastName,
      phone: phone,
      email: email,
      date_of_birth: dob,
      gender: gender,
      status: status,
    }, { params: params, headers: headers }).pipe(retry(this.retryCount));
  }

  getCounsellors(page: string, name: string, phone: string, email: string, status: string): any {
    const headers = this.getHeaders();
    const params = new HttpParams()
    .set('page', page)
    .set('name', name)
    .set('phone', phone)
    .set('email', email)
    .set('status', status);
    return this.httpClient.get(this.REST_API_SERVER + this.COUNSELLOR, { params: params, headers: headers }).pipe(retry(this.retryCount));
  }

  getCounsellor(counsellorID: string): any {
    const headers = this.getHeaders();
    const params = new HttpParams()
    .set('counsellor_id', counsellorID);
    return this.httpClient.get(this.REST_API_SERVER + this.COUNSELLOR, { params: params, headers: headers }).pipe(retry(this.retryCount));
  }

  updateCounsellor(counsellorID: string, firstName: string, lastName: string, phone: string, email: string,
    gender: string, price: string, price3: string, price5: string, education: string, experience: string, about: string, payoutPercentage: string, payeeName: string, bankAccountNo: string, ifsc: string, branchName: string, bankName: string, bankAccountType: string, pan: string, status: string): any {
    const headers = this.getHeaders();
    const params = new HttpParams()
    .set('counsellor_id', counsellorID);
    return this.httpClient.put(this.REST_API_SERVER + this.COUNSELLOR, {
      first_name: firstName,
      last_name: lastName,
      phone: phone,
      email: email,
      gender: gender,
      price: price.toString(),
      price_3: price3.toString(),
      price_5: price5.toString(),
      education: education,
      experience: experience,
      about: about,
      payout_percentage: payoutPercentage.toString(),
      payee_name: payeeName,
      bank_account_no: bankAccountNo,
      ifsc: ifsc,
      branch_name: branchName,
      bank_name: bankName,
      bank_account_type: bankAccountType,
      pan: pan,
      status: status,
    }, { params: params, headers: headers }).pipe(retry(this.retryCount));
  }

  getTherapists(page: string, name: string, phone: string, email: string, status: string): any {
    const headers = this.getHeaders();
    const params = new HttpParams()
    .set('page', page)
    .set('name', name)
    .set('phone', phone)
    .set('email', email)
    .set('status', status);
    return this.httpClient.get(this.REST_API_SERVER + this.THERAPIST, { params: params, headers: headers }).pipe(retry(this.retryCount));
  }

  getTherapist(therapistID: string): any {
    const headers = this.getHeaders();
    const params = new HttpParams()
    .set('therapist_id', therapistID);
    return this.httpClient.get(this.REST_API_SERVER + this.THERAPIST, { params: params, headers: headers }).pipe(retry(this.retryCount));
  }

  updateTherapist(therapistID: string, firstName: string, lastName: string, phone: string, email: string,
    gender: string, price: string, price3: string, price5: string, education: string, experience: string, about: string, payoutPercentage: string, payeeName: string, bankAccountNo: string, ifsc: string, branchName: string, bankName: string, bankAccountType: string, pan: string, status: string): any {
    const headers = this.getHeaders();
    const params = new HttpParams()
    .set('therapist_id', therapistID);
    return this.httpClient.put(this.REST_API_SERVER + this.THERAPIST, {
      first_name: firstName,
      last_name: lastName,
      phone: phone,
      email: email,
      gender: gender,
      price: price.toString(),
      price_3: price3.toString(),
      price_5: price5.toString(),
      education: education,
      experience: experience,
      about: about,
      payout_percentage: payoutPercentage.toString(),
      payee_name: payeeName,
      bank_account_no: bankAccountNo,
      ifsc: ifsc,
      branch_name: branchName,
      bank_name: bankName,
      bank_account_type: bankAccountType,
      pan: pan,
      status: status,
    }, { params: params, headers: headers }).pipe(retry(this.retryCount));
  }


  getListeners(page: string, name: string, phone: string, email: string, status: string): any {
    const headers = this.getHeaders();
    const params = new HttpParams()
    .set('page', page)
    .set('name', name)
    .set('phone', phone)
    .set('email', email)
    .set('status', status);
    return this.httpClient.get(this.REST_API_SERVER + this.LISTENER, { params: params, headers: headers }).pipe(retry(this.retryCount));
  }

  getListener(listenerID: string): any {
    const headers = this.getHeaders();
    const params = new HttpParams()
    .set('listener_id', listenerID);
    return this.httpClient.get(this.REST_API_SERVER + this.LISTENER, { params: params, headers: headers }).pipe(retry(this.retryCount));
  }

  updateListener(listenerID: string, firstName: string, lastName: string, phone: string, email: string,
    gender: string, occupation: string, experience: string, about: string, status: string): any {
    const headers = this.getHeaders();
    const params = new HttpParams()
    .set('listener_id', listenerID);
    return this.httpClient.put(this.REST_API_SERVER + this.LISTENER, {
      first_name: firstName,
      last_name: lastName,
      phone: phone,
      email: email,
      gender: gender,
      occupation: occupation,
      experience: experience,
      about: about,
      status: status,
    }, { params: params, headers: headers }).pipe(retry(this.retryCount));
  }

  getNotifications(page: string, type: string, userType: string, notificationType: string): any {
    const headers = this.getHeaders();
    const params = new HttpParams()
    .set('page', page)
    .set('type', type)
    .set('user_type', userType)
    .set('notification_type', notificationType)
    return this.httpClient.get(this.REST_API_SERVER + this.NOTIFICATION, { params: params, headers: headers }).pipe(retry(this.retryCount));
  }

  postNotification(title: string, body: string, notificationType: string, userIDs: string, type: string, userType: string): any {
    const headers = this.getHeaders();
    return this.httpClient.post(this.REST_API_SERVER + this.NOTIFICATION, {
      title: title,
      body: body,
      notification_type: notificationType,
      user_ids: userIDs,
      type: type,
      user_type: userType,
    }, { headers }).pipe(retry(this.retryCount));
  }
}
