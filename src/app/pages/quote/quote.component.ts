import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiClientService  } from 'src/app/services/api-client.service';
import { UtilityService  } from 'src/app/services/utility.service';

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.scss']
})
export class QuoteComponent implements OnInit {

  quote: string = '';
  moodID: string = '';
  moodsResponse: any;
  
  loader = true;

  constructor(private router: Router, private apiClient: ApiClientService, private utilityService: UtilityService) { }

  ngOnInit(): void {
    this.getMoods();
  }

  getMoods() {
    this.loader = true;
    this.apiClient.getMoods().subscribe((response: any) => {
      this.moodsResponse = response;
      this.loader = false;
      if (response !== null && response.meta.status === '200') {
      }
    });
  }

  postQuote() {
    this.loader = true;
    this.utilityService.checkUserLogin();
    this.apiClient.postQuote(this.quote, this.moodID).subscribe((response: any) => {
      if (response !== null && response.meta.status === '440') {
        this.utilityService.refreshToken();
        this.utilityService.wait(3000);
        this.postQuote();
        return;
      }
      this.loader = false;
      if (response !== null && response.meta.status === '200') {
        this.router.navigate(['/quotes']);
      }
    });
  }
}
