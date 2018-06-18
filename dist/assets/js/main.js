/**
 * Created by alexandermarginal on 18.06.2018.
 */
var p1 = 'p1',
	p2 = 'p2',
	nextStep = p1,
	size,
	winCellNumber,
	count = 0,
	wrapperArr = [];

function init(input) {
	let app = document.getElementById('app');
	
	size=document.getElementById(input).value;
	
	(size > 5) ? winCellNumber = 5 : winCellNumber = size;
	
	initWrapper(wrapperArr, size);
	
	document.getElementById('ask').classList.add('start');
}

function initWrapper(wrapperArr, size) {
	for(let rows=0; rows<size;rows++){
		let tableRow = document.createElement('tr');
		
		app.appendChild(tableRow);
		
		let tableRows = app.getElementsByTagName('tr'),
			lastTableRow = tableRows[tableRows.length-1];
		
		wrapperArr.push([]);
		
		for(let cols=0; cols<size;cols++){
			let tableCol = document.createElement('td');
			
			tableCol.id="row_"+rows+"_col_"+cols;
			tableCol.dataset.row = rows;
			tableCol.dataset.col = cols;
			tableCol.dataset.playerMark = 0;
			
			tableCol.setAttribute('onclick', 'step(this);');
			
			lastTableRow.appendChild(tableCol);
			
			let colsForLastTableRow = lastTableRow.getElementsByTagName('td'),
				lastColForLastTableRow = colsForLastTableRow[colsForLastTableRow.length-1];
			
			wrapperArr[rows].push(lastColForLastTableRow);
		}
	}
}

function step(cell) {
	switch (nextStep){
		case p1:
			stepAction(cell, 'X', 1);
			nextStep = p2;
			checkPlayer();
			break;
		default:
			stepAction(cell, 'O', 2);
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
	
	checkCell(cell, playerMark);
}

function checkCell(cell, dataMark) {
	let row = cell.dataset.row,
		col = cell.dataset.col;
	
	count+=1;
	checkTop(+row, +col, dataMark);
	checkBottom(+row, +col, dataMark);
	checkWin();
	
	count+=1;
	checkLeft(+row, +col, dataMark);
	checkRight(+row, +col, dataMark);
	checkWin();
	
	count+=1;
	checkTopLeft(+row, +col, dataMark);
	checkBottomRight(+row, +col, dataMark);
	checkWin();
	
	count+=1;
	checkBottomLeft(+row, +col, dataMark);
	checkTopRight(+row, +col, dataMark);
	checkWin();
}

function checkTop(cellRow, cellCol, dataMark) {
	if(cellRow != 0){
		cellRow -= 1;
		
		while(cellRow != -1 && document.getElementById('row_'+cellRow+'_col_'+cellCol).dataset.playerMark == dataMark){
			cellRow -= 1;
			count+=1;
		}
	}
}
function checkBottom(cellRow, cellCol, dataMark) {
	if(cellRow != size-1){
		cellRow += 1;
		
		while(cellRow != size && document.getElementById('row_'+cellRow+'_col_'+cellCol).dataset.playerMark == dataMark){
			cellRow += 1;
			count+=1;
		}
	}
}
function checkLeft(cellRow, cellCol, dataMark) {
	if(cellCol != 0){
		cellCol -= 1;
		
		while(cellCol != -1 && document.getElementById('row_'+cellRow+'_col_'+cellCol).dataset.playerMark == dataMark){
			cellCol -= 1;
			count+=1;
		}
	}
}
function checkRight(cellRow, cellCol, dataMark) {
	if(cellCol != size-1){
		cellCol += 1;
		
		while(cellCol != size && document.getElementById('row_'+cellRow+'_col_'+cellCol).dataset.playerMark == dataMark){
			cellCol += 1;
			count+=1;
		}
	}
}
function checkTopLeft(cellRow, cellCol, dataMark) {
	if(cellRow != 0 && cellCol != 0){
		cellRow -= 1;
		cellCol -= 1;
		
		while(cellRow != -1 && cellCol != -1 && document.getElementById('row_'+cellRow+'_col_'+cellCol).dataset.playerMark == dataMark){
			cellRow -= 1;
			cellCol -= 1;
			count+=1;
		}
	}
}
function checkBottomRight(cellRow, cellCol, dataMark) {
	if(cellRow != size-1 && cellCol != size-1){
		cellRow += 1;
		cellCol += 1;
		
		while(cellRow != size && cellCol != size && document.getElementById('row_'+cellRow+'_col_'+cellCol).dataset.playerMark == dataMark){
			cellRow += 1;
			cellCol += 1;
			count+=1;
		}
	}
}
function checkBottomLeft(cellRow, cellCol, dataMark) {
	if(cellRow != size-1 && cellCol != 0){
		cellRow += 1;
		cellCol -= 1;
		
		while(cellRow != size && cellCol != -1 && document.getElementById('row_'+cellRow+'_col_'+cellCol).dataset.playerMark == dataMark){
			cellRow += 1;
			cellCol -= 1;
			count+=1;
		}
	}
}
function checkTopRight(cellRow, cellCol, dataMark) {
	if(cellRow != 0 && cellCol != size-1){
		cellRow -= 1;
		cellCol += 1;
		
		while(cellRow != -1 && cellCol != size && document.getElementById('row_'+cellRow+'_col_'+cellCol).dataset.playerMark == dataMark){
			cellRow -= 1;
			cellCol += 1;
			count+=1;
		}
	}
}

function checkWin() {
	if(count >= winCellNumber){
		
		for(let rows=0; rows<wrapperArr.length-1;rows++){
			for(let cols=0; cols<wrapperArr[rows].length-1;cols++){
				wrapperArr[rows][cols].setAttribute('onclick', 'return false');
			}
		}
		
		document.getElementById('app').classList.add('end');
		document.getElementById('end').classList.add('active');
		
		if(nextStep == p1){
			document.getElementById('emdText').innerHTML = 'Победил игрок 1';
		} else {
			document.getElementById('emdText').innerHTML = 'Победил игрок 2';
		}
		
	}
	
	count=0;
}

function restart() {
	let app = document.getElementById('app');
	app.classList.remove('end');
	app.innerHTML='';
	document.getElementById('end').classList.remove('active');
	document.getElementById('emdText').innerHTML = '';
	document.getElementById('ask').classList.remove('start');
}

function checkPlayer() {
	switch (nextStep){
		case p1:
			document.getElementById('p1').classList.add('active');
			document.getElementById('p2').classList.remove('active');
			break;
		default:
			document.getElementById('p1').classList.remove('active');
			document.getElementById('p2').classList.add('active');
			break;
	}
}