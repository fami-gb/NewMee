// src/components/SelectOutfitModal.js (新規作成)
'use client';
import Image from 'next/image';

const SelectOutfitModal = ({ isOpen, onClose, items, onSelect }) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>💖今日のコーデを選ぶ💖</h2>
        <div className="item-gallery" style={{ maxHeight: '400px', overflowY: 'auto' }}>
          {items.length > 0 ? items.map(item => (
            <div key={item.id} className="clothing-item" onClick={() => onSelect(item.id)} style={{cursor: 'pointer'}}>
              <Image src={item.image} alt={item.name} width={150} height={120} style={{ objectFit: 'cover', width: '100%', borderRadius: '4px' }} />
              <p className="item-name">{item.name}</p>
            </div>
          )) : (
            <p>クローゼットに服がありません。</p>
          )}
        </div>
        <div className="modal-actions">
          <button onClick={onClose} className="cancel-btn">キャンセル</button>
        </div>
      </div>
    </div>
  );
};

export default SelectOutfitModal;
