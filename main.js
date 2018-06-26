/**
 * Created by alexandermarginal on 18.06.2018.
 */
let p1 = 'p1',
	p2 = 'p2',
	ai = 'ai',
	p1Mark = '[data-player-mark="X"]',
	p2Mark = '[data-player-mark="O"]',
	nextStep = p1,
	size,
	winCellNumber,
	count = 0,
	wrapperArr = [],
	mode = 'human',
	endText = document.getElementById('endText'),
	app = document.getElementById('app'),
	end = document.getElementById('end'),
	ask = document.getElementById('ask'),
	player1 = document.getElementById(p1),
	player2 = document.getElementById(p2),
	emptyCells = '[data-player-mark="0"]',
	lastStep;

function checkMode(radio) {
	mode = radio.value;
}

function init(input) {
	size = document.getElementById(input).value;
	
	(size > 5) ? winCellNumber = 5 : winCellNumber = size;
	
	initWrapper(wrapperArr, size);
	
	ask.classList.add('start');
	
	if (nextStep == ai) AI.actionPlanning();
}

function initWrapper(wrapperArr, size) {
	for (let rows = 0; rows < size; rows++) {
		let tableRow = document.createElement('tr');
		
		app.appendChild(tableRow);
		
		let tableRows = app.getElementsByTagName('tr'),
			lastTableRow = tableRows[tableRows.length - 1];
		
		wrapperArr.push([]);
		
		for (let cols = 0; cols < size; cols++) {
			let tableCol = document.createElement('td');
			
			tableCol.id = "row_" + rows + "_col_" + cols;
			tableCol.dataset.row = rows;
			tableCol.dataset.col = cols;
			tableCol.dataset.playerMark = 0;
			
			tableCol.setAttribute('onclick', 'step(this);');
			
			lastTableRow.appendChild(tableCol);
			
			let colsForLastTableRow = lastTableRow.getElementsByTagName('td'),
				lastColForLastTableRow = colsForLastTableRow[colsForLastTableRow.length - 1];
			
			wrapperArr[rows].push(lastColForLastTableRow);
		}
	}
}

function step(cell) {
	switch (nextStep) {
		case p1:
			stepAction(cell, 'X');
			if (mode == ai) {
				
				nextStep = ai;
				checkPlayer();
				
				if (!app.classList.contains('end')) AI.actionPlanning();
				
				break;
			} else {
				nextStep = p2;
				checkPlayer();
				break;
			}
		case ai:
			stepAction(cell, 'O');
			nextStep = p1;
			checkPlayer();
			break;
		default:
			stepAction(cell, 'O');
			nextStep = p1;
			checkPlayer();
			break;
	}
}

function stepAction(cell, playerMark) {
	let mark = document.createElement('div');
	mark.classList.add('mark');
	
	mark.innerHTML = playerMark;
	
	cell.appendChild(mark);
	cell.dataset.playerMark = playerMark;
	
	cell.setAttribute('onclick', 'return false;');
	
	lastStep = cell;
	
	checkCell(cell, playerMark);
}

/* START CHECK LINE */
function checkCell(cell, dataMark) {
	let row = cell.dataset.row,
		col = cell.dataset.col;
	
	count += 1;
	checkTop(+row, +col, dataMark);
	checkBottom(+row, +col, dataMark);
	checkWin();
	
	count += 1;
	checkLeft(+row, +col, dataMark);
	checkRight(+row, +col, dataMark);
	checkWin();
	
	count += 1;
	checkTopLeft(+row, +col, dataMark);
	checkBottomRight(+row, +col, dataMark);
	checkWin();
	
	count += 1;
	checkBottomLeft(+row, +col, dataMark);
	checkTopRight(+row, +col, dataMark);
	checkWin();
	
	if (document.querySelectorAll(emptyCells).length == 0) {
		if (!app.classList.contains('end')) {
			changeClickAction('return false');
			
			app.classList.add('end');
			end.classList.add('active');
			
			endText.innerHTML = 'Ничья';
		}
	}
}

function checkTop(cellRow, cellCol, dataMark) {
	if (cellRow != 0) {
		cellRow -= 1;
		
		while (cellRow != -1 && getPlayerMark(cellRow, cellCol) == dataMark) {
			cellRow -= 1;
			count += 1;
		}
	}
}

function checkBottom(cellRow, cellCol, dataMark) {
	if (cellRow != size - 1) {
		cellRow += 1;
		
		while (cellRow != size && getPlayerMark(cellRow, cellCol) == dataMark) {
			cellRow += 1;
			count += 1;
		}
	}
}

function checkLeft(cellRow, cellCol, dataMark) {
	if (cellCol != 0) {
		cellCol -= 1;
		
		while (cellCol != -1 && getPlayerMark(cellRow, cellCol) == dataMark) {
			cellCol -= 1;
			count += 1;
		}
	}
}

function checkRight(cellRow, cellCol, dataMark) {
	if (cellCol != size - 1) {
		cellCol += 1;
		
		while (cellCol != size && getPlayerMark(cellRow, cellCol) == dataMark) {
			cellCol += 1;
			count += 1;
		}
	}
}

function checkTopLeft(cellRow, cellCol, dataMark) {
	if (cellRow != 0 && cellCol != 0) {
		cellRow -= 1;
		cellCol -= 1;
		
		while (cellRow != -1 && cellCol != -1 && getPlayerMark(cellRow, cellCol) == dataMark) {
			cellRow -= 1;
			cellCol -= 1;
			count += 1;
		}
	}
}

function checkBottomRight(cellRow, cellCol, dataMark) {
	if (cellRow != size - 1 && cellCol != size - 1) {
		cellRow += 1;
		cellCol += 1;
		
		while (cellRow != size && cellCol != size && getPlayerMark(cellRow, cellCol) == dataMark) {
			cellRow += 1;
			cellCol += 1;
			count += 1;
		}
	}
}

function checkBottomLeft(cellRow, cellCol, dataMark) {
	if (cellRow != size - 1 && cellCol != 0) {
		cellRow += 1;
		cellCol -= 1;
		
		while (cellRow != size && cellCol != -1 && getPlayerMark(cellRow, cellCol) == dataMark) {
			cellRow += 1;
			cellCol -= 1;
			count += 1;
		}
	}
}

function checkTopRight(cellRow, cellCol, dataMark) {
	if (cellRow != 0 && cellCol != size - 1) {
		cellRow -= 1;
		cellCol += 1;
		
		while (cellRow != -1 && cellCol != size && getPlayerMark(cellRow, cellCol) == dataMark) {
			cellRow -= 1;
			cellCol += 1;
			count += 1;
		}
	}
}

/* END CHECK LINE */

function checkWin() {
	if (count >= winCellNumber) {
		changeClickAction('return false');
		
		app.classList.add('end');
		end.classList.add('active');
		
		if (nextStep == p1) {
			endText.innerHTML = 'Победил игрок 1';
		} else if (nextStep == ai) {
			endText.innerHTML = 'Победил ИИ';
		} else {
			endText.innerHTML = 'Победил игрок 2';
		}
	}
	
	count = 0;
}

function restart() {
	app.classList.remove('end');
	app.innerHTML = '';
	end.classList.remove('active');
	endText.innerHTML = '';
	ask.classList.remove('start');
}

function checkPlayer() {
	switch (nextStep) {
		case p1:
			player1.classList.add('active');
			player2.classList.remove('active');
			break;
		default:
			player1.classList.remove('active');
			player2.classList.add('active');
			break;
	}
}

function changeClickAction(action) {
	for (let rows = 0; rows < wrapperArr.length; rows++) {
		for (let cols = 0; cols < wrapperArr[rows].length; cols++) {
			wrapperArr[rows][cols].setAttribute('onclick', action);
		}
	}
}

function getPlayerMark(row, col) {
	return document.getElementById('row_' + row + '_col_' + col).dataset.playerMark;
}

function rand(min, max) {
	return min + Math.floor(Math.random() * (max + 1 - min));
}


/* AI */
const AI = {
	count: 0,
	
	actionPlanning: function () {
		let stepVars = document.querySelectorAll(emptyCells);
		
		// First step
		if (stepVars.length == size * size || stepVars.length == (size * size)-1) {
			step(stepVars[rand(0, stepVars.length - 1)]);
		} else {
			/* START STEP FOR WIN */
			this.findWinStep(p2Mark, 'O');
			if (nextStep != ai) return false;
			/* END STEP FOR WIN */
			
			/* START STEP FOR NOT LOOSE */
			this.findWinStep(p1Mark, 'X');
			if (nextStep != ai) return false;
			/* END STEP FOR NOT LOOSE */
			
			//TODO доделать поиск лучшего хода, а пока что рандом
			/* START BEST MOVE */
			/*this.findBestMove(stepVars);
			if (nextStep != ai) return false;*/
			/* END BEST MOVE */
			step(stepVars[rand(0, stepVars.length - 1)]);
		}
	},
	
	
	getStepCell: function (row, col) {
		return document.getElementById("row_" + row + "_col_" + col);
	},
	
	findEmptyCellForStep: function (stepRow, stepCol, dataMark) {
		if (this.getStepCell(stepRow, stepCol) && getPlayerMark(stepRow, stepCol) == 0) {
			
			this.count += 1;
			this.findTop(stepRow, stepCol, dataMark);
			this.findBottom(stepRow, stepCol, dataMark);
			this.thisStepWin(stepRow, stepCol);
			
			this.count += 1;
			this.findLeft(stepRow, stepCol, dataMark);
			this.findRight(stepRow, stepCol, dataMark);
			this.thisStepWin(stepRow, stepCol);
			
			this.count += 1;
			this.findTopLeft(stepRow, stepCol, dataMark);
			this.findBottomRight(stepRow, stepCol, dataMark);
			this.thisStepWin(stepRow, stepCol);
			
			this.count += 1;
			this.findBottomLeft(stepRow, stepCol, dataMark);
			this.findTopRight(stepRow, stepCol, dataMark);
			this.thisStepWin(stepRow, stepCol);
		}
	},
	
	findWinStep: function (dataMark, pMark) {
		let iOccupiedCell = document.querySelectorAll(dataMark);
		
		for (let i = 0; i < iOccupiedCell.length; i++) {
			let thisCell = iOccupiedCell[i],
				row = +thisCell.dataset.row,
				col = +thisCell.dataset.col;
			
			this.findEmptyCellForStep(row - 1, col - 1, pMark);
			this.findEmptyCellForStep(row - 1, col, pMark);
			this.findEmptyCellForStep(row - 1, col + 1, pMark);
			this.findEmptyCellForStep(row + 1, col - 1, pMark);
			this.findEmptyCellForStep(row + 1, col, pMark);
			this.findEmptyCellForStep(row + 1, col + 1, pMark);
			this.findEmptyCellForStep(row, col - 1, pMark);
			this.findEmptyCellForStep(row, col + 1, pMark);
			
		}
	},
	
	thisStepWin: function (row, col) {
		if (this.count >= winCellNumber) {
			step(this.getStepCell(row, col));
		}
		
		this.count = 0;
	},
	
	findTop: function (cellRow, cellCol, dataMark) {
		if (cellRow != 0) {
			cellRow -= 1;
			
			while (cellRow != -1 && getPlayerMark(cellRow, cellCol) == dataMark) {
				cellRow -= 1;
				this.count += 1;
			}
		}
	},
	findBottom: function (cellRow, cellCol, dataMark) {
		if (cellRow != size - 1) {
			cellRow += 1;
			
			while (cellRow != size && getPlayerMark(cellRow, cellCol) == dataMark) {
				cellRow += 1;
				AI.count += 1;
			}
		}
	},
	findLeft: function (cellRow, cellCol, dataMark) {
		if (cellCol != 0) {
			cellCol -= 1;
			
			while (cellCol != -1 && getPlayerMark(cellRow, cellCol) == dataMark) {
				cellCol -= 1;
				this.count += 1;
			}
		}
	},
	findRight: function (cellRow, cellCol, dataMark) {
		if (cellCol != size - 1) {
			cellCol += 1;
			
			while (cellCol != size && getPlayerMark(cellRow, cellCol) == dataMark) {
				cellCol += 1;
				this.count += 1;
			}
		}
	},
	findTopLeft: function (cellRow, cellCol, dataMark) {
		if (cellRow != 0 && cellCol != 0) {
			cellRow -= 1;
			cellCol -= 1;
			
			while (cellRow != -1 && cellCol != -1 && getPlayerMark(cellRow, cellCol) == dataMark) {
				cellRow -= 1;
				cellCol -= 1;
				this.count += 1;
			}
		}
	},
	findBottomRight: function (cellRow, cellCol, dataMark) {
		if (cellRow != size - 1 && cellCol != size - 1) {
			cellRow += 1;
			cellCol += 1;
			
			while (cellRow != size && cellCol != size && getPlayerMark(cellRow, cellCol) == dataMark) {
				cellRow += 1;
				cellCol += 1;
				this.count += 1;
			}
		}
	},
	findBottomLeft: function (cellRow, cellCol, dataMark) {
		if (cellRow != size - 1 && cellCol != 0) {
			cellRow += 1;
			cellCol -= 1;
			
			while (cellRow != size && cellCol != -1 && getPlayerMark(cellRow, cellCol) == dataMark) {
				cellRow += 1;
				cellCol -= 1;
				this.count += 1;
			}
		}
	},
	findTopRight: function (cellRow, cellCol, dataMark) {
		if (cellRow != 0 && cellCol != size - 1) {
			cellRow -= 1;
			cellCol += 1;
			
			while (cellRow != -1 && cellCol != size && getPlayerMark(cellRow, cellCol) == dataMark) {
				cellRow -= 1;
				cellCol += 1;
				this.count += 1;
			}
		}
	},
	
	findBestMove: function (emptyCellsArr) {
		console.log(emptyCellsArr);
		let stepsArr=[];
		
		for (let stepVar=0; stepVar < emptyCellsArr.length; stepVar++) {
			/* START STEP FOR WIN */
			find(p2Mark, 'O');
			if (nextStep != ai) return false;
			/* END STEP FOR WIN */
			
			/* START STEP FOR NOT LOOSE */
			/*find(p1Mark, 'X');
			if (nextStep != ai) return false;*/
			/* END STEP FOR NOT LOOSE */
		}
		
		/* THIS STEP FUNCTIONS */
		function find(dataMark, pMark){
			let iOccupiedCell = document.querySelectorAll(dataMark);
			
			for (let i = 0; i < iOccupiedCell.length; i++) {
				let thisCell = iOccupiedCell[i],
					row = +thisCell.dataset.row,
					col = +thisCell.dataset.col;
				
				findEmptyCell(row - 1, col - 1, pMark);
				findEmptyCell(row - 1, col, pMark);
				findEmptyCell(row - 1, col + 1, pMark);
				findEmptyCell(row + 1, col - 1, pMark);
				findEmptyCell(row + 1, col, pMark);
				findEmptyCell(row + 1, col + 1, pMark);
				findEmptyCell(row, col - 1, pMark);
				findEmptyCell(row, col + 1, pMark);
				
			}
		}
		function findEmptyCell(stepRow, stepCol, dataMark) {
			if (AI.getStepCell(stepRow, stepCol) && getPlayerMark(stepRow, stepCol) == 0) {
				
				this.count += 1;
				AI.findTop(stepRow, stepCol, dataMark);
				AI.findBottom(stepRow, stepCol, dataMark);
				console.log(count);
				thisMoveIsBest(stepRow, stepCol);
				
				this.count += 1;
				AI.findLeft(stepRow, stepCol, dataMark);
				AI.findRight(stepRow, stepCol, dataMark);
				console.log(count);
				thisMoveIsBest(stepRow, stepCol);
				
				this.count += 1;
				AI.findTopLeft(stepRow, stepCol, dataMark);
				AI.findBottomRight(stepRow, stepCol, dataMark);
				console.log(count);
				thisMoveIsBest(stepRow, stepCol);
				
				this.count += 1;
				AI.findBottomLeft(stepRow, stepCol, dataMark);
				AI.findTopRight(stepRow, stepCol, dataMark);
				console.log(count);
				thisMoveIsBest(stepRow, stepCol);
			}
		}
		function thisMoveIsBest(row, col) {
			stepsArr.push({} = new MoveVar(row,col,count));
			
			this.count = 0;
			
			console.log(stepsArr);
		}
		function MoveVar(row,col,score) {
			this.cell = AI.getStepCell(row,col);
			this.score=score;
		}
	},
};