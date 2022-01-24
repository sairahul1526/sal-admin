import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiClientService  } from 'src/app/services/api-client.service';
import { UtilityService  } from 'src/app/services/utility.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {

  clientID: string = '';

  firstName: string = '';
  lastName: string = '';
  phone: string = '';
  email: string = '';
  dob: string = '';
  gender: string = '';
  status: string = '';

  loader = true;
  
  constructor(private router: Router, private route: ActivatedRoute, private apiClient: ApiClientService, private utilityService: UtilityService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params.client_id !== undefined) {
        this.clientID = params.client_id;
      }
      this.getClient();
    });
  }

  getClient(): any {
    if (this.clientID.length == 0) {
      return;
    }
    this.loader = true;
    this.utilityService.checkUserLogin();
    this.apiClient.getClient(this.clientID).subscribe((response: any) => {
      if (response !== null && response.meta.status === '440') {
        this.utilityService.refreshToken();
        this.utilityService.wait(3000);
        this.getClient();
        return;
      }
      this.loader = false;
      if (response !== null && response.meta.status === '200') {
        if (response.clients.length == 0) {
          return;
        }
        this.firstName = response.clients[0].first_name;
        this.lastName = response.clients[0].last_name;
        this.phone = response.clients[0].phone;
        this.email = response.clients[0].email;
        this.dob = response.clients[0].date_of_birth;
        this.gender = response.clients[0].gender;
        this.status = response.clients[0].status;
      }
    });
  }

  updateClient(): any {
    this.loader = true;
    this.utilityService.checkUserLogin();
    this.apiClient.updateClient(this.clientID, this.firstName, this.lastName, this.phone, this.email, this.dob, this.gender, this.status).subscribe((response: any) => {
      if (response !== null && response.meta.status === '440') {
        this.utilityService.refreshToken();
        this.utilityService.wait(3000);
        this.updateClient();
        return;
      }
      this.loader = false;
      if (response !== null && response.meta.status === '200') {
        this.router.navigate(['/clients']);
      }
    });
  }

}
