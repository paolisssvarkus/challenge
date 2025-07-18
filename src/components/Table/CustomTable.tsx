import React, { useState, useRef, useEffect } from 'react';
import styles from './CustomTable.module.scss';
import type { Character } from '../../types/Character';
import { Table, Modal, Spin } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface Props {
  data: Character[];
  onToggleFavorite: (id: number) => void;
  onSelectRows?: (selected: Character[]) => void;
  currentPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  loading: boolean;
}

const CustomTable: React.FC<Props> = ({ data, onToggleFavorite, onSelectRows, currentPage, totalItems, onPageChange, loading}) => {
  const [contextMenuVisible, setContextMenuVisible] = useState(false);
  const [contextTarget, setContextTarget] = useState<Character | null>(null);

  const [modalCharacter, setModalCharacter] = useState<Character | null>(null);
  const [loadingModal, setLoadingModal] = useState(false);

  const contextRef = useRef<HTMLDivElement>(null);

  const columns: ColumnsType<Character> = [
    { title: 'ID', dataIndex: 'id' },
    { title: 'Name', dataIndex: 'name' },
    { title: 'Status', dataIndex: 'status' },
    { title: 'Species', dataIndex: 'species' },
    { title: 'Type', dataIndex: 'type' },
    { title: 'Gender', dataIndex: 'gender' },
    {
      title: 'Image',
      dataIndex: 'image',
      render: (url) => <img src={url} alt="Character" width={50} />,
    },
    {
      title: 'Favorite',
      dataIndex: 'isFavorite',
      render: (_, record) => (
        <span>
          {record.isFavorite ? '★' : '☆'}
        </span>
      ),
    },
  ];

  const handleRowRightClick = (record: Character, e: React.MouseEvent) => {
    e.preventDefault();
    setContextTarget(record);
    setContextMenuVisible(true);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (contextRef.current && !contextRef.current.contains(e.target as Node)) {
        setContextMenuVisible(false);
      }
    };
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  const handleToggleFavorite = () => {
    if (contextTarget) {
      onToggleFavorite(contextTarget.id);
      setContextMenuVisible(false);
    }
  };

  const handleShowDetails = async () => {
    if (!contextTarget) return;

    setLoadingModal(true);
    setContextMenuVisible(false);

    try {
      const res = await fetch(`https://rickandmortyapi.com/api/character/${contextTarget.id}`);
      const character = await res.json();
      setModalCharacter(character);
    } catch (err) {
      console.error('Error loading character details:', err);
    } finally {
      setLoadingModal(false);
    }
  };

  return (
    <div className={styles.tableWrapper} style={{ position: 'relative' }}>
      <Table
        rowKey="id"
        dataSource={data}
        columns={columns}
        loading={loading}
        pagination={{
          current: currentPage,
          pageSize: 20, 
          total: totalItems,
          showSizeChanger: false,
          onChange: onPageChange, 
        }}
        onRow={(record) => ({
          onContextMenu: (event) => handleRowRightClick(record, event),
        })}
        rowSelection={{
          onChange: (_, selectedRows) => {
            onSelectRows?.(selectedRows);
          },
        }}
      />

      {contextMenuVisible && contextTarget && (
        <div
          ref={contextRef}
          className={styles.contextMenu}
          style={{
            position: 'absolute',
            top: '20px',
            left: '40px',
            backgroundColor: '#fff',
            border: '1px solid #ccc',
            boxShadow: '0px 4px 8px rgba(0,0,0,0.15)',
            borderRadius: 4,
            zIndex: 1000,
          }}
        >
          <div
            className={styles.contextMenuItem}
            onClick={handleToggleFavorite}
            style={{ padding: '8px 12px', cursor: 'pointer' }}
          >
            {contextTarget.isFavorite ? 'Remove fav' : 'Make fav'}
          </div>
          <div
            className={styles.contextMenuItem}
            onClick={handleShowDetails}
            style={{ padding: '8px 12px', cursor: 'pointer' }}
          >
            View Details
          </div>
        </div>
      )}

      <Modal
        open={!!modalCharacter}
        onCancel={() => setModalCharacter(null)}
        title={modalCharacter?.name}
        footer={null}
      >
        {loadingModal || !modalCharacter ? (
          <Spin />
        ) : (
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
    </div>
  );
};

export default CustomTable;
