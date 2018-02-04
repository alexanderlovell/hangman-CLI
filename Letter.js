// CONSTRUCTOR
// where did i screw up the syntax?? grr
var Letter = function(letterguessed) {
	this.letter = letterguessed;
	this.guessed = false; //boolean
	this.displayLetter = function() {
			// fuzzy or strict?
		if(this.letter == ' '){ 
	      this.guessed = true;
	      return '  ';
			// return star if the letter is not guessed right
			}
			if(this.guessed === false){ 
	      return '*';
	    } else{ 
	      return this.letter;
	    }
    }; 
}; 

module.exports = Letter;