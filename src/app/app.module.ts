import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExampleFormComponent } from './example-form/example-form.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FootballLeagueComponent } from './football-league/football-league.component';
import { LeagueMatchDayComponent } from './football-league/components/league-match-day/league-match-day.component';
import { LeaguePresetComponent } from './football-league/components/league-preset/league-preset.component';
import { LeagueTableComponent } from './football-league/components/league-table/league-table.component';
import { SeasonEndModalComponent } from './football-league/modals/season-end-modal/season-end-modal.component';
import { DartScoreboardComponent } from './dart-scoreboard/dart-scoreboard.component';
import { DartScoreboardPresetComponent } from './dart-scoreboard/components/dart-scoreboard-preset/dart-scoreboard-preset.component';
import { DartBoardComponent } from './dart-scoreboard/components/dart-board/dart-board.component';
import { DartPresetInfoComponent } from './dart-scoreboard/components/dart-preset-info/dart-preset-info.component';
import { ErrorMessageComponent } from './shared/components/error-message/error-message.component';
import { OverviewComponent } from './overview/overview.component';

@NgModule({
  declarations: [
    AppComponent,
    ExampleFormComponent,
    FootballLeagueComponent,
    LeagueMatchDayComponent,
    LeaguePresetComponent,
    LeagueTableComponent,
    SeasonEndModalComponent,
    DartScoreboardComponent,
    DartScoreboardPresetComponent,
    DartBoardComponent,
    DartPresetInfoComponent,
    ErrorMessageComponent,
    OverviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule 
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
