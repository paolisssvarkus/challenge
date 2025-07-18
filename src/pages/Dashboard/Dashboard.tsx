import CustomTable from '../../components/Table/CustomTable';
import styles from './Dashboard.module.scss';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCharacters, toggleFavorite } from '../../store/actions';
import type { RootState } from '../../store';
import FavoriteCounter from '../../components/FavoriteCounter/FavoriteCounter';

const Dashboard = () => {
  const dispatch = useDispatch();
  const characters = useSelector((state: RootState) => state.characters);
  const loading = useSelector((state: RootState) => state.loading);

  useEffect(() => {
    dispatch(fetchCharacters(1));
  }, [dispatch]);

  const handleToggleFavorite = (id: number) => {
    dispatch(toggleFavorite(id));
  };    

  return (
    <div className={styles.container}>
       <h1>Rick and Morty Characters</h1>
      {loading ? <p>Loading...</p> : (
        <>
            <CustomTable 
              data={characters}
              onToggleFavorite={handleToggleFavorite} 
            />
            <FavoriteCounter />
        </>
      )}
    </div>
  );
};

export default Dashboard;
