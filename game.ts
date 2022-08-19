import https from 'https'

export enum GameStatus { 
    BeforeStart,
    InProgress,
    Complete
  };

export class Game{
  state = GameStatus.BeforeStart;
  word = async () => { await this.getRandomWord(); };
    
  start(){
    this.state = GameStatus.InProgress;
  }
  end(){
    this.state = GameStatus.Complete;
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