import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExampleFormComponent } from './example-form/example-form.component';
import { FootballLeagueComponent } from './football-league/football-league.component';
import { DartScoreboardComponent } from './dart-scoreboard/dart-scoreboard.component';

const routes: Routes = [
  { path: '', component: DartScoreboardComponent },
  { path: 'footballLeague', component: FootballLeagueComponent },
  { path: 'footballLeague/:leagueUuid', component: FootballLeagueComponent },
  { path: 'example', component: ExampleFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
