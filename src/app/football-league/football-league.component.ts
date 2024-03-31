import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-football-league',
  templateUrl: './football-league.component.html',
  styleUrls: ['./football-league.component.css']
})
export class FootballLeagueComponent implements OnInit {

  @Output() leagueUuid: string = '';

  firstPlaceTeam: string = '';
  leagueStatus: string = "preset";
  private _teams: any[] = [];

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.leagueUuid = params.get('leagueUuid') || '';

      if (this.leagueUuid != '') {
        this.leagueStatus = "currentSeason"
      }
    });
  }

  get teams(): any[] {
    return this._teams;
  }

  set teams(value: any[]) {
    this._teams = value;
    this.updateFirstPlaceTeam();
  }

  updateTeams(teams: any[]) {
    this.teams = teams;
  }

  updateLeagueStatus(status: string) {
    this.leagueStatus = status;
  }

  updateFirstPlaceTeam() {
    if (this.teams.length > 0) {
      this.teams.sort((a, b) => b.points - a.points);
      this.firstPlaceTeam = this.teams[0].name;
    } else {
      this.firstPlaceTeam = '';
    }
  }
}
