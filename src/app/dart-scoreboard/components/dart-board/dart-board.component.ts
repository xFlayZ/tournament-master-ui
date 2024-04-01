import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dart-board',
  templateUrl: './dart-board.component.html',
  styleUrl: './dart-board.component.scss'
})
export class DartBoardComponent implements OnInit {
  public thrownNumber = 0;
  public hitOne = 0;
  public hitTwo = 0;
  public hitThree = 0;
  public hitTotal = 0;
  public status = "first";
  public isHighlighted: boolean = false;
  public playerCount = 0;
  public currentPlayerCount = 0;
  public thrownOver = false;

  @Input() players: string[] = [];
  @Input() mode: string = '';
  @Input() difficulty: string = '';

  public gameData: { player: string, score: number }[] = [];

  ngOnInit(): void {
    this.setupGame(this.players, this.mode, this.difficulty)
  }

  setupGame(players: string[], mode: string, difficulty: string) {
    const modeNum = parseInt(mode, 10);

    this.gameData = players.map(player => ({
        player: player,
        score: modeNum
    }));

    this.playerCount = players.length - 1;
    this.hitOne = 0;
    this.hitTwo = 0;
    this.hitThree = 0;
    this.hitTotal = 0;
    this.status = "first"
  }

  updateGameData() {
    if (!this.thrownOver) {
      this.gameData[this.currentPlayerCount].score = this.gameData[this.currentPlayerCount].score - this.hitTotal
    } else {
      this.thrownOver = false;
    }
    

    this.nextPlayer()
    if (this.playerCount > this.currentPlayerCount) {
      this.currentPlayerCount = this.currentPlayerCount + 1
    } else {
      this.currentPlayerCount = 0
    }
    
  }

  deleteLastDart() {
    if (this.status == "second") {
      this.gameData[this.currentPlayerCount].score = this.gameData[this.currentPlayerCount].score + this.hitOne;
      this.hitOne = 0
      this.hitTotal = 0
      this.status = "first"
    }
    if (this.status == "third") {
      this.gameData[this.currentPlayerCount].score = this.gameData[this.currentPlayerCount].score + this.hitTwo;
      this.hitTwo = 0
      this.status = "second"
    }
    if (this.status == "next") {
      this.gameData[this.currentPlayerCount].score = this.gameData[this.currentPlayerCount].score + this.hitThree;
      this.hitThree = 0
      this.status = "third"
    }
  }



  count(number: number) {
      this.thrownNumber = number
      if (this.status == "first") {
        this.hitOne = this.thrownNumber
        this.status = "second"
        this.calcScore(this.hitOne)
      } else if (this.status == "second") {
        this.hitTwo = this.thrownNumber
        this.calcScore(this.hitTwo)
        this.status = "third"
      } else if (this.status == "third") {
        this.hitThree = this.thrownNumber
        this.status = "next"
        this.calcScore(this.hitThree)
      }
  }

  nextPlayer() {
    if (this.status = "next") {
      this.hitOne = 0;
      this.hitTwo = 0;
      this.hitThree = 0;
      this.hitTotal = 0;
      this.status = "first"
    }
  }

  calcScore(hit: number) {
    if (this.gameData[this.currentPlayerCount].score > 0) {
      if (hit > this.gameData[this.currentPlayerCount].score) {
        this.thrownOver = true
        this.gameData[this.currentPlayerCount].score = this.gameData[this.currentPlayerCount].score + this.hitOne + this.hitTwo
        this.status = "next"
      } else {
        this.gameData[this.currentPlayerCount].score = this.gameData[this.currentPlayerCount].score - hit
      }
    }
  }

  addHighlight(event: MouseEvent) {
    const targetElement = event.target as HTMLElement;
    targetElement.classList.add('highlight');
  }

  removeHighlight(event: MouseEvent) {
    const targetElement = event.target as HTMLElement;
    targetElement.classList.remove('highlight');
  }

}
