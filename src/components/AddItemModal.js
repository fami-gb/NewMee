'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

const AddItemModal = ({ isOpen, onClose, onSave, itemToEdit }) => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('tops');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [addToCalendar, setAddToCalendar] = useState(false); // このstateを追加！

  useEffect(() => {
    if (itemToEdit) {
      setName(itemToEdit.name);
      setDate(itemToEdit.date || new Date().toISOString().split('T')[0]); // 日付がない場合は今日の日付
      setCategory(itemToEdit.category);
      setImagePreview(itemToEdit.image);
      setImage(null); // 既存の画像URLをプレビューに使うが、新しいファイルは選択されていない状態
      setAddToCalendar(false); // 編集モードではチェックボックスをオフに
    } else {
      // 新規追加モードの時はフォームをリセット
      setName('');
      setDate('');
      setCategory('tops');
      setImage(null);
      setImagePreview(null);
      setAddToCalendar(false); // 新規モードでも初期値はオフ
    }
  }, [itemToEdit, isOpen]); // isOpenも依存配列に追加して、モーダルが開くたびに状態をリセット/設定

  if (!isOpen) return null;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSave = () => {
    // 編集モードで画像が変更されていない場合でも、名前やカテゴリは変更できるようにする
    if (!name || !date || !category || (!image && !itemToEdit)) {
      alert('すべての項目を入力してください。');
      return;
    }
    // onSaveに、チェックボックスの状態も渡す！
    onSave({
      id: itemToEdit ? itemToEdit.id : Date.now(), // 編集中のアイテムがあればそのIDを、なければ新しいIDを
      name,
      date,
      category,
      image: imagePreview, // プレビュー用のURLを渡す
    }, addToCalendar); // 第2引数として追加
    onClose(); // モーダルを閉じるのは親コンポーネントの役割
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{itemToEdit ? '✏️アイテムを編集' : '💖新しい服を登録'}</h2>
        
        <div className="image-preview-container">
          <input type="file" id="itemImageInput" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
          <label htmlFor="itemImageInput" className="image-preview">
            {imagePreview ? <Image src={imagePreview} alt="Preview" width={150} height={150} style={{ objectFit: 'cover' }} /> : 'クリックして画像を選択'}
          </label>
        </div>

        <input type="text" placeholder="アイテム名" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="tops">👕 トップス</option>
          <option value="bottoms">👖 ボトムス</option>
          <option value="outerwear">🧥 アウター</option>
          <option value="shoes">👟 シューズ</option>
          <option value="accessory">💍 アクセサリー</option>
        </select>

        {/* ↓↓↓ このチェックボックス部分を追加！ ↓↓↓ */}
        {!itemToEdit && ( // 新規追加のときだけ表示
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px' }}>
            <input
              type="checkbox"
              id="add-to-calendar"
              checked={addToCalendar}
              onChange={(e) => setAddToCalendar(e.target.checked)}
            />
            <label htmlFor="add-to-calendar" style={{ cursor: 'pointer' }}>
              今日のコーデとしてカレンダーに登録する
            </label>
          </div>
        )}
        {/* ↑↑↑ ここまで追加 ↑↑↑ */}

        <div className="modal-actions">
          <button onClick={onClose} className="cancel-btn">キャンセル</button>
          <button onClick={handleSave} className="save-btn">💖保存</button>
        </div>
      </div>
    </div>
  );
};

export default AddItemModal;
