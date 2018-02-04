// whole thing goes inside begin
function begin(){
	const inquirer = require('inquirer');
	const Word = require('./Word.js');
	const Game = require('./wordList.js');

	var hangman = {
		word_List: Game.nextWord.wordList,
		remainingGuesses: 10,
		lettersAlreadyGuessed: [],
		display: 0, // counter
		thisWord: null,


		startGame: function() {
	    	var here = this;
	    	if(this.lettersAlreadyGuessed.length > 0){
	      		this.lettersAlreadyGuessed = [];
	    	}

			inquirer.prompt([{
	      		name: "play",
	      		type: "confirm",
	      		message: "Start playing?"
	    	}]).then(function(answer) {
	      		if(answer.play){
	        	here.newGame();
	      		} else{
	        	console.log("N");
	      		}
	    	})},

			newGame: function() {
	    	if(this.remainingGuesses === 10) {
	      		console.log("Theme is movies - the most popular of 2018");

				// generate random numbers
				  var randNum = Math.floor(Math.random()*this.word_List.length);
	      		this.thisWord = new Word(this.word_List[randNum]);
	      		this.thisWord.pushToLetterArray();
	      		console.log(this.thisWord.wordDisplay());
	      		this.promptUser();

			} else{
	      		this.resetGuesses();
	      		this.newGame();
	    	}
	  	},
	  	resetGuesses: function() {
	    	this.remainingGuesses = 10;
	  	},
	  	promptUser: function(){
	    	var here = this;
	    	inquirer.prompt([{
	      		name: "pickletter",
	      		type: "input",
	      		message: "Pick a letter: "
	    	}]).then(function(letterguessed) {
				// make it all upper case so I can quit fussing with it
	      		var letterReturned = (letterguessed.pickletter).toUpperCase();
	      		var guessedAlready = false;
	        	for(var i = 0; i<here.lettersAlreadyGuessed.length; i++){
	          		if(letterReturned === here.lettersAlreadyGuessed[i]){
	            		guessedAlready = true;
	          		}
	        	}

	        	if(guessedAlready === false){
	          		here.lettersAlreadyGuessed.push(letterReturned);
	          		var found = here.thisWord.checkLetter(letterReturned);
	          		if(found === 0){
	            		here.remainingGuesses--;
	            		here.display++;
	            		console.log("Try again!");
	            		console.log('\n');
	            		console.log(here.thisWord.wordDisplay());
	            		console.log("Guesses remaining: " + here.remainingGuesses);
	            		console.log("Letters guessed so far: " + here.lettersAlreadyGuessed);
	          		} else{
	            		console.log(letterReturned + " was a good guess!");
	          			console.log('\n');

						  if(here.thisWord.checkWordBeGuessed() === true){
	                		console.log(here.thisWord.wordDisplay());
	 			    		console.log("You won \n");
	              		} else{
	                		console.log(here.thisWord.wordDisplay());
	                		console.log("Guesses remaining: " + here.remainingGuesses);
	                		console.log("Letters guessed so far: " + here.lettersAlreadyGuessed);
	              		}
	          		}
	          		if(here.remainingGuesses > 0 && here.thisWord.wordGuessed === false) {
	            		here.promptUser();

	          		}else if(here.remainingGuesses === 0){
	          			console.log("Game over");
	            		console.log(here.thisWord.word);
	          		}
	        	} else{
	            	console.log("You already guessed that");
	            	here.promptUser();
	          	}
	    	});  
	  	} 
	} 

	hangman.startGame();

}; 

// don't forget to call the function
begin();
