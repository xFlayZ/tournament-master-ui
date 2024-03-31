import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments';


export interface Example {
  id: number;
  name: string;
  description: string;
}

export interface FootballLeague {
  id: number;
  leagueId: string;
  team: string;
  points: number;
  matches: number;
  wins: number;
  draws: number;
  lose: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  leagueStatus: string;
}

export interface FootballLeagueMatches {
  leagueId: string;
  homeTeam: string;
  awayTeam: string;
  homeGoals: number;
  awayGoals: number;
  matchDay: number;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // example api

  getExamples(): Observable<Example[]> {
    return this.http.get<Example[]>(this.apiUrl + "/example");
  }

  postExample(data: any): Observable<any> {
    return this.http.post(this.apiUrl + "/example", data);
  }

  // football-league api

  postFootballLeague(data: any): Observable<any> {
    return this.http.post(this.apiUrl + "/football-league", data);
  }

  getFootballLeague(): Observable<FootballLeague[]> {
    return this.http.get<FootballLeague[]>(this.apiUrl + "/football-league");
  }

  getFootballLeagueByLeagueUuid(leagueUuid: string): Observable<FootballLeague[]> {
    return this.http.get<FootballLeague[]>(this.apiUrl + "/football-league/" + leagueUuid);
  }

  // football-league-matches api

  postFootballLeagueMatches(data: any): Observable<any> {
    return this.http.post(this.apiUrl + "/football-league-matches", data);
  }

  getFootballLeagueMatchesByLeagueUuidAndMatchday(leagueUuid: string, matchDay: number): Observable<FootballLeagueMatches[]> {
    return this.http.get<FootballLeagueMatches[]>(this.apiUrl + "/football-league-matches/" + leagueUuid + "/" + matchDay);
  }

  updateFootballLeagueMatches(updateData: any): Observable<any> {
    return this.http.put(this.apiUrl + "/football-league-matches", updateData);
  }

}