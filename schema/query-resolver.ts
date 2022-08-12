// GraphQL query resolver

import {booksData} from './data'

const query = {
    books: async ({limit}: {limit: number}, context: any) => {
        return limit ? booksData.slice(0, limit) : booksData;
    },
    book: async ({id}: {id: string}, context: any) => {
         
        return booksData.find(book => book.id === id);
    }
};

export default query;