import type  {
  AppState,
  AppAction,
} from './types';
import { ActionTypes } from './types';

const initialState: AppState = {
  characters: [],
  info: null,
  loading: false,
  currentPage: 1,
};

export const reducer = (
  state = initialState,
  action: AppAction
): AppState => {
  switch (action.type) {
    case ActionTypes.SET_CHARACTERS:
      return { ...state, characters: action.payload };
    case ActionTypes.TOGGLE_FAVORITE:
      return {
        ...state,
        characters: state.characters.map((char) =>
          char.id === action.payload
            ? { ...char, isFavorite: !char.isFavorite }
            : char
        ),
      };
    case ActionTypes.SET_LOADING:
      return { ...state, loading: action.payload };
    case ActionTypes.SET_INFO:
      return { ...state, info: action.payload };
    case ActionTypes.SET_CURRENT_PAGE:
      return { ...state, currentPage: action.payload };
    default:
      return state;
  }
};
