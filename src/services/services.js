import ApolloClient from 'apollo-boost';

import env from '../env';

const client = new ApolloClient({
    uri: env.GRAPHQL_ENDPOINT,
    request: operation => {
      operation.setContext({
        headers: {
          'x-api-key': env.GRAPHQL_API_KEY,
        }
      })
    }
  });

export default client