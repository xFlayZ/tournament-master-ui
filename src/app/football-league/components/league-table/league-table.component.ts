import { Component, Input, OnInit } from '@angular/core';
import { DataService, FootballLeague } from '../../../services/data.service';

@Component({
  selector: 'app-league-table',
  templateUrl: './league-table.component.html',
  styleUrls: ['./league-table.component.css']
})
export class LeagueTableComponent implements OnInit {
  @Input() leagueUuid: string = "";
  teams: any[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    if (this.leagueUuid) {
      this.loadTeamsByLeagueUuid(this.leagueUuid);
    }
  }

  loadTeamsByLeagueUuid(leagueUuid: string): void {
    this.dataService.getFootballLeagueByLeagueUuid(leagueUuid).subscribe(
      (footballLeagues: FootballLeague[]) => {
        this.teams = footballLeagues.map((league: FootballLeague) => ({
          name: league.team,
          points: league.points,
          games: league.matches,
          wins: league.wins,
          draws: league.draws,
          losses: league.lose,
          goalsFor: league.goalsFor,
          goalsAgainst: league.goalsAgainst,
          goalDifference: league.goalDifference
        }));
      },
    );
  }
}
