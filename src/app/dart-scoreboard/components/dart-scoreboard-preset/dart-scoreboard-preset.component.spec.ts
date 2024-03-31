import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DartScoreboardPresetComponent } from './dart-scoreboard-preset.component';

describe('DartScoreboardPresetComponent', () => {
  let component: DartScoreboardPresetComponent;
  let fixture: ComponentFixture<DartScoreboardPresetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DartScoreboardPresetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DartScoreboardPresetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
