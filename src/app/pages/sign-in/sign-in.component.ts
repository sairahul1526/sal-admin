import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiClientService  } from 'src/app/services/api-client.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  username: string = '';
  password: string = '';

  response: any;
  
  constructor(private router: Router, private apiClient: ApiClientService) { }

  ngOnInit(): void {
  }


  login(): void {
    this.apiClient.login(this.username, this.password).subscribe((response: any) => {
      this.response = response;
      if (response !== null && response.meta.status === '200') {
        localStorage.setItem('refresh_token', response.refresh_token);
        sessionStorage.setItem('access_token', response.access_token);
        localStorage.setItem('admin_id', response.admin.admin_id);
        localStorage.setItem('username', response.admin.username);
        this.router.navigate(['/counsellors']);
      }
    });
  }

}
