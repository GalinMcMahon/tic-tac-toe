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
// ----------------------------------- UI LOGIC
// ----------------------------------- UI LOGIC
// ----------------------------------- UI LOGIC

$(document).ready(function() {

// $("#singlePlayer").click(function() {
//   numPlayers=(data-value);
//
//   if (data-value === 10) {
//     var arrayRemain=[0, 1, 2, 3, 4, 5, 6, 7, 8];
//     var singlePlayer = function(singlePlayer) {
//       if (newBoard.clickedSquares %2 === 0) {
//       var random=select Math.random[arrayRemain]
//       click(".square")=('data-value'===random)
//     }
//       arrayRemain.splice(random, 1);
//
//     });
//   });
  // when the user clicks a square one time (unclickable after bc of .one)...
  $(".square").one('click', function() {

    // check number of squares clicked
    newBoard.clickedSquares += 1;
    if (newBoard.clickedSquares === 9) {
      $("#cat").show();
      $("#board").hide();
    }

    if (currentPlayer === playerX) {
      $(this).css("background-color", "blue");
      currentPlayer = playerO;
    } else {
      $(this).css("background-color", "red");
      currentPlayer = playerX;
    }
    // assign the VALUE of THIS particular square to a variable
    var squareValue = parseInt($(this).attr('data-value'));
    // push this value to the players selected array
    currentPlayer.selected.push(squareValue);
    console.log(currentPlayer);
    // call prototype
    currentPlayer.isVictorious();
  });
});


















// end
