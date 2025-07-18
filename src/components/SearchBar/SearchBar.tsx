import React from 'react';
import { Dropdown, Button, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';

interface Props {
  selectedCount: number;
  onToggleFavorite: () => void;
  onShowDetails: () => void;
}

const SearchBar: React.FC<Props> = ({ selectedCount, onToggleFavorite, onShowDetails }) => {
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
    <div style={{ marginBottom: 16 }}>
      <Dropdown overlay={menu} disabled={selectedCount === 0}>
        <Button>
          Actions <DownOutlined />
        </Button>
      </Dropdown>
    </div>
  );
};

export default SearchBar;
