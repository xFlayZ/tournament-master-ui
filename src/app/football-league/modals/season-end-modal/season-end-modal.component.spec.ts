import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeasonEndModalComponent } from './season-end-modal.component';

describe('SeasonEndModalComponent', () => {
  let component: SeasonEndModalComponent;
  let fixture: ComponentFixture<SeasonEndModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SeasonEndModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SeasonEndModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
