import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounsellorsComponent } from './counsellors.component';

describe('CounsellorsComponent', () => {
  let component: CounsellorsComponent;
  let fixture: ComponentFixture<CounsellorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CounsellorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CounsellorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
