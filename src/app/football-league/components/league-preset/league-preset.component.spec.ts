import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaguePresetComponent } from './league-preset.component';

describe('LeaguePresetComponent', () => {
  let component: LeaguePresetComponent;
  let fixture: ComponentFixture<LeaguePresetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LeaguePresetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LeaguePresetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
