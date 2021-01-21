'use strict'

// swifer day 2 update 20:20

const EMPTY = ' ';
const MINE = '🎇'
const FLAG = '🚩';

var gBoard;
var gLevel = {
    size: 4,
    mines: 2 
};

var gGame = {
    isOn: false, 
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}

var gInterval;


function init() {
    gBoard = buildBoard();
    renderBoard(gBoard);
    restartGame()
}



function buildBoard() {
    var board = []
    for (var i = 0; i <gLevel.size; i++) {
        board.push([]);
        for (var j = 0; j <gLevel.size ; j++) {
            board[i][j] = {
                minesAroundCount: 0,
                isShown: false,
                isMine:false,
                isMarked: false,
            }
        }
    }
       // NOT FORGET NEG LOOP
    randomMine(board)
    setMinesNegsCount(board)
    // NEG LOOP TODO
    console.table(board);
    return board
}

function randomMine (board) {
    var minesNum = gLevel.mines;
    while (minesNum> 0) {
        var i = getRandomInt(0, board.length )
        var j = getRandomInt(0, board.length)
        var rndCell = board[i][j]
        if (!rndCell.isMine) {
            rndCell.isMine = true;
            minesNum--;
        }
    }
}


function renderBoard(board) {
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>\n';
        for (var j = 0; j < board[0].length; j++) {
            var cell = EMPTY;
            strHTML += `<td class="cell-${i}-${j}" onclick="cellClick(${i},${j})" )">
            ${cell}</td>`
        }
        strHTML += '</tr>\n';
    }
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHTML;
}


// TO THE UTILS FUNC
function renderCell(location, value) {
    var cellSelector = '.' + getClassName(location)
    var elCell = document.querySelector(cellSelector);
    elCell.innerHTML = value;
}

function getClassName(location) {
    var cellClass = 'cell-' + location.i + '-' + location.j;
    return cellClass;
}


// TODO:adding the second part--> NEG LOOP
function setMinesNegsCount(board ,cellI, cellJ) {
    var negsCounter = 0;
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= board.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if ((i === cellI && j === cellJ) || j < 0 || j >= mat[i].length) continue;
            if (board[i][j].isMine)negsCounter ++
        }
    }
    console.log (negsCounter)
    return negsCounter;
    

}


function expandShown(location) {
    for (var i = location.i - 1; i <= location.i + 1; i++) {
      if (i < 0 || i > gBoard.length - 1) continue;
      for (var j = location.j - 1; j <= location.j + 1; j++) {
        if (j < 0 || j > gBoard[0].length - 1) continue;
        var currCell = gBoard[i][j];
        currCell.isShown = true;
        var value = currCell.minesAroundCount;
        var loctionCord = {
          i: i,
          j: j,
        };
        renderCell(loctionCord, value); 
      }
    }
  }
  


  function choseLevel(elButton) {
    var level = elButton.innerHTML;
    if (level === 'EASY LEVEL') {
      gLevel.size = 4;
      gLevel.meins = 2;
     
    }
    if (level === 'MEDIUM') {
      gLevel.size = 8;
      gLevel.meins = 6;
     
    }
    if (level === 'HARD') {
      gLevel.size = 12;
      gLevel.meins = 10;
    
    }
  initGame()
  }




function cellClick( i, j) {
    var clikCel = gBoard[i][j];
    var sec = 0;
    if (!gGame.isOn) {
        gGame.isOn = true;
       gInterval = setInterval(function () {
            var time = new Date(sec * 1000).toString().split(':');
            var currTime = time[1] + ':' + time[2].split(' ')[0];
            document.querySelector('.timer').innerHTML = currTime;
            sec++;
        }, 1000);
    }
    if (gBoard[i][j].isMine) {
        clearInterval(gInterval);
        var elfaield = document.querySelector('.button4');
        elfaield.style.display = 'block';
    
    } else  {
        expandShown(location);
    }

    var cellcontien = clikCel.isMine ? MINE : clikCel.minesAroundCount;
    renderCell({ i: i, j: j }, cellcontien);
    gBoard[i][j].isShown = true;

   
}



function restartGame() {
    var elRestart = document.querySelector('.button4');
    elRestart.style.display = 'none';
    var elBoard = document.querySelector('.table')
    elBoard.style.display = 'block';
    document.querySelector('.timer').innerHTML = '00:00';
}