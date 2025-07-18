import type{ Dispatch } from 'redux';
import axios from 'axios';
import {ActionTypes} from './types';
import type {
  Character,
  ApiInfo,
  AppAction, } from './types';

interface ApiCharacter {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
}

export const setCharacters = (characters: Character[]): AppAction => ({
  type: ActionTypes.SET_CHARACTERS,
  payload: characters,
});

export const toggleFavorite = (id: number): AppAction => ({
  type: ActionTypes.TOGGLE_FAVORITE,
  payload: id,
});

export const setLoading = (loading: boolean): AppAction => ({
  type: ActionTypes.SET_LOADING,
  payload: loading,
});

export const setInfo = (info: ApiInfo): AppAction => ({
  type: ActionTypes.SET_INFO,
  payload: info,
});

export const setCurrentPage = (page: number): AppAction => ({
  type: ActionTypes.SET_CURRENT_PAGE,
  payload: page,
});

export const fetchCharacters = (page = 1) => {
  return async (dispatch: Dispatch<AppAction>) => {
    dispatch(setLoading(true));
    try {
      const response = await axios.get(`https://rickandmortyapi.com/api/character?page=${page}`);
      const { results, info } = response.data;
      const characters: Character[] = results.map((char: ApiCharacter) => ({
        ...char,
        isFavorite: false,
      }));
      dispatch(setCharacters(characters));
      dispatch(setInfo(info));
      dispatch(setCurrentPage(page));
    } catch (error) {
      console.error('Error fetching characters:', error);
    } finally {
      dispatch(setLoading(false));
    }
  };
};