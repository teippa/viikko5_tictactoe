
let table;// = document.getElementById("tableClass").children[0];
let restartButton;// = document.getElementById("restart");

let won = 0;

const debug = str => console.log(str);
debug('Testi_1')

let currentPlayer = 1;
const symbols = ["X", "O"];

const createTable = () => {
  debug('Testi_2')

  table = document.getElementById("tableClass").children[0];
  restartButton = document.getElementById("restart");
  restartButton.addEventListener("click", restart);



  debug(table.children.length)

  for (let i = 0 ; i<table.children.length ; i++) {
    let row = table.children[i];
    for (let j = 0 ; j < row.children.length ; j++) {
      let cell = row.children[j];
      row.children[j].addEventListener("click", cellClick);
    }
  }
  
};

const clearTable = () => {
  for (let i = 0 ; i<table.children.length ; i++) {
    let row = table.children[i];
    for (let j = 0 ; j < row.children.length ; j++) {
      let cell = row.children[j];
      cell.innerText = '';
    }
  }
}

  

function restart() {
  currentPlayer = 1;
  won = 0;
  clearTable();

}
  /*
  table.classList.add("tableClass");

  //Generating 5x5 cells to table
  for (let i = 0; i < 5; i++) {
    let row = document.createElement("tr");
    table.appendChild(row);
    for (let j = 0; j < 5; j++) {
      let cell = document.createElement("td");
      row.appendChild(cell);
      cell.gridID = [j, i];
      cellSetup(cell);
    }
  }//*/
/*
// Adding click function and styling
const cellSetup = cell => {
  cell.addEventListener("click", cellClick);
  cell.classList.add("cellStyle");
};
*/
// Executed when a cell is clicked
function cellClick() {
  // Do something only if cell is not occupied and nobody has won
  if (!["X", "O"].includes(cellCheckState(this)) && !won) {
    this.innerText = currentTurn();



    //addToDatabase(this);

    won = testForWin(this);

    if (won) {
      victoryStuff(currentPlayer);
    } else {
      changeTurn();
    }
  }
}

function makeTurn(p, x, y) {
  let cell = getTableCell(x,y);
  cell.innerText = p;
}


// Returns current players symbol
const currentTurn = () => {
  return symbols[currentPlayer - 1];
};

// Inform player when game has ended
const victoryStuff = winningPlayer => {
  const hoorray = "Player " + winningPlayer + " won!";
  alert(hoorray);
};

// Returns text inside cell
const cellCheckState = cell => {
  return cell.innerText;
};

const changeTurn = () => {
  currentPlayer = 3 - currentPlayer; // 1=>2 & 2=>1
  document.getElementById("info").innerHTML =
    "Player " + currentPlayer + ":s turn";
};

// Returns a cell from table based on coordinates
const getTableCell = (x, y) => {
  return table.children[y].children[x];
};

// Testing for win conditions. returns 1 if player won
const testForWin = clickedCell => {
  const clicked_x = clickedCell.cellIndex;
  const clicked_y = clickedCell.parentNode.rowIndex;
  let win = 0;

  console.log([clicked_x, clicked_y]);

  // Relative coordinates to clicked cell
  let check_x;
  let check_y;

  // Directions relative to clicked cell (east, south, south-east, south-west)
  const searchDirections = [[1, 0], [0, 1], [1, 1], [-1, 1]];

  // Going through directions
  for (let dir = 0; dir < searchDirections.length; dir++) {
    let foundMatches = 1;
    let observedCell;
    // Travelling directions forward and backwards
    for (let i = 1; i >= -1; i = i - 2) {
      try {
        // Finding matching marks
        for (let distance = 1; distance < 5; distance++) {
          check_x = clicked_x + i * distance * searchDirections[dir][0];
          check_y = clicked_y + i * distance * searchDirections[dir][1];

          observedCell = getTableCell(check_x, check_y);

          if (observedCell.innerText === currentTurn()) {
            foundMatches++;
          } else {
            //stopping the loop when encountering a differing mark
            break;
          }
        }
      } catch {
        //console.log("Search out of bounds: " + [check_x, check_y])
      }
    }

    if (foundMatches >= 5) {
      win = 1;
      break;
    }
  }
  return win;
};

//createTable();
window.onload = createTable();


//makeTurn('X', 2,3);