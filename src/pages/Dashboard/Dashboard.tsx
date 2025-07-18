import CustomTable from '../../components/Table/CustomTable';
import styles from './Dashboard.module.scss';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCharacters, toggleFavorite } from '../../store/actions';
import type { RootState } from '../../store';
import FavoriteCounter from '../../components/FavoriteCounter/FavoriteCounter';
import SearchBar from '../../components/SearchBar/SearchBar';
import type { Character } from '../../types/Character';
import { Modal } from 'antd';

const Dashboard = () => {
  const dispatch = useDispatch();
  const characters = useSelector((state: RootState) => state.characters);
  const loading = useSelector((state: RootState) => state.loading);

  const [selectedCharacters, setSelectedCharacters] = useState<Character[]>([]);
  const [modalCharacter, setModalCharacter] = useState<Character | null>(null);

  useEffect(() => {
    dispatch(fetchCharacters(1));
  }, [dispatch]);

  const handleToggleFavorite = (id: number) => {
    dispatch(toggleFavorite(id));
  };    

  const handleToggleFavoriteOfSelected = () => {
    selectedCharacters.forEach((char) => {
      dispatch(toggleFavorite(char.id));
    });
  };

  const handleShowDetailsOfSelected = () => {
    if (selectedCharacters.length === 1) {
      setModalCharacter(selectedCharacters[0]);
    }
  };
  
  return (
    <div className={styles.container}>
       <h1>Rick and Morty Characters</h1>
      {loading ? <p>Loading...</p> : (
        <>
          <SearchBar
            selectedCount={selectedCharacters.length}
            onToggleFavorite={handleToggleFavoriteOfSelected}
            onShowDetails={handleShowDetailsOfSelected}
          />
          <CustomTable 
            data={characters}
            onToggleFavorite={handleToggleFavorite} 
            onSelectRows={setSelectedCharacters}
          />
          <FavoriteCounter />

          <Modal
            open={!!modalCharacter}
            onCancel={() => setModalCharacter(null)}
            title={modalCharacter?.name}
            footer={null}
          >
            {modalCharacter && (
              <div>
                <img
                  src={modalCharacter.image}
                  alt={modalCharacter.name}
                  style={{ width: '100%', borderRadius: 8, marginBottom: 16 }}
                />
                <p><strong>Full Name:</strong> {modalCharacter.name}</p>
                <p><strong>Origin:</strong> {modalCharacter.origin?.name}</p>
                <p><strong>Episodes Count:</strong> {modalCharacter.episode?.length}</p>
                <p><strong>Species:</strong> {modalCharacter.species}</p>
                <p><strong>Status:</strong> {modalCharacter.status}</p>
              </div>
            )}
          </Modal>
        </>
      )}
    </div>
  );
};

export default Dashboard;
