import apiSchema from './schema'
import queryResolver from './query-resolver'
import mutation from './mutation-resolver'

const resolvers = {
    ...queryResolver, ...mutation,
};

export const resolver = resolvers;
export const schema = apiSchema;