'use client';
import { useState } from 'react';
import Image from 'next/image';
import AddItemModal from '../../components/AddItemModal';
import { useCloset } from '../../context/ClosetContext'; // useClosetをインポート！

const categoryMap = {
  'tops': 'トップス',
  'bottoms': 'ボトムス',
  'outerwear': 'アウター',
  'shoes': 'シューズ',
  'accessory': 'アクセサリー'
};

const ClosetPage = () => {
  const { items, saveItem, deleteItem } = useCloset(); 
  
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('newest');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToEdit, setItemToEdit] = useState(null);

  const handleOpenModal = (item = null) => {
    setItemToEdit(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setItemToEdit(null);
  };

  // handleSaveItemが、itemToSave と addToCalendar の2つを受け取るように変更
  const handleSaveItem = (itemToSave, addToCalendar) => {
    saveItem(itemToSave, addToCalendar); // そのままContextのsaveItemに渡す
    handleCloseModal();
  };

  // ContextのdeleteItemを直接使う！
  const handleDeleteItem = (id) => {
    if (confirm('このアイテムを本当に削除しますか？')) {
      deleteItem(id);
    }
  };

  // --- 表示ロジックは今までと一緒 ---
  const filteredItems = items.filter(item => filter === 'all' || item.category === filter);

  const sortedItems = filteredItems.sort((a, b) => {
    if (sort === 'newest') return b.id - a.id;
    if (sort === 'oldest') return a.id - b.id;
    if (sort === 'name') return a.name.localeCompare(b.name);
    if (sort === 'category') return a.category.localeCompare(b.category);
    return 0;
  });

  return (
    <div>
      <h2>👗服コレクション👗</h2>
      <div className="category-filter">
        <button onClick={() => setFilter('all')} className={`filter-btn ${filter === 'all' ? 'active' : ''}`}>💖全部見る</button>
        <button onClick={() => setFilter('tops')} className={`filter-btn ${filter === 'tops' ? 'active' : ''}`}>👕 トップス</button>
        <button onClick={() => setFilter('bottoms')} className={`filter-btn ${filter === 'bottoms' ? 'active' : ''}`}>👖 ボトムス</button>
        <button onClick={() => setFilter('outerwear')} className={`filter-btn ${filter === 'outerwear' ? 'active' : ''}`}>🧥 アウター</button>
        <button onClick={() => setFilter('shoes')} className={`filter-btn ${filter === 'shoes' ? 'active' : ''}`}>👟 シューズ</button>
        <button onClick={() => setFilter('accessory')} className={`filter-btn ${filter === 'accessory' ? 'active' : ''}`}>💍 アクセサリー</button>
      </div>
      <div className="sort-options">
        <label htmlFor="sort-select">✨並び順:</label>
        <select id="sort-select" value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="newest">新しい順</option>
          <option value="oldest">古い順</option>
          <option value="name">名前順</option>
          <option value="category">カテゴリー順</option>
        </select>
      </div>
      <div className="item-gallery">
        {sortedItems.map(item => (
          <div key={item.id} className="clothing-item">
            <div className="category-badge">{categoryMap[item.category]}</div>
            <div className="item-actions">
              <button onClick={() => handleOpenModal(item)} className="edit-btn">✏️</button>
              <button onClick={() => handleDeleteItem(item.id)} className="delete-btn">🗑️</button>
            </div>
            <Image src={item.image} alt={item.name} width={150} height={120} style={{ objectFit: 'cover', width: '100%', borderRadius: '4px' }} />
            <p className="item-name">{item.name}</p>
          </div>
        ))}
      </div>
      <button onClick={() => handleOpenModal()} className="fab">+</button>
      <AddItemModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveItem} // この onSave が新しい handleSaveItem を呼ぶ
        itemToEdit={itemToEdit}
      />
    </div>
  );
};

export default ClosetPage;
