// GraphQL query resolver

import {booksData} from './data'
import https from 'https'

const query = {
    allWords: async () => {
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

        // return ['abc', 'def'];
    },
    wordOfTheDay: async (args: any) => {
        let wordIndex = args.index;
        let wordInput = args.input;
        console.log("index: " + wordIndex);
        console.log("input: " + wordInput);
        return [-1, 0, 0, 1, -1];
    },

    books: async ({limit}: {limit: number}, context: any) => {
        return limit ? booksData.slice(0, limit) : booksData;
    },
    book: async ({id}: {id: string}, context: any) => {
         
        return booksData.find(book => book.id === id);
    }
};

export default query;