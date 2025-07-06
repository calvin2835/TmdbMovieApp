import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CategoryType } from "../constants/dropdownValues";

const BASE_URL = "https://api.themoviedb.org/3";

export const tmdbApi = createApi({
  reducerPath: "tmdbApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      // can store in openshift or retrieve for api
      const token = process.env.EXPO_PUBLIC_MOVIE_API_KEY;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("Accept", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    fetchMovies: builder.query({
      query: ({ category, query }) => {
        let endpoint = "";

        if (category === CategoryType.NowPlaying) {
          endpoint = "/movie/now_playing";
        } else if (category === CategoryType.Popular) {
          endpoint = "/movie/popular";
        } else if (category === CategoryType.Upcoming) {
          endpoint = "/movie/upcoming";
        }

        if (query && query !== "") {
          endpoint = `/search/movie?query=${encodeURIComponent(query)}`;
        }

        return endpoint;
      },
    }),
    getMovieDetails: builder.query<MovieDetails, { id: string | string[] }>({
      query: ({ id }) => ({
        url: `/movie/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useLazyFetchMoviesQuery, useGetMovieDetailsQuery } = tmdbApi;
