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
}

export class Game{
  state = GameStatus.BeforeStart;
  word: String = "";
  correctLetters: String[] = new Array(5);
  allWords: String[] = new Array();

  async start(): Promise<Boolean>{
    this.state = GameStatus.InProgress;
    this.word = await this.getRandomWord();
    this.allWords = await this.getAllWords();
    this.correctLetters = this.word.toLowerCase().split('');
    return this.correctLetters.length == 5;      
  }

  end(){
    this.state = GameStatus.Complete;
    this.word = "";
  }
  
  checkWord(wordToCheck: string): CheckWordResult{

    let wordResult = new CheckWordResult();
    wordResult.isWordInList = this.allWords.includes(wordToCheck.toLowerCase());  

    if (wordResult.isWordInList){
      var letters = wordToCheck.toString().toLowerCase().split('');
      wordResult.letterStates = new Array(5);

      var correctCount = 0;
      // needs to be improved for multiple letters not in the word
      // e.g. "AAAAA" for "ADIEU" should give only 1 green for first A
      for (let i = 0; i < 5; i++) {
        if (this.correctLetters[i] == letters[i]){
          wordResult.letterStates[i] = LetterStates.RightLetterRightPlace;
          correctCount++;
        }
        else if (this.correctLetters.includes(letters[i]))
          wordResult.letterStates[i] = LetterStates.RightLetterWrongPlace;
        else
          wordResult.letterStates[i] = LetterStates.WrongLetter;
      }

      wordResult.isWordCorrect = (correctCount == 5);
    }

    return wordResult;   
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