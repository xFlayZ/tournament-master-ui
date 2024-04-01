import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FootballLeagueComponent } from './football-league/football-league.component';
import { DartScoreboardComponent } from './dart-scoreboard/dart-scoreboard.component';
import { OverviewComponent } from './overview/overview.component';

const routes: Routes = [
  { path: '', component: OverviewComponent },
  { path: 'footballLeague', component: FootballLeagueComponent },
  { path: 'footballLeague/:leagueUuid', component: FootballLeagueComponent },
  { path: 'dart', component: DartScoreboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
