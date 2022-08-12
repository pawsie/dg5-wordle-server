// https://www.section.io/engineering-education/how-to-build-graphql-apis-with-expressjs-and-typescript/

import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import { schema, resolver } from './schema'
import envs from './envs'
const cors = require('cors');

const app = express();
app.use(express.json());

app.use(cors());

app.use(
    envs.graphqlPath,
    graphqlHTTP((request, response, graphQLParams) => ({
        schema,
        rootValue: resolver,
        graphiql: true,
        context: {
            request,
            response,
        },
    }))
);

app.listen(envs.port, () => {
    console.log(`Server is running at http://localhost:${envs.port}${envs.graphqlPath}`);
});