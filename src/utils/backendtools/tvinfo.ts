interface TV {
    TVid: number;
    tmdbid: string;
    user_id: number | null;
    email: string | null;
}

interface FetchTVsParams {
    user_id?: number;
    email?: string;
}

interface AddTVParams {
    tmdbid: string;
    tvname: String;
    image: String;
    user_id?: number;
    email?: string;
}

interface DeleteTVParams {
    tmdbid: string;
    user_id?: number;
    email?: string;
}

import apiClient from "./axios";

export async function fetchTVs(params: FetchTVsParams): Promise<TV[]> {
    try {
        const response = await apiClient.get<{ tvs: TV[] }>('/tvs', { params });
        return response.data.tvs;
    } catch (error) {
        console.error('Error fetching TVs:', error);
        throw error;
    }
}


export async function addTV(params: AddTVParams): Promise<void> {
  try {
    await apiClient.post('/tvs', params);
    console.log('TV added successfully');
  } catch (error) {
    console.error('Error adding TV:', error);
    throw error;
  }
}


export async function deleteTV(params: DeleteTVParams): Promise<void> {
  try {
    await apiClient.delete('/tvs', { params });
    console.log('TV deleted successfully');
  } catch (error) {
    console.error('Error deleting TV:', error);
    throw error;
  }
}
