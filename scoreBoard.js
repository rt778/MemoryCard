function congrat(){
	var congrat = document.createTextNode("Congratulations " 
		+ playerName + "! " 
		+ "You've made it in " + numberOfMoves 
		+ " moves. Your time is " 
		+ document.getElementById('seconds').innerHTML +"."
		+ document.getElementById('tens').innerHTML + " seconds. "
		+ rating + '.');	
	document.getElementById('congratPlayer').appendChild(congrat);
};



var modal = document.getElementById('scoreBoardModal');

function openScoreBoard() {
   	modal.style.display = "block";
};

var span = document.getElementsByClassName("close")[0];
span.onclick = function() {
    modal.style.display = "none";
};

var span1 = document.getElementsByClassName("close")[1];
span1.onclick = function() {
    modal.style.display = "none";
};


//score constructor
function score(playerName, dateTimeLog, timeTaken, numberOfMoves, numberOfStars){
	
	this.playerName = playerName;
	this.dateTimeLog = dateTimeLog;
	this.timeTaken = timeTaken;
	this.numberOfMoves= numberOfMoves;
	this.numberOfStars = numberOfStars;
};


function getPlayerName(){
	var playerName = prompt("Please enter your name","your name");
	return playerName;	
};



