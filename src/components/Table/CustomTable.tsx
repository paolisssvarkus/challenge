import React from 'react';
import styles from './CustomTable.module.scss';
import type { Character } from '../../types/Character';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface Props {
  data: Character[];
  onToggleFavorite: (id: number) => void;
}

const CustomTable: React.FC<Props> = ({ data, onToggleFavorite }: Props) => {
 const columns: ColumnsType<Character> = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
    {
      title: 'Species',
      dataIndex: 'species',
    },
    {
      title: 'Type',
      dataIndex: 'type',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      render: (url) => <img src={url} alt="Character" width={50} />,
    },
    {
      title: 'Favorite',
      dataIndex: 'isFavorite',
      render: (_, record) => (
        <button onClick={() => onToggleFavorite(record.id)}>
          {record.isFavorite ? '★' : '☆'}
        </button>
      ),
    },
  ];

  return (
    <div className={styles.tableWrapper}>
      <Table
        rowKey="id"
        dataSource={data}
        columns={columns}
        pagination={false}
      />
    </div>
  );
};

export default CustomTable;
