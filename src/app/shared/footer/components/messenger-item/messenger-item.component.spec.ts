import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessengerItemComponent } from './messenger-item.component';

describe('MessengerItem', () => {
  let component: MessengerItemComponent;
  let fixture: ComponentFixture<MessengerItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessengerItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MessengerItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
