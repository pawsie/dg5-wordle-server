import apiSchema from './schema'
import query from './query-resolver'
import mutation from './mutation-resolver'

const resolvers = {
    ...query, ...mutation,
};

export const resolver = resolvers;
export const schema = apiSchema;