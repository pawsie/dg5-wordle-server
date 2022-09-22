import https from 'https'

export enum GameStatus { 
    BeforeStart,
    InProgress,
    Complete
  };

export enum LetterStates {    
  BeforeCheck,
  WrongLetter,
  RightLetterWrongPlace,
  RightLetterRightPlace,
};

export class CheckWordResult{
  isWordInList = false;
  isWordCorrect = false;
  letterStates: LetterStates[] = [];
  // keyboardLetterStates: Map<string, LetterStates> = new Map();
}

export class GameStatusResult{

  constructor(public gameState: GameStatus,
              public gameWord: String,
              public success: Boolean
              ){}
  
}

export class Game{
  state = GameStatus.BeforeStart;
  word: String = "";
  correctLetters: String[] = new Array(5);
  allWords: String[] = new Array();

  async start(): Promise<GameStatusResult>{
    this.state = GameStatus.InProgress;
    this.word = await this.getRandomWord();
    this.allWords = await this.getAllWords();
    this.correctLetters = this.word.toLowerCase().split('');
    return new GameStatusResult(this.state, this.word, this.correctLetters.length == 5);      
  }

  end(){
    this.state = GameStatus.Complete;
    this.word = "";
  }
  
  checkWord(wordToCheck: string): CheckWordResult{

    let wordResult = new CheckWordResult();
    wordResult.isWordInList = this.getIsWordInList(wordToCheck);

    if (wordResult.isWordInList){
      
      wordResult.letterStates = this.getLetterStates(wordToCheck, this.word);
      // wordResult.letterStates[0] = LetterStates.RightLetterRightPlace;

      wordResult.isWordCorrect = wordResult.letterStates.every(i => i == LetterStates.RightLetterRightPlace);      
    }

    return wordResult;   
  }

  getIsWordInList(guess: String): boolean{
    return this.allWords.includes(guess.toLowerCase());  
  }

  getLetterStates(guess: String, answer: String): LetterStates[]{
    
    var letters = guess.toString().toLowerCase().split('');
    var letterStates = new Array(5);

    var correctCount = 0;      
    letters = guess.split('');
    this.correctLetters = answer.split('');

    var nonGreenAnswerOccurrences: Map<string, number> = new Map();
    var nonGreenGuessIndex: Map<string, number> = new Map();

    for (let i = 0; i < 5; i++) {
      if (this.correctLetters[i] == letters[i]){
        letterStates[i] = LetterStates.RightLetterRightPlace;
        correctCount++;
      }
      else if (this.correctLetters.includes(letters[i])){

        // the first we encounter letter[i] that may be yellow,
        // populate nonGreenAnswerOccurrences
        if (!nonGreenAnswerOccurrences.has(letters[i])) {
          for (let j = 0; j < 5; j++) {           
          
            // count number of occurrences of letter[i] in correctLetters that are not green
            if (this.correctLetters[j] == letters[i] && this.correctLetters[j] != letters[j]){
              this.incrementValueAtKey(nonGreenAnswerOccurrences, letters[i]);
            }
          }
        }

        // then update nonGreenGuessIndex for letter[i]
        this.incrementValueAtKey(nonGreenGuessIndex, letters[i]);

        if (nonGreenGuessIndex.get(letters[i])! <= nonGreenAnswerOccurrences.get(letters[i])!){
          letterStates[i] = LetterStates.RightLetterWrongPlace;
          // if (!wordResult.keyboardLetterStates.has(letters[i]))
            // wordResult.keyboardLetterStates.set(letters[i], LetterStates.RightLetterWrongPlace);
        }
        else{
          letterStates[i] = LetterStates.WrongLetter;
          // wordResult.keyboardLetterStates.set(letters[i], LetterStates.WrongLetter);
        }
      }
      else{
        letterStates[i] = LetterStates.WrongLetter;
        // wordResult.keyboardLetterStates.set(letters[i], LetterStates.WrongLetter);
      }
    }

    return letterStates; 
    // isWordCorrect = (correctCount == 5);
  }


  incrementValueAtKey(map: Map<string, number>, key: string){
    map.set(key, map.has(key) ? map.get(key)! + 1 : 1);
  }

  checkUsedWords(letters: string[]){

  }
  async getAllWords(){
    const url = 'https://gist.githubusercontent.com/dracos/dd0668f281e685bad51479e5acaadb93/raw/ca9018b32e963292473841fb55fd5a62176769b5/valid-wordle-words.txt';
        let promise = new Promise((resolve, reject) => {
            let data: string | string[] = '';
            https.get(url, res => {
                res.on('data', chunk => { data += chunk })
                res.on('end', () => {
                    data = (data as string).split('\n');
                    resolve(data);
                })
            })
        });
  
        let result = await promise; // wait until the promise resolves
        return result as string[];
  }
  
  async getRandomWord(){
    let words = await this.getAllWords();        
    return words[Math.floor(Math.random()*words.length)];
  }
}

export var game = new Game();