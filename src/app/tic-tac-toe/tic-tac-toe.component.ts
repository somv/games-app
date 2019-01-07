import { Component, OnInit } from '@angular/core';
import * as _ from "lodash";

@Component({
  selector: 'app-tic-tac-toe',
  templateUrl: './tic-tac-toe.component.html',
  styleUrls: ['./tic-tac-toe.component.scss']
})
export class TicTacToeComponent implements OnInit {

  rows = [0, 1, 2]
  columns = [0, 1, 2]
  playerLetter = "x"
  computerLetter = "o"
  message = "Hope you will enjoy."
  resultMessage = "Game in progess."
  lock = false

	initialMatrix = [["0", "0", "0"], ["0", "0", "0"], ["0", "0", "0"]]
	matrix = _.cloneDeep(this.initialMatrix)

	matchFinished = false

	constructor() { }

	ngOnInit() {

	}

  playAgain() {
    this.matrix = _.cloneDeep(this.initialMatrix)
    this.matchFinished = false
    this.resultMessage = "Game in progress."
    this.message = "Hope you will enjoy."
    this.lock = false
  }

	onClickCell(row: number, column: number) {

		if(this.matchFinished == true || this.lock == true) {
      return
    }

    this.gameResult()

		if(this.matrix[row][column] == "0") {
			this.matrix[row][column] = "x"
      this.gameResult()
      this.lock = true
			setTimeout(() => {
        this.computerTurn()
        this.lock = false
        this.gameResult()
      }, 300)
		}

	}

  gameResult() {

    let computerWon = this.isWinner(this.matrix, this.computerLetter)
    let playerWon = this.isWinner(this.matrix, this.playerLetter)

    if(computerWon) {
      this.matchFinished = true
      this.message = "You should not loose hope, try again."
      this.resultMessage = "Computer ji won."
    }

    if(playerWon) {
      this.matchFinished = true
      this.message = "You are one true genious. try again."
      this.resultMessage = "You won."
    }

    if(computerWon == false && playerWon == false && this.isFinished()) {
      this.matchFinished = true
      this.message = "You came really hard this time, try again."
      this.resultMessage = "Macth drawn."
    }

  }

	computerTurn() {

		for (var i = 0; i < 3; i++) {
			for (var j = 0; j < 3; j++) {
				let copiedMatrix = _.cloneDeep(this.matrix)
				if(this.matrix[i][j] == "0") {
					this.makeMove(copiedMatrix, i, j, this.computerLetter)
					if(this.isWinner(copiedMatrix, this.computerLetter)) {
						this.matrix[i][j] = this.computerLetter
						return
					}
				}
			}
		}

		for (var i = 0; i < 3; i++) {
			for (var j = 0; j < 3; j++) {
				let copiedMatrix = _.cloneDeep(this.matrix)
				if(this.matrix[i][j] == "0") {
					this.makeMove(copiedMatrix, i, j, this.playerLetter)
					if(this.isWinner(copiedMatrix, this.playerLetter)) {
						this.matrix[i][j] = this.computerLetter
						return
					}
				}
			}
		}

		// choose from corners if they are free

		if(this.moveToCorners() == true) {
			return
		}

		// chosse center if it is free

		if(this.matrix[1][1] == "0") {
			this.makeMove(this.matrix, 1, 1, this.computerLetter)
			return
		}

		// choose from sides if they are free

		if(this.moveToSides() == true) {
			return
		}

	}

	moveToCorners(): boolean {
		let corners = [[0,0], [0,2], [2,2], [2,0]]
		for (var i = 0; i < corners.length; ++i) {
			if(this.matrix[corners[i][0]][corners[i][1]] == "0") {
				this.makeMove(this.matrix, corners[i][0], corners[i][1], this.computerLetter)
				return true
			}
		}
		return false
	}

	moveToSides(): boolean {
		let sides = [[0,1], [1,0], [1,2], [2,1]]
		for (var i = 0; i < sides.length; ++i) {
			if(this.matrix[sides[i][0]][sides[i][1]] == "0") {
				this.makeMove(this.matrix, sides[i][0], sides[i][1], this.computerLetter)
				return true
			}
		}
		return false
	}

	makeMove(matrix, row, column, letter) {
		matrix[row][column] = letter
	}

	isWinner(matrix, letter): boolean {

    let lines = [
      [0, 0, 1, 1, 2, 2],
      [2, 0, 1, 1, 0, 2],
      [0, 0, 0, 1, 0, 2],
      [1, 0, 1, 1, 1, 2],
      [2, 0, 2, 1, 2, 2],
      [0, 0, 1, 0, 2, 0],
      [0, 1, 1, 1, 2, 1],
      [0, 2, 1, 2, 2, 2]
    ]

    for (var i = 0; i < lines.length; ++i) {
      if(matrix[lines[i][0]][lines[i][1]] == letter && matrix[lines[i][2]][lines[i][3]] == letter && matrix[lines[i][4]][lines[i][5]] == letter) {
        matrix[lines[i][0]][lines[i][1]] = letter + "w"
        matrix[lines[i][2]][lines[i][3]] = letter + "w"
        matrix[lines[i][4]][lines[i][5]] = letter + "w"
        return true
      } 
    }

    return false

		// return (
		// 	(matrix[0][0] == letter && matrix[1][1] == letter && matrix[2][2] == letter) || 
		// 	(matrix[2][0] == letter && matrix[1][1] == letter && matrix[0][2] == letter) || 
		// 	(matrix[0][0] == letter && matrix[0][1] == letter && matrix[0][2] == letter) || 
		// 	(matrix[1][0] == letter && matrix[1][1] == letter && matrix[1][2] == letter) ||
		// 	(matrix[2][0] == letter && matrix[2][1] == letter && matrix[2][2] == letter) ||
		// 	(matrix[0][0] == letter && matrix[1][0] == letter && matrix[2][0] == letter) || 
		// 	(matrix[0][1] == letter && matrix[1][1] == letter && matrix[2][1] == letter) || 
		// 	(matrix[0][2] == letter && matrix[1][2] == letter && matrix[2][2] == letter)
		// )
	}

  isFinished() {
    for (var i = 0; i < this.matrix.length; ++i) {
      for (var j = 0; j < this.matrix[0].length; ++j) {
        if(this.matrix[i][j] == "0") {
          return false
        }
      }
    }
    return true
  }

}
