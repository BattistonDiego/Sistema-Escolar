import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PutOrPostComponent } from './put-or-post.component';

describe('PutOrPostComponent', () => {
  let component: PutOrPostComponent;
  let fixture: ComponentFixture<PutOrPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PutOrPostComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PutOrPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
