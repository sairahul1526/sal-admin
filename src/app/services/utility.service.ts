import { Injectable } from '@angular/core';
import { ApiClientService  } from 'src/app/services/api-client.service';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(private apiClient: ApiClientService) { }

  refreshToken() {
    this.apiClient.refreshToken().subscribe((response: any) => {
      if (response !== null && response.meta.status === '200') {
        sessionStorage.setItem('access_token', response.access_token);
      } else {
        window.open('/sign-in', '_self');
      }
    }); 
  }

  wait(ms: number){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
      end = new Date().getTime();
   }
 }

  checkUserLogin() {
    if (localStorage.getItem('admin_id') === null) {
      window.open('/sign-in', '_self');
    }
  }
}
