import { NextRequest, NextResponse } from 'next/server';
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

interface MovieResponse {
  movie: Movie;
}

export async function GET(req: NextRequest, context: { params: { id: string } }): Promise<NextResponse> {
  const { id } = context.params;

  const { data } = await client.query<MovieResponse>({
    query: gql`
      query {
        movie @rest(type: "Movie", path: "movie/${id}?language=en-US") {
          id
          title
          overview
        }
      }
    `,
  });

  return NextResponse.json(data.movie);
}
