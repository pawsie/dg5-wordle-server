// GraphQL query resolver

import { game } from '../game';

const queryResolver = {
    allWords: async () => {
        return game.getAllWords();
    },
    randomWord: async () => {        
        return game.getRandomWord();
    },
    gameState: async () => {
        return game.state;
    },
    wordOfTheDay: async (args: any) => {
        let wordIndex = args.index;
        let wordInput = args.input;
        console.log("index: " + wordIndex);
        console.log("input: " + wordInput);
        return [-1, 0, 0, 1, -1];
    },

    // books: async ({limit}: {limit: number}, context: any) => {
    //     return limit ? booksData.slice(0, limit) : booksData;
    // },
    // book: async ({id}: {id: string}, context: any) => {
         
    //     return booksData.find(book => book.id === id);
    // }
};

export default queryResolver;