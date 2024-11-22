interface Movie {
    movieid: number;
    tmdbid: string;
    user_id: number | null;
    email: string | null;
}

interface FetchMoviesParams {
    user_id?: number;
    email?: string;
}

interface AddMovieParams {
    tmdbid: string;
    moviename:String;
    image:String;
    user_id?: number;
    email?: string;
}

interface DeleteMovieParams {
    tmdbid: string;
    user_id?: number;
    email?: string;
}

import apiClient from "./axios";

export async function fetchMovies(params: FetchMoviesParams): Promise<Movie[]> {
    try {
        const response = await apiClient.get<{ movies: Movie[] }>('/movies', { params });
        return response.data.movies;
    } catch (error) {
        console.error('Error fetching movies:', error);
        throw error;
    }
}


export async function addMovie(params: AddMovieParams): Promise<void> {
  try {
    await apiClient.post('/movies', params);
    console.log('Movie added successfully');
  } catch (error) {
    console.error('Error adding movie:', error);
    throw error;
  }
}


export async function deleteMovie(params: DeleteMovieParams): Promise<void> {
  try {
    await apiClient.delete('/movies', { params });
    console.log('Movie deleted successfully');
  } catch (error) {
    console.error('Error deleting movie:', error);
    throw error;
  }
}
