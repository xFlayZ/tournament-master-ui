import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dart-scoreboard',
  templateUrl: './dart-scoreboard.component.html',
  styleUrl: './dart-scoreboard.component.css'
})
export class DartScoreboardComponent {
  gameStartedData: { players: string[], mode: string, difficulty: string } | null = null;

  receiveGameStarted(event: { players: string[], mode: string, difficulty: string }): void {
    this.gameStartedData = event;
  }
}
