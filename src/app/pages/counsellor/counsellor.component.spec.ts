import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounsellorComponent } from './counsellor.component';

describe('CounsellorComponent', () => {
  let component: CounsellorComponent;
  let fixture: ComponentFixture<CounsellorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CounsellorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CounsellorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
