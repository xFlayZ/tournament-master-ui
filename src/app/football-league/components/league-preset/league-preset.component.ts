import { Component, Output, EventEmitter, OnInit, Input } from '@angular/core';
import { StringHelper } from '../../../../helper';
import { DataService } from '../../../services/data.service';
import { Router } from '@angular/router'; 

interface FootballLeagueMatches {
  leagueId: string;
  homeTeam: string;
  awayTeam: string;
  homeGoals: number;
  awayGoals: number;
  matchDay: number;
}

interface Teams {
  name: string;
  points: number;
  matches: number;
  wins: number;
  draws: number;
  lose: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
}

@Component({
  selector: 'app-league-preset',
  templateUrl: './league-preset.component.html',
  styleUrls: ['./league-preset.component.css']
})

export class LeaguePresetComponent {

  @Output() teamChanges: EventEmitter<any[]> = new EventEmitter<any[]>();
  @Output() leagueStatusChange: EventEmitter<string> = new EventEmitter<string>();

  teams: any[] = [];
  totalMatchDays: number = 0;
  leagueUuid: string = this.generateUUID();

  constructor(private dataService: DataService, private router: Router) {}
  
  onAddTeam(teamName: string) {
    if (teamName.trim() !== '') {
      const team = {
        name:  StringHelper.capitalizeFirstLetter(teamName),
        points: 0,
        games: 0,
        wins: 0,
        draws: 0,
        losses: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        goalDifference: 0,
      };
      this.teams.push(team);
      this.teamChanges.emit(this.teams);
    }
  }

  onRemoveTeam(teamName: string) {
    if (teamName.trim() !== '') {
        const index = this.teams.findIndex(team => team.name === teamName);
        if (index !== -1) {
            this.teams.splice(index, 1);
            this.teamChanges.emit(this.teams);
        }
  }
}

  onReset() {
    this.teams = [];
    this.teamChanges.emit(this.teams);
  }

  onPresetsDone() {
    for (const team of this.teams) {
      const data = {
        team: team.name,
        points: team.points,
        matches: team.games,
        wins: team.wins,
        draws: team.draws,
        lose: team.losses,
        goalsFor: team.goalsFor,
        goalsAgainst: team.goalsAgainst,
        goalDifference: team.goalDifference,
        leagueId: this.leagueUuid,
        leagueStatus: 'currentSeason'
      };
      
      this.dataService.postFootballLeague(data).subscribe();
    }

    this.generateMatches(this.teams);
    this.router.navigate(['/footballLeague', this.leagueUuid]);
  }

  generateMatches(teams: Teams[]) {
    const teamNames: string[] = teams.map(team => team.name);
    const matches: FootballLeagueMatches[] = [];
    const totalTeams = teams.length;
    const totalRounds = totalTeams - 1;
    const matchesPerRound = totalTeams / 2;
    const playedMatches: Set<string> = new Set();

    if (totalTeams % 2 !== 0) {
      teamNames.push('Freilos');
    }

    for (let round = 0; round < totalRounds; round++) {
      const roundMatches: FootballLeagueMatches[] = [];
      
      for (let match = 0; match < matchesPerRound; match++) {
          const homeIndex = (round + match) % totalTeams;
          let awayIndex = (totalTeams - 1 - match + round) % totalTeams;
          
          while (awayIndex === homeIndex || playedMatches.has(`${teamNames[homeIndex]}-${teamNames[awayIndex]}`) || playedMatches.has(`${teamNames[awayIndex]}-${teamNames[homeIndex]}`)) {
              awayIndex = (awayIndex + 1) % totalTeams;
          }
          
          const homeTeam = teamNames[homeIndex];
          const awayTeam = teamNames[awayIndex];
          const matchKey = `${homeTeam}-${awayTeam}`;

          if (!playedMatches.has(matchKey)) {
              roundMatches.push({
                  leagueId: this.leagueUuid,
                  homeTeam: homeTeam,
                  awayTeam: awayTeam,
                  awayGoals: 0,
                  homeGoals: 0,
                  matchDay: round + 1
              });
              playedMatches.add(matchKey);
          }
      }
      
      matches.push(...roundMatches);
    }

    const duplicatedMatches: FootballLeagueMatches[] = [];
    for (const match of matches) {
        const duplicatedMatch: FootballLeagueMatches = {
            leagueId: match.leagueId,
            homeTeam: match.awayTeam,
            awayTeam: match.homeTeam,
            homeGoals: 0,
            awayGoals: 0,
            matchDay: match.matchDay - 1 + totalTeams
        };
        duplicatedMatches.push(duplicatedMatch);
    }

    matches.push(...duplicatedMatches);

    for (const match of matches) {
      const data = {
        leagueId: match.leagueId,
        homeTeam: match.homeTeam,
        awayTeam: match.awayTeam,
        homeGoals: match.homeGoals,
        awayGoals: match.awayGoals,
        matchDay: match.matchDay
      };
      
      this.dataService.postFootballLeagueMatches(match).subscribe();
    }
}




  generateUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0,
            v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}

