// ----------------------------------- BUSINESS LOGIC
// ----------------------------------- BUSINESS LOGIC
// ----------------------------------- BUSINESS LOGIC

var winningCombos = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [6,4,2],
  [0,4,8],
];

// constructor function for a Board Object
function Board(clickedSquares) {
  this.clickedSquares = clickedSquares;
}
// initialize new board Object
var newBoard = new Board(0);
// constructor function for a Player Object
function Player(symbol, selected) {
  this.symbol = symbol;
  // selected holds the values of the squares this player clicked
  this.selected = selected;
}
// initialize new player(with their symbol, and empty array for their selections)
var playerX = new Player("X", []);
var playerO = new Player("O", []);

var currentPlayer = playerX;

// create prototype to check if player's selections contain any winning combo
Player.prototype.isVictorious = function() {
  // Create empty wins array to store number of successful selections
  var wins = [];
  // loop through each combo in winning combos array
  for (var i = 0; i < winningCombos.length; i++) {
    var wins = [];
    winningCombos[i].forEach(function(numberInCombo){
      if ($.inArray(numberInCombo, currentPlayer.selected) != -1) {
        wins.push(2);
      } else {
        wins.push(1);
      }
    });
    if (wins[0] * wins[1] * wins[2] === 8) {
      alert("Winner");
    } console.log("Not Winner");

  }
}

// create new board html, it needs 9 squares
var makeBoard = function() {
  for (var i = 0; i < 9; i++) {
    $("#board").append("<div class='square' data-value='" + i + "'></div>");
  }
  $("#board").append("<div id='reset-button' onClick='window.location.reload()'>New Game</div>");
}

// create a function to reset the game
var reset = function() {
  playerX.selected = [];
  playerO.selected = [];
  newBoard.clickedSquares = 0;
  $("#board").html("");
  makeBoard();
}


// ----------------------------------- UI LOGIC
// ----------------------------------- UI LOGIC
// ----------------------------------- UI LOGIC

$(document).ready(function() {

  // when user selects one-player option...
  $("#one-player").click(function() {
    $(".player-select").hide();
    makeBoard();
    $("#board").fadeIn();
    // design random number AI stuff here
  }); // end one-player click function

  // when user selects two player option...
  $("#two-players").click(function() {
    $(".player-select").hide();
    makeBoard();
    $("#board").fadeIn();
    // when the user clicks a square one time (unclickable after bc of .one)...
    $(".square").one('click', function() {
      // check number of squares clicked
      newBoard.clickedSquares += 1;
      if (newBoard.clickedSquares === 9) {
        // $("#board").hide();
        // $("#cat").show();
      }
      // change players each successful click
      if (currentPlayer === playerX) {
        $(this).addClass("blue");
        currentPlayer = playerO;
      } else {
        $(this).addClass("red");
        currentPlayer = playerX;
      }
      // assign the VALUE of THIS particular square to a variable
      var squareValue = parseInt($(this).attr('data-value'));
      // push this value to the players selected array
      currentPlayer.selected.push(squareValue);
      console.log(currentPlayer);
      // call prototype
      currentPlayer.isVictorious();
    }); // end square click function
  }); // end two-players click function
  //reset new game
  $("#reset-button").click(function() {
    reset();
    alert();
  });
}); // end document ready function


















// end
