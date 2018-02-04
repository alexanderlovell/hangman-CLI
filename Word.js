var Letter = require("./Letter");

var Word = function(words) {
	var here = this;
	this.word = words;
	this.letterArray = [];
	this.wordGuessed = false;

	this.pushToArray = function() {
		for (var i = 0; i < this.word.length; i++) {
			var newLetter = new Letter(this.word[i]);
			this.letterArray.push(newLetter);
		}
	}
	this.checkWord = function() {
		if(this.letterArray.every(function(letterFunction) {
			return letterFunction.guessed === true;
		})) {
			this.wordGuessed = true;
			return true;
		}
	}
	this.checkLetter = function(guessedLetter) {
		var whatToReturn = 0;
		this.letterArray.forEach(function(letterFunction){
	  		if(letterFunction.letter === guessedLetter){
	    		letterFunction.guessed = true;
	    		whatToReturn++;
	  		}
		})

		return whatToReturn;
	}

	this.wordDisplay = function() {
		var display = '';
		here.letterArray.forEach(function(letterFunction){
			var currentLetter = letterFunction.letterDisplay();
			display+= currentLetter;
		});
		return display;
	}
}

// export Word
module.exports = Word;