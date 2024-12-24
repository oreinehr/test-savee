// lib/apolloClient.ts
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { RestLink } from 'apollo-link-rest';

const restLink = new RestLink({
  uri: 'https://api.themoviedb.org/3/', 
  headers: {
    Authorization: `Bearer 3849a025073f1aa51260f2ae63857fb8`, 
  },
});

const client = new ApolloClient({
  link: restLink,
  cache: new InMemoryCache(),
});

export default client;
