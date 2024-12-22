import { NextApiRequest, NextApiResponse } from 'next';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
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

interface Movie {
  id: number;
  title: string;
  overview: string;
}

interface MoviesResponse {
  movies: Movie[];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Consultar filmes populares usando GraphQL com RestLink
    const { data } = await client.query<MoviesResponse>({
      query: gql`
        query {
          movies @rest(type: "Movie", path: "movie/popular?language=en-US&page=1") {
            id
            title
            overview
          }
        }
      `,
    });

    // Enviar resposta com os filmes para o frontend
    res.status(200).json(data);
  } catch (error) {
    // Logar e responder com erro em caso de falha
    console.error('Erro ao consultar o TMDB:', error);
    res.status(500).json({ error: 'Erro ao buscar filmes.' });
  }
}
