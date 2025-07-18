import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';

const FavoriteCounter: React.FC = () => {
  const favoritesCount = useSelector((state: RootState) =>
    state.characters.filter((c) => c.isFavorite).length
  );

  return <div>Favorites: {favoritesCount}</div>;
};

export default FavoriteCounter;
