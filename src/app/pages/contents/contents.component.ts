import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiClientService  } from 'src/app/services/api-client.service';
import { faPen, faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { UtilityService  } from 'src/app/services/utility.service';

@Component({
  selector: 'app-contents',
  templateUrl: './contents.component.html',
  styleUrls: ['./contents.component.scss']
})
export class ContentsComponent implements OnInit {
  faPen = faPen;
  faAngleRight = faAngleRight;
  faAngleLeft = faAngleLeft;

  moodsResponse: any;
  moodsMap = new Map();
  selectedMoodID = '';

  contentCategoryResponse: any;
  contentCategoriesMap = new Map();
  selectedcontentCategoryID = '';

  selectedcontentType = '';

  counsellorID = '';

  training = '';
  status = '';

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
      if (params.category_id !== undefined) {
        this.selectedcontentCategoryID = params.category_id;
      }
      if (params.type !== undefined) {
        this.selectedcontentType = params.type;
      }
      if (params.counsellor_id !== undefined) {
        this.counsellorID = params.counsellor_id;
      }
      if (params.training !== undefined) {
        this.training = params.training;
      }
      if (params.status !== undefined) {
        this.status = params.status;
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
        this.getContentCateories();
      }
    });
  }

  getContentCateories() {
    this.apiClient.getContentCateories().subscribe((response: any) => {
      this.contentCategoryResponse = response;
      if (response !== null && response.meta.status === '200') {
        response.content_categories.forEach((contentCategory: any) => {
          this.contentCategoriesMap.set(contentCategory.id, contentCategory.category);
        });
        this.getContents(this.page);
      }
    });
  }

  getContents(page: number) {
    this.utilityService.checkUserLogin();
    this.page = page;
    this.apiClient.getContents(this.page.toString(), this.selectedMoodID, this.selectedcontentCategoryID, this.selectedcontentType, this.counsellorID,
      this.training, this.status).subscribe((response: any) => {
      if (response !== null && response.meta.status === '440') {
        this.utilityService.refreshToken();
        this.utilityService.wait(3000);
        this.getContents(page);
        return;
      }
      this.response = response;
      if (response !== null && response.meta.status === '200') {
      }
    });
  }

}
