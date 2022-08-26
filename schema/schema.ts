import { buildSchema } from 'graphql';

const schema = buildSchema(`
    type Query {
        allWords: [String]
        randomWord: String
        gameState: Int
        gameWord: String
        checkWord(word: String!): CheckWordResult
        wordOfTheDay(index: Int!, input: String!): [Int]
        books(limit: Int): [Book]
        book(id: ID!): Book
        
    }
    type Mutation {
        startGame: GameStatusResult
        endGame: Boolean        
        addBook(title: String!, author: String!, description: String!): BookResponse
        updateBook(id: ID!, title: String, author: String, description: String): BookResponse
        deleteBook(id: ID!): BookResponse
    }
    type CheckWordResult {
        isWordInList: Boolean
        isWordCorrect: Boolean
        letterStates: [Int!]
    }
    type GameStatusResult {
        gameState: Int
        success: Boolean
    }
    type Book {
        id: ID!
        title: String!
        author: String!
        description: String!
    }
    type Books {
        books: [Book]
    }
    type BookResponse {
        data: Book
        error: String
        ok: Boolean
    }
`);

export default schema;