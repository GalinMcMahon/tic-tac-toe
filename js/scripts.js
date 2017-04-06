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
function Board(clickedSquares, availableSquares) {
  this.clickedSquares = clickedSquares;
  this.availableSquares = availableSquares;
  this.unavailableSquares = [];
}
// initialize new board Object
var newBoard = new Board(0, [0,1,2,3,4,5,6,7,8]);
// constructor function for a Player Object
function Player(symbol, selected) {
  this.symbol = symbol;
  // selected holds the values of the squares this player clicked
  this.selected = selected;
}
// initialize new player(with their symbol, and empty array for their selections)
var playerX = new Player("Red", []);
var playerO = new Player("Blue", []);

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

      $("#winner").show();
      // all this should be refactored into UI logic, but we are using this while we test
      $("#winner").html("<div id='game-over'>"
                      + "Player "
                      + currentPlayer.symbol
                      + " wins the game!"
                      + "<br><br>"
                      + "<div class='reset-button' onClick='window.location.reload()'>Play Again</div>"
                      + "</div>"
                    );
    } // end if a player wins
  } // end loop through winningCombos array
} // end prototype

// create new board html, it needs 9 squares
var makeBoard = function() {
  for (var i = 0; i < 9; i++) {
    $("#board").append("<div class='square' data-value='" + i + "'></div>");
  }
  $("#board").append("<div class='reset-button' onClick='window.location.reload()'>New Game</div>");
}
// create function to pull random value from available array items
var randomize = function(array) {
	var random = array[Math.floor(Math.random()*array.length)];
	return random;
}


// ----------------------------------- UI LOGIC
// ----------------------------------- UI LOGIC
// ----------------------------------- UI LOGIC

$(document).ready(function() {

  // ------------------------- when user selects one-player option...
  // ------------------------- when user selects one-player option...
  // ------------------------- when user selects one-player option...
  $("#one-player").click(function() {
    $(".player-select").hide();
    makeBoard();
    $("#board").fadeIn();

    $(".square").one('click', function() {
      // check number of squares clicked
      newBoard.clickedSquares += 1;
      // if (newBoard.clickedSquares === 9 && (playerO.isVictorious() === false && playerX.isVictorious() === false)) {
      //   $("#tie").show();
      // }

      // change players each successful click
      if (currentPlayer === playerX) {
        $(this).addClass("red");
        // assign the VALUE of THIS particular square to a variable
        var squareValue = parseInt($(this).attr('data-value'));
        // push this value to the players selected array
        currentPlayer.selected.push(squareValue);
        // find the index of that item within the availableSquares array
        var indexHuman = newBoard.availableSquares.indexOf(squareValue);
        // "pluck" selected value from available array
        newBoard.availableSquares.splice(indexHuman, 1);
        currentPlayer = playerO;
        if (currentPlayer === playerO) {

          // computer behavior lives here:
          // computer behavior lives here:
          // computer behavior lives here:

          // select a random item from available squares using our randomize function
          // store the returned item in the var randomSquare
          var randomSquare = randomize(newBoard.availableSquares);
          currentPlayer.selected.push(randomSquare);

          // find the index of that item within the availableSquares array
          var indexComp = newBoard.availableSquares.indexOf(randomSquare);
          // remove the item with the above index value form the available squares array (this index value should directly correspond with the randomly selected square)
          newBoard.availableSquares.splice(indexComp, 1);
          // automate a "virtual click" on the computer selected square
          $(".square[data-value='" + randomSquare + "']").click();
          console.log("Computer selected: " + randomSquare);
          console.log(newBoard);
          currentPlayer = playerX;
        }
      } else {
        $(this).addClass("blue").fadeIn();
      }
      // call prototype
      currentPlayer.isVictorious();
    }); // end square click function
  }); // end one-player click function

  // --------------------------- when user selects two player option...
  // --------------------------- when user selects two player option...
  // --------------------------- when user selects two player option...
  $("#two-players").click(function() {
    $(".player-select").hide();
    makeBoard();
    $("#board").fadeIn();
    // when the user clicks a square one time (unclickable after bc of .one() function)...
    $(".square").one('click', function() {
      // check number of squares clicked
      newBoard.clickedSquares += 1;
      // if (newBoard.clickedSquares === 9 && currentPlayer.isVictorious() === false) {
      //   $("#tie").show();
      // }
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
      // "pluck" selected value from available array
      newBoard.availableSquares.splice(squareValue, 1);
      console.log(newBoard);
      // call prototype
      currentPlayer.isVictorious();
    }); // end square click function
  }); // end two-players click function
}); // end document ready function


















// end
