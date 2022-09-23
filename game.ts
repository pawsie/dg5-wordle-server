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
    this.initialiseCorrectLetters();
    return new GameStatusResult(this.state, this.word, this.correctLetters.length == 5);      
  }

  initialiseCorrectLetters(word: String = this.word) {
    this.correctLetters = word.toLowerCase().split('');
  }

  end(){
    this.state = GameStatus.Complete;
    this.word = "";
  }
  
  checkWord(wordToCheck: string): CheckWordResult{

    let wordResult = new CheckWordResult();
    wordResult.isWordInList = this.getIsWordInList(wordToCheck);

    if (wordResult.isWordInList){

      wordResult.letterStates = this.getLetterStates(wordToCheck);

      wordResult.isWordCorrect = wordResult.letterStates.every(i => i == LetterStates.RightLetterRightPlace);      
    }

    return wordResult;   
  }

  getIsWordInList(guess: String): boolean{
    return this.allWords.includes(guess.toLowerCase());  
  }

  getLetterStates(guess: String): LetterStates[]{
    var letterStates: LetterStates[] = [];
    var correctCount = 0;
    var remainingLettersToCheck= this.correctLetters;

    // Set green state first
    for (let i = 0; i < 5; i++) {
      if (this.correctLetters[i] == guess[i]){
        letterStates[i] = LetterStates.RightLetterRightPlace;
        correctCount++;
        delete remainingLettersToCheck[i];
      }
    }

    if (correctCount < 5) {
      // Populate other states for word result
      for (let i = 0; i < 5; i++) {
        if (letterStates[i] == LetterStates.RightLetterRightPlace) continue;
        const foundIndex = remainingLettersToCheck.findIndex((remainingLetter) => remainingLetter == guess[i]);
        if (foundIndex !== -1) {
          letterStates[i] = LetterStates.RightLetterWrongPlace;
          delete remainingLettersToCheck[foundIndex];
        } else {
          letterStates[i] = LetterStates.WrongLetter;
        }
      }
    }
    return letterStates;
  }


  incrementValueAtKey(map: Map<string, number>, key: string){
    map.set(key, map.has(key) ? map.get(key)! + 1 : 1);
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