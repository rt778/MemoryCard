//Creating the class card
function card(IdOfTheCard, backOfTheCard, frontOfTheCard, valueOfTheCard){

			this.IdOfTheCard = IdOfTheCard;
			this.backOfTheCard = backOfTheCard;
			this.frontOfTheCard = frontOfTheCard;
			this.valueOfTheCard = valueOfTheCard;

			this.createTheCard = function(){
				//The cards are generated dynamically on the board, each card consists of two sides
				//represented by two divs one on top the other. The front of the card will be either
				//visible or hidden to simulate the effect of flipping the card.

				//create the back
				var theBoard = document.getElementById("theBoard");
				var divBackOfTheCard = document.createElement("div");
				divBackOfTheCard.className = "backOfTheCard";
				divBackOfTheCard.setAttribute("id",this.IdOfTheCard);
				theBoard.appendChild(divBackOfTheCard);
				document.getElementById(this.IdOfTheCard).addEventListener("click", this.flipThecard);
				
				//create the front
				var divBackOfTheCard = document.getElementById(this.IdOfTheCard);
				var divFrontOfTheCard = document.createElement("div");
				var frontOfTheCard = document.createTextNode(this.frontOfTheCard);
				divFrontOfTheCard.appendChild(frontOfTheCard);
				divFrontOfTheCard.className = "frontOfTheCard";
				divFrontOfTheCard.setAttribute("id",this.IdOfTheCard+"_front");
				divBackOfTheCard.appendChild(divFrontOfTheCard);	
				
			};
	
			this.flipThecard = function(){
				document.getElementById(IdOfTheCard+"_front").setAttribute("style", "visibility: visible");
			};

			this.flipThecardBack = function(){	
				document.getElementById(IdOfTheCard+"_front").setAttribute("style", "visibility: hidden");
			};
			

		}


// Creating the instances of cards.
var card0 = new card(0,"","\u26BD",1);
var card1 = new card(1,"","\u26BD",1);
var card2 = new card(2,"","\u270C",1);
var card3 = new card(3,"","\u270C",1);
var card4 = new card(4,"","\u26C5",1);
var card5 = new card(5,"","\u26C5",1);
var card6 = new card(6,"","\u26F5",1);
var card7 = new card(7,"","\u26F5",1);
var card8 = new card(8,"","\u26BE",1);
var card9 = new card(9,"","\u26BE",1);
var card10 = new card(10,"","\u26FD",1);
var card11 = new card(11,"","\u26FD",1);
var card12 = new card(12,"","\u26A1",1);
var card13 = new card(13,"","\u26A1",1);
var card14 = new card(14,"","\u26C4",1);
var card15 = new card(15,"","\u26C4",1);


//putting the cards in an array.
var deckOfCards = [card0, card1, card2, card3, card4, card5, card6, card7, card8, card9, card10, card11, card12, card13, card14, card15];


//This function is used to shuffle the deck of cards.
function shuffle(array){
	var i = 0
    , j = 0
    , temp = null

  for (i = array.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1))
    temp = array[i]
    array[i] = array[j]
    array[j] = temp
  };
	return array;
};

deckOfCards = shuffle(deckOfCards);// The deck is now shuffled randomly.

//The Deal the Cards Button
document.getElementById("dealBtn").addEventListener("click", dealCards);
function dealCards(){
	if(document.getElementById('theBoard').hasChildNodes()==false){
		for (var i = 0; i < deckOfCards.length; i++){
			deckOfCards[i].createTheCard();
		};
	};
};


//The New Game button
document.getElementsByClassName("newGameBtn")[0].addEventListener("click",newGame);
document.getElementsByClassName("newGameBtn")[1].addEventListener("click",newGame);
function newGame(){
	location.reload(); //equivalent to refreshing the browser
};


//Initialize all the variables
var deckOfTwoCards = new Array(); // used to count the cards flipped and to compare them, will contain max 2 elements.
var cardsFlipped = 0;
var numberOfMoves = 0;
var numberOfClicks =0; // This is the number of times a player clicks on a card. 2 numberOfClicks = 1 numberOfMoves
var numberOfStars = 3;
var rating = "Your rating is 3 stars.";
var playerName = "";
var timeTaken = 0;
var dateTimeLog = new Date().toISOString().slice(0,10);

//This takes care of the stars.
function setRating(){
	var stars = document.getElementById('stars');
	if (numberOfMoves > 15 && numberOfMoves <=20){
		stars.innerHTML='Your Rating: &bigstar; &bigstar; <span style="color:grey">&bigstar;</span>';
		rating = "Your rating is 2 stars.";// these strings are used in the modal.
		numberOfStars = 2;
	} ;
	if (numberOfMoves > 20){
		stars.innerHTML='Your Rating: &bigstar; <span style="color:grey">&bigstar;</span> <span style="color:grey">&bigstar;</span>';
		rating = "Your rating is 1 star."
		numberOfStars = 1;
	} ;
};


function endGame(){
	clearInterval(Interval);//stop the timer
	playerName = getPlayerName();//get the player's name
	congrat();//congrat the player
	timeTaken = seconds + tens/100;
	dateTimeLog = new Date().toISOString().slice(0,10);
	var currentScore = new score(playerName,dateTimeLog,timeTaken,numberOfMoves,numberOfStars);//instantiate the score object
	console.log("name:" + currentScore.playerName);
	console.log("date:" + currentScore.dateTimeLog);
	console.log("Time Taken:" + currentScore.timeTaken);
	console.log("moves:" + currentScore.numberOfMoves);
	console.log("number of stars:" + currentScore.numberOfStars);
	openScoreBoard();
};



//This is the main algo of the game.
document.getElementById("theBoard").addEventListener("click", function(e) {
//adding an eventListener to the board (using event delegation because it does not work when I add an event listener directly on a dynamically generated DOM).
	if(e.target.className == "backOfTheCard"){
		console.log(e.target.id); // accessing the cardId (for audit)
		console.log(e.target.childNodes[0].innerHTML); //access the letter on the front of the card. (for audit)
		clearInterval(Interval);//initiate Timer
		Interval = setInterval(startTimer, 10);	//start the Timer
		//numberOfMoves = numberOfMoves + 1;// counts the number of moves.
		numberOfClicks = numberOfClicks + 1;// counts the number of clicks.
		if (numberOfClicks%2 == 0){
			numberOfMoves = numberOfMoves +1; //This is to take into account that 2 clicks = 1 move.
		};
		setRating();//check the number of moves to set the rating.
		document.getElementById("moves").innerHTML = 'Number of moves: ' + numberOfMoves; //write the number of moves on the HTML	
			if (deckOfTwoCards.length == 0){
				var cardx = new card(e.target.id,"",e.target.childNodes[0].innerHTML,1);
				deckOfTwoCards.push(cardx); //pushing the card into an array
				console.log(deckOfTwoCards);
				console.log(deckOfTwoCards[0].frontOfTheCard);
			}else if (deckOfTwoCards.length == 1){
				var cardy = new card(e.target.id,"",e.target.childNodes[0].innerHTML,1);
				deckOfTwoCards.push(cardy); //pushing the card into an array
				console.log(deckOfTwoCards);
				console.log(deckOfTwoCards[1].frontOfTheCard);
				if(deckOfTwoCards[0].frontOfTheCard == deckOfTwoCards[1].frontOfTheCard){
					cardsFlipped += 2;
					deckOfTwoCards=[];
					if (cardsFlipped == deckOfCards.length){//when we've reached the end of the game
						setTimeout(endGame,400);
					};
				}else{
					setTimeout(deckOfTwoCards[0].flipThecardBack,600);
					setTimeout(deckOfTwoCards[1].flipThecardBack,600);
					deckOfTwoCards=[];
					};
				
			};

	};
});		
