import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeagueMatchDayComponent } from './league-match-day.component';

describe('LeagueMatchDayComponent', () => {
  let component: LeagueMatchDayComponent;
  let fixture: ComponentFixture<LeagueMatchDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LeagueMatchDayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LeagueMatchDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
