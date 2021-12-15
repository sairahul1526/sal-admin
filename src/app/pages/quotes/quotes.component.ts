import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiClientService  } from 'src/app/services/api-client.service';
import { faTrash, faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { UtilityService  } from 'src/app/services/utility.service';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.scss']
})
export class QuotesComponent implements OnInit {
  faTrash = faTrash;
  faAngleRight = faAngleRight;
  faAngleLeft = faAngleLeft;

  moodsResponse: any;
  moodsMap = new Map();
  selectedMoodID = '';
  response: any;
  page = 1;
  
  constructor(private route: ActivatedRoute, private apiClient: ApiClientService, private utilityService: UtilityService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params.page !== undefined) {
        this.page = Number(params.page);
      }
      if (params.mood_id !== undefined) {
        this.selectedMoodID = params.mood_id;
      }
      this.getMoods();
    });
  }


  getMoods() {
    this.apiClient.getMoods().subscribe((response: any) => {
      this.moodsResponse = response;
      if (response !== null && response.meta.status === '200') {
        response.moods.forEach((mood: any) => {
          this.moodsMap.set(mood.id, mood.title);
        });
        this.getQuotes(this.page);
      }
    });
  }


  getQuotes(page: number) {
    this.utilityService.checkUserLogin();
    this.page = page;
    this.apiClient.getQuotes(page.toString(), this.selectedMoodID).subscribe((response: any) => {
      if (response !== null && response.meta.status === '440') {
        this.utilityService.refreshToken();
        this.utilityService.wait(3000);
        this.getQuotes(page);
        return;
      }
      this.response = response;
      if (response !== null && response.meta.status === '200') {
      }
    });
  }

  deleteQuote(id: string) {
    this.utilityService.checkUserLogin();
    this.apiClient.deleteQuote(id).subscribe((response: any) => {
      if (response !== null && response.meta.status === '440') {
        this.utilityService.refreshToken();
        this.utilityService.wait(3000);
        this.deleteQuote(id);
        return;
      }
      this.response = response;
      if (response !== null && response.meta.status === '200') {
        this.page = 1;
        this.getQuotes(this.page);
      }
    });
  }

}
