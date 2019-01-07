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

  	initialMatrix = [["0", "0", "0"], ["0", "0", "0"], ["0", "0", "0"]]
  	matrix = [["0", "0", "0"], ["0", "0", "0"], ["0", "0", "0"]]

  	matchFinished = false

  	constructor() { }

  	ngOnInit() {

  	}

  	onClickCell(row: number, column: number) {

  		if(this.matchFinished == true) return;

  		console.log("row "+ row+": column "+column)
  		if(this.matrix[row][column] == "0") {
  			this.matrix[row][column] = "x"
  			this.computerTurn()
  		}

  		if(this.isWinner(this.matrix, this.computerLetter)) {
  			this.matchFinished = true
  		}

  		if(this.isWinner(this.matrix, this.playerLetter)) {
  			this.matchFinished = true
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

  		// choose side

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
  		return (
  			(matrix[0][0] == letter && matrix[1][1] == letter && matrix[2][2] == letter) || 
  			(matrix[2][0] == letter && matrix[1][1] == letter && matrix[0][2] == letter) || 
  			(matrix[0][0] == letter && matrix[0][1] == letter && matrix[0][2] == letter) || 
  			(matrix[1][0] == letter && matrix[1][1] == letter && matrix[1][2] == letter) ||
  			(matrix[2][0] == letter && matrix[2][1] == letter && matrix[2][2] == letter) ||
  			(matrix[0][0] == letter && matrix[1][0] == letter && matrix[2][0] == letter) || 
  			(matrix[0][1] == letter && matrix[1][1] == letter && matrix[2][1] == letter) || 
  			(matrix[0][2] == letter && matrix[1][2] == letter && matrix[2][2] == letter)
  		)

  	}

}
