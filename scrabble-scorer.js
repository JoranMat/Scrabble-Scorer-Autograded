// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};


function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }

	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   console.log("Let's play some scrabble! ");
   return input.question("Enter a word to score: ");
};

let simpleScorer = function(word){
   return word.length;
};

let vowelBonusScorer = function(word){
   let pointCounter = 0
   let vowels = ["A","E","I","O","U"];

for(let i=0;i<word.length;i++){
   if(vowels.includes(word[i].toUpperCase())){
      pointCounter+=3;
   }
   else{
      pointCounter++;
   }
}
   return pointCounter;
};

let simpleScore = {
   name: "Simple Score", 
   description: "Each letter is worth 1 point.",
   scorerFunction: simpleScorer
   };
   
   let bonusVowels = {
      name: "Bonus Vowels",
      description: "Vowels are 3 pts, consonants are 1 pt.",
      scorerFunction: vowelBonusScorer
   };
   
   let oldScore = {
      name: "Scrabble",
      description: "The traditional scoring algorithm.",
      scorerFunction: oldScrabbleScorer
   };
   
   let scrabbleScorer = function(word){
      word = word.toLowerCase();
	let letterPoints = 0;
 
	for (let i = 0; i < word.length; i++) {
      letterPoints += newPointStructure[word[i]];
	  }
	return letterPoints;
   };

   let newScore = {
      name: "Scrabble",
      description: "The traditional scoring algorithm.",
      scorerFunction: scrabbleScorer
   }

const scoringAlgorithms = [simpleScore, bonusVowels, newScore];

function scorerPrompt() {
console.log("\nWhich scoring algorithm would you like to use?\n");
console.log(`0 - Simple: ${simpleScore.description}
1 - Vowel Bonus: ${bonusVowels.description}
2 - Scrabble: ${oldScore.description}`)
let selection = input.question("Enter 0, 1, or 2: ");

return scoringAlgorithms[selection];
};

function transform(oldPointStructure) {
let newStructure = {};

for (item in oldPointStructure){
for(let i=0;i<oldPointStructure[item].length;i++){
 newStructure[oldPointStructure[item][i].toLowerCase()] = Number(item);
   }
}
return newStructure;
};

let newPointStructure = transform(oldPointStructure);

function runProgram() {
let word = initialPrompt();
let selectedAlgorithm = scorerPrompt();
console.log(`Score for '${word}': ${selectedAlgorithm.scorerFunction(word)}`);
}


// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
