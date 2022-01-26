import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiClientService  } from 'src/app/services/api-client.service';
import { UtilityService  } from 'src/app/services/utility.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  contentID: string = '';

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

  title: string = '';
  description: string = '';
  photo: string = '';
  backgroundPhoto: string = '';
  content: string = '';

  loader = true;
  
  constructor(private router: Router, private route: ActivatedRoute, private apiClient: ApiClientService, private utilityService: UtilityService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params.content_id !== undefined) {
        this.contentID = params.content_id;
      }
      this.getMoods();
    });
  }

  getMoods() {
    this.loader = true;
    this.apiClient.getMoods().subscribe((response: any) => {
      this.loader = false;
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
    this.loader = true;
    this.apiClient.getContentCateories().subscribe((response: any) => {
      this.loader = false;
      this.contentCategoryResponse = response;
      if (response !== null && response.meta.status === '200') {
        response.content_categories.forEach((contentCategory: any) => {
          this.contentCategoriesMap.set(contentCategory.id, contentCategory.category);
        });
        this.getContent();
      }
    });
  }

  getContent(): any {
    if (this.contentID.length == 0) {
      return;
    }
    this.loader = true;
    this.utilityService.checkUserLogin();
    this.apiClient.getContent(this.contentID).subscribe((response: any) => {
      if (response !== null && response.meta.status === '440') {
        this.utilityService.refreshToken();
        this.utilityService.wait(3000);
        this.getContent();
        return;
      }
      this.loader = false;
      if (response !== null && response.meta.status === '200') {
        if (response.contents.length == 0) {
          return;
        }
        this.title = response.contents[0].title;
        this.description = response.contents[0].description;
        this.photo = response.contents[0].photo;
        this.backgroundPhoto = response.contents[0].background_photo;
        this.content = response.contents[0].content;
        this.selectedcontentType = response.contents[0].type;
        this.selectedcontentCategoryID = response.contents[0].category_id;
        this.training = response.contents[0].training;
        this.selectedMoodID = response.contents[0].mood_id;
        this.status = response.contents[0].status;
      }
    });
  }

  updateContent(): any {
    this.loader = true;
    this.utilityService.checkUserLogin();
    this.apiClient.updateContent(this.contentID, this.counsellorID, this.title, this.description, this.photo, this.backgroundPhoto, this.content, this.selectedcontentType, this.getRedirection(this.selectedcontentType), this.selectedcontentCategoryID, this.training, this.selectedMoodID, this.status).subscribe((response: any) => {
      if (response !== null && response.meta.status === '440') {
        this.utilityService.refreshToken();
        this.utilityService.wait(3000);
        this.updateContent();
        return;
      }
      this.loader = false;
      if (response !== null && response.meta.status === '200') {
        this.router.navigate(['/contents']);
      }
    });
  }

  postContent(): any {
    this.loader = true;
    this.utilityService.checkUserLogin();
    this.apiClient.postContent(this.counsellorID, this.title, this.description, this.photo, this.backgroundPhoto, this.content, this.selectedcontentType, this.getRedirection(this.selectedcontentType), this.selectedcontentCategoryID, this.training, this.selectedMoodID).subscribe((response: any) => {
      if (response !== null && response.meta.status === '440') {
        this.utilityService.refreshToken();
        this.utilityService.wait(3000);
        this.postContent();
        return;
      }
      this.loader = false;
      if (response !== null && response.meta.status === '200') {
        this.router.navigate(['/contents']);
      }
    });
  }

  onPhotoSelected(event: any): any {
    if (event.target.files.length == 0) {
      return;
    }
    this.loader = true;
    this.utilityService.checkUserLogin();
    this.apiClient.uploadContent(event.target.files[0]).subscribe((response: any) => {
      if (response !== null && response.meta.status === '440') {
        this.utilityService.refreshToken();
        this.utilityService.wait(3000);
        this.onPhotoSelected(event);
        return;
      }
      this.loader = false;
      if (response !== null && response.meta.status === '200') {
        this.photo = response.file;
      }
    });
  }

  onBackgroundPhotoSelected(event: any): any {
    if (event.target.files.length == 0) {
      return;
    }
    this.loader = true;
    this.utilityService.checkUserLogin();
    this.apiClient.uploadContent(event.target.files[0]).subscribe((response: any) => {
      if (response !== null && response.meta.status === '440') {
        this.utilityService.refreshToken();
        this.utilityService.wait(3000);
        this.onBackgroundPhotoSelected(event);
        return;
      }
      this.loader = false;
      if (response !== null && response.meta.status === '200') {
        this.backgroundPhoto = response.file;
      }
    });
  }

  onContentSelected(event: any): any {
    if (event.target.files.length == 0) {
      return;
    }
    this.loader = true;
    this.utilityService.checkUserLogin();
    this.apiClient.uploadContent(event.target.files[0]).subscribe((response: any) => {
      if (response !== null && response.meta.status === '440') {
        this.utilityService.refreshToken();
        this.utilityService.wait(3000);
        this.onContentSelected(event);
        return;
      }
      this.loader = false;
      if (response !== null && response.meta.status === '200') {
        this.content = response.file;
      }
    });
  }

  getRedirection(contentType: string): string {
    switch (contentType) {
      case '1': // video
        return '1'; // native
      case '2': // audio
        return '1'; // native
      case '3': // article
        return '2'; // webview
      default:
        return '1'; // native
    }
  }
}
