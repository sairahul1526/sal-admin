import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { ApiClientService  } from 'src/app/services/api-client.service';
import { UtilityService  } from 'src/app/services/utility.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  faAngleRight = faAngleRight;
  faAngleLeft = faAngleLeft;

  orderID: string = '';

  topicsResponse: any;
  topicsMap = new Map();
  selectedTopicID = '';

  counsellorID = '';

  status = '';

  title: string = '';
  description: string = '';
  photo: string = '';
  date: string = '';
  time: string = '';
  duration: string = '';
  price: string = '';

  loader = true;
  response: any;
  userID = '';
  page = 1;
  
  constructor(private router: Router, private route: ActivatedRoute, private apiClient: ApiClientService, private utilityService: UtilityService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params.page !== undefined) {
        this.page = Number(params.page);
      }
      if (params.order_id !== undefined) {
        this.orderID = params.order_id;
      }
      this.getTopics();
    });
  }

  getTopics() {
    this.loader = true;
    this.apiClient.getTopics().subscribe((response: any) => {
      this.loader = false;
      this.topicsResponse = response;
      if (response !== null && response.meta.status === '200') {
        response.topics.forEach((topic: any) => {
          this.topicsMap.set(topic.id, topic.topic);
        });
        this.getEvent();
      }
    });
  }

  getEvent(): any {
    if (this.orderID.length == 0) {
      return;
    }
    this.loader = true;
    this.utilityService.checkUserLogin();
    this.apiClient.getEvent(this.orderID).subscribe((response: any) => {
      if (response !== null && response.meta.status === '440') {
        this.utilityService.refreshToken();
        this.utilityService.wait(3000);
        this.getEvent();
        return;
      }
      this.loader = false;
      if (response !== null && response.meta.status === '200') {
        if (response.events.length == 0) {
          return;
        }
        this.title = response.events[0].title;
        this.description = response.events[0].description;
        this.photo = response.events[0].photo;
        this.counsellorID = response.events[0].counsellor_id;
        this.date = response.events[0].date;
        this.time = response.events[0].time;
        this.duration = response.events[0].duration;
        this.price = response.events[0].price;
        this.selectedTopicID = response.events[0].topic_id;
        this.status = response.events[0].status;
      }

      this.getEventsBooked(this.page);
    });
  }

  getEventsBooked(page: number) {
    this.loader = true;
    this.utilityService.checkUserLogin();
    this.page = page;
    this.apiClient.getEventsBooked(this.page.toString(), this.orderID, this.userID).subscribe((response: any) => {
      if (response !== null && response.meta.status === '440') {
        this.utilityService.refreshToken();
        this.utilityService.wait(3000);
        this.getEventsBooked(page);
        return;
      }
      this.loader = false;
      this.response = response;
      if (response !== null && response.meta.status === '200') {
      }
    });
  }

  updateEvent(): any {
    this.loader = true;
    this.utilityService.checkUserLogin();
    this.apiClient.updateEvent(this.orderID, this.counsellorID, this.title, this.description, this.photo, this.selectedTopicID, this.date, this.time, this.duration, this.price, this.status).subscribe((response: any) => {
      if (response !== null && response.meta.status === '440') {
        this.utilityService.refreshToken();
        this.utilityService.wait(3000);
        this.updateEvent();
        return;
      }
      this.loader = false;
      if (response !== null && response.meta.status === '200') {
        this.router.navigate(['/events']);
      }
    });
  }

  onPhotoSelected(event: any): any {
    if (event.target.files.length == 0) {
      return;
    }
    this.loader = true;
    this.utilityService.checkUserLogin();
    this.apiClient.uploadEvent(event.target.files[0]).subscribe((response: any) => {
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
  
}
