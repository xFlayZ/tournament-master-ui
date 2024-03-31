import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SeasonEndModalComponent } from '../../modals/season-end-modal/season-end-modal.component';
import { DataService, FootballLeague, FootballLeagueMatches } from '../../../services/data.service';

@Component({
  selector: 'app-league-match-day',
  templateUrl: './league-match-day.component.html',
  styleUrls: ['./league-match-day.component.css']
})
export class LeagueMatchDayComponent implements OnInit {

  @Input() leagueUuid: string = "";
  
  @Output() leagueStatusChange: EventEmitter<string> = new EventEmitter<string>();

  matchDay: number = 1;
  totalMatchDays: number = 6;
  teams: any[] = [];
  matches: any[] = [];
  

  constructor(public dialog: MatDialog, private dataService: DataService) {}  

  ngOnInit(): void {
    if (this.leagueUuid != "" && this.matchDay == 1) {
      this.loadFootballLeagueMatchesByLeagueUuidAndMatchday(this.leagueUuid, this.matchDay);
    }
  }

  nextMatchDay() {
    this.matchDay = this.matchDay + 1;
    this.loadFootballLeagueMatchesByLeagueUuidAndMatchday(this.leagueUuid, this.matchDay);
    this.updateGoals();
    this.loadTeamsByLeagueUuid(this.leagueUuid)
  }

  lastMatchDay() {
    this.matchDay = this.matchDay - 1;
    this.loadFootballLeagueMatchesByLeagueUuidAndMatchday(this.leagueUuid, this.matchDay);
  }

  onEndSeason() {
    this.leagueStatusChange.emit("preset");
    this.updateGoals();
    this.openDialog();
  }

  openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.position = {
      top: '3%',
    };
    dialogConfig.data = {
      firstPlaceTeam: "Placeholder"
    };
    dialogConfig.width = '500px';
    this.dialog.open(SeasonEndModalComponent, dialogConfig);
  }

  updateGoals() {
    for (let i = 0; i < this.matches.length; i++) {
      const match = this.matches[i];

      const updateData = {
        leagueId: match.leagueId,
        homeTeam: match.homeTeam,
        awayTeam: match.awayTeam,
        homeGoals: match.homeGoals,
        awayGoals: match.awayGoals,
        matchDay: match.matchDay
      }
      
      this.dataService.updateFootballLeagueMatches(updateData).subscribe()
    }
  }

  loadFootballLeagueMatchesByLeagueUuidAndMatchday(leagueUuid: string, matchDay: number): void {
    this.dataService.getFootballLeagueMatchesByLeagueUuidAndMatchday(leagueUuid, matchDay).subscribe(
      (footballLeagueMatches: FootballLeagueMatches[]) => {
        this.matches = footballLeagueMatches.map((match: FootballLeagueMatches) => ({
          leagueId: match.leagueId,
          homeTeam: match.homeTeam,
          awayTeam: match.awayTeam,
          homeGoals: match.homeGoals,
          awayGoals: match.awayGoals,
          matchDay: match.matchDay
        }));
      },
    );
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
