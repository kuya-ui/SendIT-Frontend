import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SenditComponent } from './sendit.component';

describe('SenditComponent', () => {
  let component: SenditComponent;
  let fixture: ComponentFixture<SenditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SenditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SenditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
