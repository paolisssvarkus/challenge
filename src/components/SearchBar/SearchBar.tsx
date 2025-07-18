import React, { useState } from 'react';
import { Dropdown, Button, Menu, Input } from 'antd';
import { DownOutlined } from '@ant-design/icons';

interface Props {
  selectedCount: number;
  onToggleFavorite: () => void;
  onShowDetails: () => void;
  onSearch: (searchTerm: string) => void;
}

const SearchBar: React.FC<Props> = ({ selectedCount, onToggleFavorite, onShowDetails, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

   const handleSearch = () => {
    onSearch(searchTerm.trim());
  }

  const menu = (
    <Menu>
      <Menu.Item key="favorite" onClick={onToggleFavorite}>
        Toggle Favorite ({selectedCount} selected)
      </Menu.Item>
      <Menu.Item
        key="details"
        onClick={onShowDetails}
        disabled={selectedCount !== 1}
      >
        View Details
      </Menu.Item>
    </Menu>
  );

  return (
    <div>
      <Input
        placeholder='Search by name, status or gender (e.g. "rick alive male")'
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        allowClear
        style={{ width: 400 }}
      />
      <Button type="primary" onClick={handleSearch}>
        Search
      </Button>
      <Dropdown overlay={menu} disabled={selectedCount === 0}>
        <Button>
          Actions <DownOutlined />
        </Button>
      </Dropdown>
    </div>
  );
};

export default SearchBar;
