import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiClientService  } from 'src/app/services/api-client.service';
import { UtilityService  } from 'src/app/services/utility.service';

@Component({
  selector: 'app-listener',
  templateUrl: './listener.component.html',
  styleUrls: ['./listener.component.scss']
})
export class ListenerComponent implements OnInit {

  listenerID: string = '';

  firstName: string = '';
  lastName: string = '';
  phone: string = '';
  email: string = '';
  gender: string = '';
  occupation: string = '';
  experience: string = '';
  about: string = '';
  status: string = '';

  loader = true;

  constructor(private router: Router, private route: ActivatedRoute, private apiClient: ApiClientService, private utilityService: UtilityService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params.listener_id !== undefined) {
        this.listenerID = params.listener_id;
      }
      this.getListener();
    });
  }

  getListener(): any {
    if (this.listenerID.length == 0) {
      return;
    }
    this.loader = true;
    this.utilityService.checkUserLogin();
    this.apiClient.getListener(this.listenerID).subscribe((response: any) => {
      if (response !== null && response.meta.status === '440') {
        this.utilityService.refreshToken();
        this.utilityService.wait(3000);
        this.getListener();
        return;
      }
      this.loader = false;
      if (response !== null && response.meta.status === '200') {
        if (response.listeners.length == 0) {
          return;
        }
        this.firstName = response.listeners[0].first_name;
        this.lastName = response.listeners[0].last_name;
        this.phone = response.listeners[0].phone;
        this.email = response.listeners[0].email;
        this.gender = response.listeners[0].gender;
        this.occupation = response.listeners[0].occupation;
        this.experience = response.listeners[0].experience;
        this.about = response.listeners[0].about;
        this.status = response.listeners[0].status;
      }
    });
  }

  updateListener(): any {
    this.loader = true;
    this.utilityService.checkUserLogin();
    this.apiClient.updateListener(this.listenerID, this.firstName, this.lastName, this.phone, this.email, this.gender, this.occupation, this.experience, this.about, this.status).subscribe((response: any) => {
      if (response !== null && response.meta.status === '440') {
        this.utilityService.refreshToken();
        this.utilityService.wait(3000);
        this.updateListener();
        return;
      }
      this.loader = false;
      if (response !== null && response.meta.status === '200') {
        this.router.navigate(['/listeners']);
      }
    });
  }

}
